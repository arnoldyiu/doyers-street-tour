// Doyers Street tour: walk the street, look around, and click markers to learn about each place.
// Content (places, markers, minimap) lives in tour-data.js.

(function () {
  "use strict";

  const LOCATION_COUNT = 6;
  const VIEW_COUNT = 8;
  // Views where the street runs straight ahead (0) or straight behind (4), so you can walk
  const VIEW_FACING_FORWARD = 0;
  const VIEW_FACING_BACKWARD = 4;

  // Set to true to log click coordinates, for placing new markers in tour-data.js
  const DEV_MODE = false;

  const STAGE_WIDTH = 1512;
  const STAGE_HEIGHT = 851;

  const byId = (id) => document.getElementById(id);
  const stage = byId("stage");

  // ---- Layout ----

  // Everything is positioned on a fixed-size stage; scale it to fit the window
  function fitStage() {
    const scale = Math.min(window.innerWidth / STAGE_WIDTH, window.innerHeight / STAGE_HEIGHT);
    stage.style.setProperty("--scale", scale);
  }

  fitStage();
  window.addEventListener("resize", fitStage);

  // ---- State ----

  let isNight = false;
  let currentLocation = 1; // 1-6
  let currentView = 0; // 0-7, turning right goes up
  let infoCardOpen = false;
  let infoCardOpener = null; // the marker button to return focus to when the card closes

  const timeOfDay = () => (isNight ? "night" : "day");

  // ---- Sound ----

  const sounds = {
    hover: new Audio("./assets/sfx_hover.mp3"),
    select: new Audio("./assets/sfx_select.mp3"),
    day: new Audio("./assets/sfx_daytime.mp3"),
    night: new Audio("./assets/sfx_nighttime.mp3"),
    marker: new Audio("./assets/sfx_mapmarker.mp3"),
    close: new Audio("./assets/sfx_return.mp3"),
  };

  function playSound(name) {
    const sound = sounds[name];
    // Rewind so rapid triggers restart the sound instead of being ignored
    sound.currentTime = 0;
    // Browsers block audio until the first click; ignore that instead of logging errors
    sound.play().catch(() => {});
  }

  // ---- Preloading ----

  // Keep references so the browser doesn't drop preloaded images
  const preloaded = {};

  function preload(url) {
    if (preloaded[url]) return;
    preloaded[url] = new Image();
    preloaded[url].src = url;
  }

  function backgroundUrl(night, location, view) {
    return `./assets/bg${night ? "P" : "A"}Location0${location}View0${view}.webp`;
  }

  // Load only the backgrounds you can reach in one step, instead of all 96 up front
  function preloadNeighbors() {
    preload(backgroundUrl(isNight, currentLocation, (currentView + 1) % VIEW_COUNT));
    preload(backgroundUrl(isNight, currentLocation, (currentView + VIEW_COUNT - 1) % VIEW_COUNT));
    preload(backgroundUrl(!isNight, currentLocation, currentView));
    if (currentLocation > 1) preload(backgroundUrl(isNight, currentLocation - 1, currentView));
    if (currentLocation < LOCATION_COUNT) preload(backgroundUrl(isNight, currentLocation + 1, currentView));
  }

  // Small images used later on (night mode graphics, info card photos)
  ["clock_button_Night.webp", "minimap_night.webp", "navBtnFw_Night.png", "navBtnBw_Night.png"]
    .concat(PLACES.flatMap((place) => [place.day.image, place.night.image]))
    .forEach((file) => preload("./assets/" + file));

  // ---- Map markers ----

  // One marker element per place, shown and moved as you look around
  const markerElements = PLACES.map((_, i) => {
    const marker = document.createElement("div");
    marker.className = "buttonPosition buttonNav poabsolute";
    marker.style.display = "none";
    marker.innerHTML = `
      <p aria-hidden="true">${i + 1}</p>
      <img class="mapMarker poabsolute" alt="">
      <button class="mapMarkerMask"><div class="poabsolute"></div></button>`;

    const button = marker.querySelector("button");
    button.addEventListener("mouseover", () => playSound("hover"));
    button.addEventListener("click", () => {
      playSound("marker");
      openInfoCard(i, button);
    });

    byId("mapMarkers").appendChild(marker);
    return marker;
  });

  const visibleMarkers = () => MARKERS[timeOfDay()][currentLocation - 1][currentView];
  const placeInfo = (placeIndex) => PLACES[placeIndex][timeOfDay()];

  function updateMarkers() {
    markerElements.forEach((marker) => (marker.style.display = "none"));
    for (const { place, x, y } of visibleMarkers()) {
      const marker = markerElements[place - 1];
      marker.style.display = "initial";
      marker.style.transform = `translate(${x}px, ${y}px)`;
      marker.querySelector("button").setAttribute("aria-label", placeInfo(place - 1).title);
    }
  }

  // ---- Rendering ----

  function isValidLocation(location) {
    return location >= 1 && location <= LOCATION_COUNT;
  }

  // Facing backward flips which way "forward" takes you along the street.
  // Returns 0 when you're facing sideways and can't walk.
  function walkStep(direction) {
    if (currentView === VIEW_FACING_FORWARD) return direction;
    if (currentView === VIEW_FACING_BACKWARD) return -direction;
    return 0;
  }

  function canWalk(direction) {
    const step = walkStep(direction);
    return step !== 0 && isValidLocation(currentLocation + step);
  }

  function updateNavButtons() {
    byId("buttonNavForward").style.display = canWalk(1) ? "initial" : "none";
    byId("buttonNavBackward").style.display = canWalk(-1) ? "initial" : "none";
  }

  function updateMinimap() {
    const { x, y } = MINIMAP_POSITIONS[currentLocation - 1];
    byId("minimapPointer").style.transform = `translate(${x}px, ${y}px)`;
  }

  // Tell screen reader users where they are and what they can see
  function announce(prefix = "") {
    const titles = visibleMarkers().map(({ place }) => placeInfo(place - 1).title);
    const inView = titles.length ? `In view: ${titles.join(", ")}.` : "No places in view.";
    byId("announcer").textContent =
      `${prefix}Location ${currentLocation} of ${LOCATION_COUNT}, view ${currentView + 1} of ${VIEW_COUNT}. ${inView}`;
  }

  function render() {
    stage.style.backgroundImage = `url(${backgroundUrl(isNight, currentLocation, currentView)})`;
    updateNavButtons();
    updateMarkers();
    updateMinimap();
    preloadNeighbors();
  }

  // ---- Info card ----

  function setButtonsDisabled(disabled) {
    for (const button of document.getElementsByTagName("button")) {
      button.disabled = disabled;
    }
    byId("infocardBtnClose").disabled = false;
  }

  function openInfoCard(placeIndex, opener) {
    const info = placeInfo(placeIndex);
    byId("infocardHeadContent").textContent = info.title;
    // Descriptions contain <i> tags, so this needs innerHTML
    byId("infocardDescrContent").innerHTML = info.description;
    byId("infocardImageUrl").src = "./assets/" + info.image;
    byId("infocardImageUrl").alt = info.title;
    byId("infocardBtnLearnMore").href = info.link;

    byId("infocard").style.display = "initial";
    setButtonsDisabled(true);
    infoCardOpen = true;
    infoCardOpener = opener;
    byId("infocardBtnClose").focus();
  }

  function closeInfoCard() {
    byId("infocard").style.display = "none";
    setButtonsDisabled(false);
    infoCardOpen = false;
    playSound("close");
    if (infoCardOpener) infoCardOpener.focus();
  }

  // ---- Movement ----

  function turn(step) {
    currentView = (currentView + step + VIEW_COUNT) % VIEW_COUNT;
    render();
    announce();
    playSound("select");
  }

  // direction: 1 = forward, -1 = backward
  function walk(direction) {
    if (canWalk(direction)) {
      currentLocation += walkStep(direction);
    }
    render();
    announce();
    playSound("select");
  }

  function toggleDayNight() {
    isNight = !isNight;
    byId("clickhere").style.display = "none";
    document.body.classList.toggle("nighttime", isNight);
    byId("buttonDayNight").querySelector("button").setAttribute("aria-label", isNight ? "Switch to day" : "Switch to night");
    render();
    announce(isNight ? "Switched to night. " : "Switched to day. ");
    playSound(isNight ? "night" : "day");
  }

  // ---- Input ----

  byId("buttonDayNight").querySelector("button").addEventListener("click", toggleDayNight);
  byId("buttonViewLeft").querySelector("button").addEventListener("click", () => turn(-1));
  byId("buttonViewRight").querySelector("button").addEventListener("click", () => turn(1));
  byId("buttonNavForward").querySelector("button").addEventListener("click", () => walk(1));
  byId("buttonNavBackward").querySelector("button").addEventListener("click", () => walk(-1));
  byId("infocardBtnClose").addEventListener("click", closeInfoCard);

  const KEY_ACTIONS = {
    KeyA: () => turn(-1),
    KeyD: () => turn(1),
    KeyW: () => walk(1),
    KeyS: () => walk(-1),
    ArrowLeft: () => turn(-1),
    ArrowRight: () => turn(1),
    ArrowUp: () => walk(1),
    ArrowDown: () => walk(-1),
  };

  document.addEventListener("keyup", (event) => {
    if (infoCardOpen) {
      if (event.key === "Escape") closeInfoCard();
      // Don't move around behind an open info card
      return;
    }
    const action = KEY_ACTIONS[event.code];
    if (action) action();
  });

  if (DEV_MODE) {
    byId("mousePos").addEventListener("click", (event) => {
      console.log(`{ x: ${event.offsetX - 800}, y: ${event.offsetY - 133} }`);
    });
  }

  // ---- Start ----

  // Wait for the loading screen to finish before showing the tour
  window.addEventListener("load", () => {
    render();
    for (const id of ["buttonViewLeftContainer", "buttonViewRightContainer", "buttonDayNight", "minimapContainer", "clickhere"]) {
      byId(id).style.display = "initial";
    }
  });
})();
