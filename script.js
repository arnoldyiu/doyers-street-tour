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

  const byId = (id) => document.getElementById(id);

  // ---- State ----

  let isNight = false;
  let currentLocation = 1; // 1-6
  let currentView = 0; // 0-7, turning right goes up
  let infoCardOpen = false;

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
      <p>${i + 1}</p>
      <img class="mapMarker poabsolute" alt="">
      <button class="mapMarkerMask"><div class="poabsolute"></div></button>`;

    const button = marker.querySelector("button");
    button.setAttribute("aria-label", `Place ${i + 1}`);
    button.addEventListener("mouseover", () => playSound("hover"));
    button.addEventListener("click", () => {
      playSound("marker");
      openInfoCard(i);
    });

    byId("mapMarkers").appendChild(marker);
    return marker;
  });

  function updateMarkers() {
    markerElements.forEach((marker) => (marker.style.display = "none"));
    const visible = MARKERS[timeOfDay()][currentLocation - 1][currentView];
    for (const { place, x, y } of visible) {
      const marker = markerElements[place - 1];
      marker.style.display = "initial";
      marker.style.transform = `translate(${x}px, ${y}px)`;
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

  function render() {
    document.body.style.backgroundImage = `url(${backgroundUrl(isNight, currentLocation, currentView)})`;
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

  function openInfoCard(placeIndex) {
    const info = PLACES[placeIndex][timeOfDay()];
    byId("infocardHeadContent").textContent = info.title;
    // Descriptions contain <i> tags, so this needs innerHTML
    byId("infocardDescrContent").innerHTML = info.description;
    byId("infocardImageUrl").src = "./assets/" + info.image;
    byId("infocardImageUrl").alt = info.title;
    byId("infocardBtnLearnMore").href = info.link;

    byId("infocard").style.display = "initial";
    setButtonsDisabled(true);
    infoCardOpen = true;
  }

  function closeInfoCard() {
    byId("infocard").style.display = "none";
    setButtonsDisabled(false);
    infoCardOpen = false;
    playSound("close");
  }

  // ---- Movement ----

  function turn(step) {
    currentView = (currentView + step + VIEW_COUNT) % VIEW_COUNT;
    render();
    playSound("select");
  }

  // direction: 1 = forward, -1 = backward
  function walk(direction) {
    if (canWalk(direction)) {
      currentLocation += walkStep(direction);
    }
    render();
    playSound("select");
  }

  function toggleDayNight() {
    isNight = !isNight;
    byId("clickhere").style.display = "none";
    document.body.classList.toggle("nighttime", isNight);
    render();
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
  };

  document.addEventListener("keyup", (event) => {
    // Don't move around behind an open info card
    if (infoCardOpen) return;
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
