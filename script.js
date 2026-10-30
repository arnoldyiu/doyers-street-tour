var images = [];
function preload() {
    for (var i = 0; i < arguments.length; i++) {
        images[i] = new Image();
        images[i].src = preload.arguments[i];
    }
}

preload(
  "./assets/clock_button.png", "./assets/clock_button_Night.png", "./assets/infocardimg_01.jpg", "./assets/infocardimg_02.jpg", "./assets/infocardimg_03.jpg", "./assets/infocardimg_04.jpg", "./assets/infocardimg_05.jpg", "./assets/infocardimg_06.jpg", "./assets/infocardimg_07.jpg", "./assets/infocardimg_08.jpg", "./assets/infocardimg_09.jpg", "./assets/infocardimg_10.jpg", "./assets/infocardimg_11.jpg", "./assets/infocardimg_12.jpg", "./assets/bgALocation01View00.JPEG", "./assets/bgALocation01View01.JPEG", "./assets/bgALocation01View02.JPEG", "./assets/bgALocation01View03.JPEG", "./assets/bgALocation01View04.JPEG", "./assets/bgALocation01View05.JPEG", "./assets/bgALocation01View06.JPEG", "./assets/bgALocation01View07.JPEG", "./assets/bgALocation02View00.JPEG", "./assets/bgALocation02View01.JPEG", "./assets/bgALocation02View02.JPEG", "./assets/bgALocation02View03.JPEG", "./assets/bgALocation02View04.JPEG", "./assets/bgALocation02View05.JPEG", "./assets/bgALocation02View06.JPEG", "./assets/bgALocation02View07.JPEG", "./assets/bgALocation03View00.JPEG", "./assets/bgALocation03View01.JPEG", "./assets/bgALocation03View02.JPEG", "./assets/bgALocation03View03.JPEG", "./assets/bgALocation03View04.JPEG", "./assets/bgALocation03View05.JPEG", "./assets/bgALocation03View06.JPEG", "./assets/bgALocation03View07.JPEG", "./assets/bgALocation04View00.JPEG", "./assets/bgALocation04View01.JPEG", "./assets/bgALocation04View02.JPEG", "./assets/bgALocation04View03.JPEG", "./assets/bgALocation04View04.JPEG", "./assets/bgALocation04View05.JPEG", "./assets/bgALocation04View06.JPEG", "./assets/bgALocation04View07.JPEG", "./assets/bgALocation05View00.JPEG", "./assets/bgALocation05View01.JPEG", "./assets/bgALocation05View02.JPEG", "./assets/bgALocation05View03.JPEG", "./assets/bgALocation05View04.JPEG", "./assets/bgALocation05View05.JPEG", "./assets/bgALocation05View06.JPEG", "./assets/bgALocation05View07.JPEG", "./assets/bgALocation06View00.JPEG", "./assets/bgALocation06View01.JPEG", "./assets/bgALocation06View02.JPEG", "./assets/bgALocation06View03.JPEG", "./assets/bgALocation06View04.JPEG", "./assets/bgALocation06View05.JPEG", "./assets/bgALocation06View06.JPEG", "./assets/bgALocation06View07.JPEG", "./assets/bgPLocation01View00.JPEG", "./assets/bgPLocation01View01.JPEG", "./assets/bgPLocation01View02.JPEG", "./assets/bgPLocation01View03.JPEG", "./assets/bgPLocation01View04.JPEG", "./assets/bgPLocation01View05.JPEG", "./assets/bgPLocation01View06.JPEG", "./assets/bgPLocation01View07.JPEG", "./assets/bgPLocation02View00.JPEG", "./assets/bgPLocation02View01.JPEG", "./assets/bgPLocation02View02.JPEG", "./assets/bgPLocation02View03.JPEG", "./assets/bgPLocation02View04.JPEG", "./assets/bgPLocation02View05.JPEG", "./assets/bgPLocation02View06.JPEG", "./assets/bgPLocation02View07.JPEG", "./assets/bgPLocation03View00.JPEG", "./assets/bgPLocation03View01.JPEG", "./assets/bgPLocation03View02.JPEG", "./assets/bgPLocation03View03.JPEG", "./assets/bgPLocation03View04.JPEG", "./assets/bgPLocation03View05.JPEG", "./assets/bgPLocation03View06.JPEG", "./assets/bgPLocation03View07.JPEG", "./assets/bgPLocation04View00.JPEG", "./assets/bgPLocation04View01.JPEG", "./assets/bgPLocation04View02.JPEG", "./assets/bgPLocation04View03.JPEG", "./assets/bgPLocation04View04.JPEG", "./assets/bgPLocation04View05.JPEG", "./assets/bgPLocation04View06.JPEG", "./assets/bgPLocation04View07.JPEG", "./assets/bgPLocation05View00.JPEG", "./assets/bgPLocation05View01.JPEG", "./assets/bgPLocation05View02.JPEG", "./assets/bgPLocation05View03.JPEG", "./assets/bgPLocation05View04.JPEG", "./assets/bgPLocation05View05.JPEG", "./assets/bgPLocation05View06.JPEG", "./assets/bgPLocation05View07.JPEG", "./assets/bgPLocation06View00.JPEG", "./assets/bgPLocation06View01.JPEG", "./assets/bgPLocation06View02.JPEG", "./assets/bgPLocation06View03.JPEG", "./assets/bgPLocation06View04.JPEG", "./assets/bgPLocation06View05.JPEG", "./assets/bgPLocation06View06.JPEG", "./assets/bgPLocation06View07"
);


var sfxHover = new Audio('./assets/sfx_hover.wav');
var sfxSelect = new Audio('./assets/sfx_select.wav');
var sfxDayTime = new Audio('./assets/sfx_daytime.wav');
var sfxNightTime = new Audio('./assets/sfx_nighttime.wav');
var sfxMapMarker = new Audio('./assets/sfx_mapmarker.wav');
var sfxReturn = new Audio('./assets/sfx_return.wav');

// Rewind before playing so rapid triggers restart the sound instead of being ignored
function playSfx(sfx) {
  sfx.currentTime = 0;
  sfx.play();
}

var mapMarkerMasks = document.getElementsByClassName("mapMarkerMask");

for (var i = 0; i < mapMarkerMasks.length; i++) {
  mapMarkerMasks[i].addEventListener('mouseover', function () {playSfx(sfxHover);}, false);
  mapMarkerMasks[i].addEventListener('click', function () {playSfx(sfxMapMarker);}, false);
}



function printMousePos(event) {
  console.log((event.offsetX - 800) + ";" + (event.offsetY - 133));
}

const mousePosMask = document.getElementById("mousePos");
mousePosMask.addEventListener("click", printMousePos);


var isNightTime = false;

var mapLocation = [1, 2, 3, 4, 5, 6];
var mapView = [0, 1, 2, 3, 4, 5, 6, 7];
var currentLocation = 1;
var currentView = 0;
var infoCardTitleIndex = ["Peachy's (5 Doyers St.)", "U.S. Post Office (6 Doyers St.)", "Apotheke Chinatown (9 Doyers St.)", "Blue Agave Pulquería NYC (11 Doyers St.)", "Nom Wah Tea Parlor (13–15 Doyers St.)", "Toy Apple Beauty & Barber Salon (16 Doyers St.)", "Chinese Theater", "Chatham Club", "Sanitary Aid Society Housing", "Mandarin Tea Garden", "History of Nom Wah Tea Parlor", "The Future of Chinatown's Barbershops?"];
var infoCardImgIndex = ["infocardimg_01.jpg", "infocardimg_02.jpg", "infocardimg_03.jpg", "infocardimg_04.jpg", "infocardimg_05.jpg", "infocardimg_06.jpg", "infocardimg_07.jpg", "infocardimg_08.jpg", "infocardimg_09.jpg", "infocardimg_10.jpg", "infocardimg_11.jpg", "infocardimg_12.jpg"];
var infoCardDescrIndex = ["A downstairs bar serving up craft cocktails and small bites with a funky, retro Asian flair. It's managed by the proprietors of Chinese Tuxedo, a contemporary Chinese fine-dining restaurant spanning two floors.", "In the (un)likely event you're eating your heart out at Nom Wah <i>and</i> want to write home at the same time—with the Post Office right by your side, consider those postcards raving about the best dim sum of your life as good as sent.", "An apothecary-themed bar with a vintage, speakeasy-like atmosphere. The host of many a number of private dinner events and live band performances, this off-the-beaten-path hideaway is a nightlife favorite for locals and tourists alike.", "Underground restaurant and bar offering creative cocktails and nibbles that blend Mexican flavors with an American twist. Apparently, their vegetarian burritos are really good—too bad I only eat meat.", "A time-honored dim sum restaurant tucked in the heart of Chinatown, Nom Wah Tea Parlor serves a variety of classic, made-to-order dim sum dishes that have delighted its patrons since 1920.", "A small-time Chinese barbershop with a traditional, nostalgic flair. Known for its expert stylists and nostalgic atmosphere, Toy Apple is a go-to spot for both classic cuts and contemporary hair designs.", "From 1893 to 1911, 5–7 Doyers Street was home to the very first Chinese-language theater in New York City. It was also the site of a fundraising campaign to aid New York's Jewish community during the Kishinev massacre in 1903.", "A notorious underground dive for politicians, gangsters, and celebrities. Its true purpose remains shrouded in secret, but modern rumors suggest that it was used as a hideout for illegal activities such as gambling and racketeering.", "In 1885, the Doyers Street Sanitary Aid Society provided crucial housing support for Manhattan Chinatown's less fortunate—a move reflecting the Chinese American community's broader efforts to improve living conditions in urban areas.", "Mandarin Tea Garden operated in the early 1900s, apparently quite popular with white Bowery workingmen and uptown slummers. The owners were known for hosting tours around Chinatown for their clientele.", "Nom Wah was originally located at 13–15 Doyers Street, only moving to its current location at 11-13 after a lease loss in 1968. It used to lack a menu, only offering dish names scrawled on the back of a business card as a concession to hungry foreigners.", "In recent years, Chinatown's barbershops have faced a dwindling customer base consisting of aging regulars and few newcomers. As rents rise and younger folks globalize, they risk fading into obscurity from New York's cultural landscape."];
var infoCardTitle = infoCardTitleIndex[0];
var infoCardImg = infoCardImgIndex[0];
var infoCardDescr = infoCardDescrIndex[0];

function returnPosIndex() {
  return (8 * (currentLocation - 1)) + currentView;
}

function convertPosIndexToDayNight() {
  return isNightTime ? returnPosIndex() + 48 : returnPosIndex();
}

// X from left = 50%; Y from top = 0


var mapMarkerOnePositionXIndex = [10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, -417, 10000, 10000, 10000, 10000, 10000, 10000, 62, 10000, 10000, 10000, 10000, 10000, 300, -630, 10000, 10000, 10000, 10000, 10000, -300, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, -324, 10000, 10000, 10000, 10000, 10000, 10000, 460, -390, 10000, 10000, 10000, 10000, 10000, 496, -198, 10000, 10000, 10000, 10000, 493, -312, 10000, 10000, 10000, 10000, 10000, 495, -364, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000];
var mapMarkerOnePositionYIndex = [10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 415, 10000, 10000, 10000, 10000, 10000, 10000, 385, 10000, 10000, 10000, 10000, 10000, 430, 452, 10000, 10000, 10000, 10000, 10000, 588, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 444, 10000, 10000, 10000, 10000, 10000, 10000, 463, 463, 10000, 10000, 10000, 10000, 10000, 517, 509, 10000, 10000, 10000, 10000, 550, 557, 10000, 10000, 10000, 10000, 10000, 528, 551, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000];
var mapMarkerTwoPositionXIndex = [-31, -701, 10000, 10000, 10000, 10000, 10000, 608, 118, -494, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 428, -58, -482, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 480, -333, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 162, -522, 10000, 10000, 10000, 10000, 10000, 626, 419, -426, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 245, 269, -581, -630, 10000, 10000, 10000, 10000, 10000, 10000, -98, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000];
var mapMarkerTwoPositionYIndex = [405, 431, 10000, 10000, 10000, 10000, 10000, 399, 448, 437, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 301, 357, 342, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 377, 387, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 478, 503, 10000, 10000, 10000, 10000, 10000, 473, 441, 451, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 374, 400, 433, 439, 10000, 10000, 10000, 10000, 10000, 10000, 503, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000];
var mapMarkerThreePositionXIndex = [10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, -220, 10000, 10000, 10000, 10000, 10000, 10000, 244, 10000, 10000, 10000, 10000, 10000, 10000, 10000, -738, 10000, 10000, 10000, 10000, -150, 10000, 10000, 10000, 10000, 10000, 10000, 10000, -64, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, -251, 10000, 10000, 10000, 10000, 10000, 10000, 537, -61, 10000, 10000, 10000, 10000, 10000, 10000, 90, 10000, 10000, 10000, 10000, 10000, 616, -308, 10000, 10000, 10000, 10000, 10000, -174, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 142, 10000, 10000, 10000];
var mapMarkerThreePositionYIndex = [10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 379, 10000, 10000, 10000, 10000, 10000, 10000, 343, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 164, 10000, 10000, 10000, 10000, 485, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 401, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 442, 10000, 10000, 10000, 10000, 10000, 10000, 451, 397, 10000, 10000, 10000, 10000, 10000, 10000, 479, 10000, 10000, 10000, 10000, 10000, 462, 462, 10000, 10000, 10000, 10000, 10000, 505, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 413, 10000, 10000, 10000];
var mapMarkerFourPositionXIndex = [10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, -342, 10000, 10000, 10000, 10000, 10000, 10000, 373, -95, 10000, 10000, 10000, 10000, 10000, 10000, 384, -544, 10000, 10000, 10000, 10000, 10000, 10000, 142, 10000, 10000, 10000, 10000, 76, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, -176, 10000, 10000, 10000, 10000, 10000, 10000, 638, 114, 10000, 10000, 10000, 10000, 10000, 10000, 289, 10000, 10000, 10000, 10000, 10000, 10000, 523, -202, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 202, 10000, 10000, 10000];
var mapMarkerFourPositionYIndex = [10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 439, 10000, 10000, 10000, 10000, 10000, 10000, 373, 357, 10000, 10000, 10000, 10000, 10000, 10000, 325, 323, 10000, 10000, 10000, 10000, 10000, 10000, 277, 10000, 10000, 10000, 10000, 506, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 426, 10000, 10000, 10000, 10000, 10000, 10000, 446, 399, 10000, 10000, 10000, 10000, 10000, 10000, 464, 10000, 10000, 10000, 10000, 10000, 10000, 419, 426, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 397, 10000, 10000, 10000];
var mapMarkerFivePositionXIndex = [10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, -268, 10000, 10000, 10000, 10000, 10000, 10000, 459, 46, -581, 10000, 10000, 10000, 10000, 10000, 582, 19, -680, 10000, 10000, 10000, 10000, 10000, 540, 10000, 10000, 10000, 10000, 176, -668, 10000, 10000, 10000, 10000, 10000, 10000, 70, -749, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, -40, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 333, -590, 10000, 10000, 10000, 10000, 10000, 527, -359, 10000, 10000, 10000, 10000, 10000, 10000, 398, 10000, 10000, 10000, 10000, 72, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 264, 10000, 10000, 10000];
var mapMarkerFivePositionYIndex = [10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 419, 10000, 10000, 10000, 10000, 10000, 10000, 358, 367, 397, 10000, 10000, 10000, 10000, 10000, 319, 336, 317, 10000, 10000, 10000, 10000, 10000, 263, 10000, 10000, 10000, 10000, 483, 460, 10000, 10000, 10000, 10000, 10000, 10000, 482, 517, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 403, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 371, 390, 10000, 10000, 10000, 10000, 10000, 439, 364, 10000, 10000, 10000, 10000, 10000, 10000, 418, 10000, 10000, 10000, 10000, 465, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 392, 10000, 10000, 10000];
var mapMarkerSixPositionXIndex = [10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 139, 10000, 10000, 10000, 10000, 10000, 10000, 613, 229, -585, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, -128, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, -201, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 234, -596, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 59, 10000, 10000, 10000];
var mapMarkerSixPositionYIndex = [10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 333, 10000, 10000, 10000, 10000, 10000, 10000, 213, 188, 143, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 413, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 431, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 413, 405, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 391, 10000, 10000, 10000];

var mapMarkerOnePositionX = mapMarkerOnePositionXIndex[0];
var mapMarkerOnePositionY = mapMarkerOnePositionYIndex[0];
var mapMarkerTwoPositionX = mapMarkerTwoPositionXIndex[0];
var mapMarkerTwoPositionY = mapMarkerTwoPositionYIndex[0];
var mapMarkerThreePositionX = mapMarkerThreePositionXIndex[0];
var mapMarkerThreePositionY = mapMarkerThreePositionYIndex[0];
var mapMarkerFourPositionX = mapMarkerFourPositionXIndex[0];
var mapMarkerFourPositionY = mapMarkerFourPositionYIndex[0];
var mapMarkerFivePositionX = mapMarkerFivePositionXIndex[0];
var mapMarkerFivePositionY = mapMarkerFivePositionYIndex[0];
var mapMarkerSixPositionX = mapMarkerSixPositionXIndex[0];
var mapMarkerSixPositionY = mapMarkerSixPositionYIndex[0];

var minimapPointerPositionXIndex = [112, 114, 116, 107, 134, 180];
var minimapPointerPositionYIndex = [220, 178, 120, 90, 57, 26];

var minimapPointerPositionX = minimapPointerPositionXIndex[0];
var minimapPointerPositionY = minimapPointerPositionYIndex[0];

var learnMoreLinkIndex = ["https://www.peachys.nyc/", "https://new-york.postofficehours.us/new-york/CHINATOWN/6-DOYERS-ST-10013/", "https://www.apothekemixology.com/location/nyc-apotheke/", "https://blueagavenyc.com/", "https://nomwah.com/chinatown/", "https://www.yelp.com/biz/toy-apple-beauty-and-barber-salon-new-york", "https://forward.com/culture/134950/the-night-new-york-s-chinese-went-out-for-jews/", "https://books.google.com/books?id=KEwe-UMAYWEC&pg=PA106#v=onepage&q&f=false", "https://bedfordandbowery.com/2020/01/9-doyers-street-and-the-gangs-of-new-york-scorsese-didnt-tell-us-about/", "https://fortamsterdamnyc.blogspot.com/2014/04/block-party-doyers-street-between-pell.html", "https://www.nytimes.com/2011/04/13/dining/reviews/13under.html", "https://www.sixthtone.com/news/1011144"];
var learnMoreLink = learnMoreLinkIndex[0];


function updateIndexVariables() {
  mapMarkerOnePositionX = mapMarkerOnePositionXIndex[convertPosIndexToDayNight()];
  mapMarkerOnePositionY = mapMarkerOnePositionYIndex[convertPosIndexToDayNight()];
  mapMarkerTwoPositionX = mapMarkerTwoPositionXIndex[convertPosIndexToDayNight()];
  mapMarkerTwoPositionY = mapMarkerTwoPositionYIndex[convertPosIndexToDayNight()];
  mapMarkerThreePositionX = mapMarkerThreePositionXIndex[convertPosIndexToDayNight()];
  mapMarkerThreePositionY = mapMarkerThreePositionYIndex[convertPosIndexToDayNight()];
  mapMarkerFourPositionX = mapMarkerFourPositionXIndex[convertPosIndexToDayNight()];
  mapMarkerFourPositionY = mapMarkerFourPositionYIndex[convertPosIndexToDayNight()];
  mapMarkerFivePositionX = mapMarkerFivePositionXIndex[convertPosIndexToDayNight()];
  mapMarkerFivePositionY = mapMarkerFivePositionYIndex[convertPosIndexToDayNight()];
  mapMarkerSixPositionX = mapMarkerSixPositionXIndex[convertPosIndexToDayNight()];
  mapMarkerSixPositionY = mapMarkerSixPositionYIndex[convertPosIndexToDayNight()];
  minimapPointerPositionX = minimapPointerPositionXIndex[currentLocation - 1];
  minimapPointerPositionY = minimapPointerPositionYIndex[currentLocation - 1];
}

function updateMapMarkerLocation() {
  updateIndexVariables();
  document.getElementById("mapMarkerOne").style.transform = `translate(${mapMarkerOnePositionX}px, ${mapMarkerOnePositionY}px)`;
  document.getElementById("mapMarkerTwo").style.transform = `translate(${mapMarkerTwoPositionX}px, ${mapMarkerTwoPositionY}px)`;
  document.getElementById("mapMarkerThree").style.transform = `translate(${mapMarkerThreePositionX}px, ${mapMarkerThreePositionY}px)`;
  document.getElementById("mapMarkerFour").style.transform = `translate(${mapMarkerFourPositionX}px, ${mapMarkerFourPositionY}px)`;
  document.getElementById("mapMarkerFive").style.transform = `translate(${mapMarkerFivePositionX}px, ${mapMarkerFivePositionY}px)`;
  document.getElementById("mapMarkerSix").style.transform = `translate(${mapMarkerSixPositionX}px, ${mapMarkerSixPositionY}px)`;
  document.getElementById("minimapPointer").style.transform = `translate(${minimapPointerPositionX}px, ${minimapPointerPositionY}px)`;
}

function showViewButtons() {
  document.getElementById("buttonViewLeftContainer").style.display = "initial";
  document.getElementById("buttonViewRightContainer").style.display = "initial";
  document.getElementById("buttonDayNight").style.display = "initial";
  document.getElementById("mapMarkerOne").style.display = "initial";
  document.getElementById("mapMarkerTwo").style.display = "initial";
  document.getElementById("mapMarkerThree").style.display = "initial";
  document.getElementById("mapMarkerFour").style.display = "initial";
  document.getElementById("mapMarkerFive").style.display = "initial";
  document.getElementById("mapMarkerSix").style.display = "initial";
  document.getElementById("minimapContainer").style.display = "initial";
  document.getElementById("clickhere").style.display = "initial";
}

function showHideNavButtons() {
  // only show navigation buttons on views 0 and 4

  const getButtonLocation = document.getElementsByClassName("buttonLocation");

  if (currentView === 0 || currentView === 4) {
    for (let i = 0; i < getButtonLocation.length; i++) {
      getButtonLocation[i].style.display = "initial";
    }
  } else {
    for (let i = 0; i < getButtonLocation.length; i++) {
      getButtonLocation[i].style.display = "none";
    }
  }

  // hide navigation buttons if you can't go forward or back any further

  if ((currentLocation === 1 && currentView === 4) || (currentLocation === 6 && currentView === 0)) {
    document.getElementById("buttonNavForward").style.display = "none";
  }
  if ((currentLocation === 1 && currentView === 0) || (currentLocation === 6 && currentView === 4)) {
    document.getElementById("buttonNavBackward").style.display = "none";
  }
}

function closeInfoCard() {
  const buttons = document.getElementsByTagName("button");
  document.getElementById("infocard").style.display = "none";
  for (const button of buttons) {
    button.disabled = false;
  }
  playSfx(sfxReturn);
}

function openInfoCard() {
  const buttons = document.getElementsByTagName("button");
  document.getElementById("infocard").style.display = "initial";
  for (const button of buttons) {
    button.disabled = true;
  }
  document.getElementById("infocardBtnClose").removeAttribute("disabled");
}

function logPosIndex() {
  console.log("Current positioning index: " + returnPosIndex());
}

function checkNightTime() {
  return isNightTime ? "P" : "A";
}

function updateFileName() {
  return "bg" + checkNightTime() + "Location0" + currentLocation + "View0" + currentView;
}

function returnFileName() {
  // console.log(updateFileName());
  // logPosIndex();
}

function updateBackground() {
  document.body.style.cssText += `background-image: url(${'./assets/' + updateFileName() + '.JPEG'})`;
  // console.log("Background updated.");
  showHideNavButtons();
  updateMapMarkerLocation();
}

function updateInfoCard() {
  document.getElementById("infocardHeadContent").innerHTML = `${infoCardTitle}`;
  document.getElementById("infocardDescrContent").innerHTML = `${infoCardDescr}`;
  document.getElementById("infocardImageUrl").style.cssText += `content: url(${'./assets/' + infoCardImg})`;
  document.getElementById("infocardBtnLearnMore").setAttribute("href", learnMoreLink);
}

function toggleDayNight() {
  isNightTime = !isNightTime;
  document.getElementById("clickhere").style.display = "none";
  console.log("Switched to " + checkNightTime() + ".M.")
  document.getElementById("infocard").classList.toggle("nighttime");
  document.getElementById("buttonImageNavForward").classList.toggle("nighttime");
  document.getElementById("buttonImageNavBackward").classList.toggle("nighttime");
  document.getElementById("buttonDayNightGraphic").classList.toggle("nighttime");
  document.getElementById("minimap").classList.toggle("nighttime");
  updateBackground();
  updateInfoCard();
  isNightTime ? playSfx(sfxNightTime) : playSfx(sfxDayTime);
}

function viewTurnRight() {
  mapView[currentView++];
  if (currentView === mapView.length) {
    currentView = 0;
  }
  // console.log(currentView);
  returnFileName();
  updateBackground();
  playSfx(sfxSelect);
}

function viewTurnLeft() {
  mapView[currentView--];
  if (currentView === -1) {
    currentView = mapView.length - 1;
  }
  // console.log(currentView);
  returnFileName();
  updateBackground();
  playSfx(sfxSelect);
}

function addLocation() {
  if (currentLocation === mapLocation.length) {
    // console.log("You can't move forward any further.");
  } else {
    mapLocation[currentLocation++];
    // console.log("After moving forward, you are at location 0" + currentLocation);
  }
}

function subtractLocation() {
  if (currentLocation === 1) {
    // console.log("You can't move backward any further.");
  } else {
    mapLocation[currentLocation--];
    // console.log("After moving backward, you are at location 0" + currentLocation);
  }
}

function locMoveBackward() {
  // console.log("Before moving backward, you are at " + currentLocation);
  if (currentView === 0) {
    subtractLocation();
  } else if (currentView === 4) {
    addLocation();
  }
  returnFileName();
  updateBackground();
  playSfx(sfxSelect);
}

function locMoveForward() {
  // console.log("Before moving forward, you are at " + currentLocation);
  if (currentView === 0) {
    addLocation();
  } else if (currentView === 4) {
    subtractLocation();
  }
  returnFileName();
  updateBackground();
  playSfx(sfxSelect);
}

function mapMarkerClick() {
  openInfoCard();
  console.log("You just clicked on a map marker!");
}

function returnTitleIndex(titleIndex) {
  return isNightTime ? titleIndex + 6 : titleIndex;
}

function locationOne() {
  infoCardTitle = infoCardTitleIndex[returnTitleIndex(0)];
  infoCardImg = infoCardImgIndex[returnTitleIndex(0)];
  infoCardDescr = infoCardDescrIndex[returnTitleIndex(0)];
  learnMoreLink = learnMoreLinkIndex[returnTitleIndex(0)];
  console.log("Changed to location 1");
  updateInfoCard();
}

function locationTwo() {
  infoCardTitle = infoCardTitleIndex[returnTitleIndex(1)];
  infoCardImg = infoCardImgIndex[returnTitleIndex(1)];
  infoCardDescr = infoCardDescrIndex[returnTitleIndex(1)];
  learnMoreLink = learnMoreLinkIndex[returnTitleIndex(1)];
  console.log("Changed to location 2");
  updateInfoCard();
}

function locationThree() {
  infoCardTitle = infoCardTitleIndex[returnTitleIndex(2)];
  infoCardImg = infoCardImgIndex[returnTitleIndex(2)];
  infoCardDescr = infoCardDescrIndex[returnTitleIndex(2)];
  learnMoreLink = learnMoreLinkIndex[returnTitleIndex(2)];
  console.log("Changed to location 3");
  updateInfoCard();
}

function locationFour() {
  infoCardTitle = infoCardTitleIndex[returnTitleIndex(3)];
  infoCardImg = infoCardImgIndex[returnTitleIndex(3)];
  infoCardDescr = infoCardDescrIndex[returnTitleIndex(3)];
  learnMoreLink = learnMoreLinkIndex[returnTitleIndex(3)];
  console.log("Changed to location 4");
  updateInfoCard();
}

function locationFive() {
  infoCardTitle = infoCardTitleIndex[returnTitleIndex(4)];
  infoCardImg = infoCardImgIndex[returnTitleIndex(4)];
  infoCardDescr = infoCardDescrIndex[returnTitleIndex(4)];
  learnMoreLink = learnMoreLinkIndex[returnTitleIndex(4)];
  console.log("Changed to location 5");
  updateInfoCard();
}

function locationSix() {
  infoCardTitle = infoCardTitleIndex[returnTitleIndex(5)];
  infoCardImg = infoCardImgIndex[returnTitleIndex(5)];
  infoCardDescr = infoCardDescrIndex[returnTitleIndex(5)];
  learnMoreLink = learnMoreLinkIndex[returnTitleIndex(5)];
  console.log("Changed to location 6");
  updateInfoCard();
}


document.body.onkeydown = function (e) {
  if (e.key == "E" ||
    e.code == "KeyE" ||
    e.keyCode == 69
  ) {
    console.log("10000;10000");
  }
}

document.body.onkeyup = function (e) {
  // Don't move around behind an open info card
  if (document.getElementById("infocard").style.display === "initial") {
    return;
  }
  if (e.key == "a" ||
    e.code == "KeyA" ||
    e.keyCode == 65
  ) {
    viewTurnLeft();
  }
  if (e.key == "w" ||
    e.code == "KeyW" ||
    e.keyCode == 87
  ) {
    locMoveForward();
  }
  if (e.key == "s" ||
    e.code == "KeyS" ||
    e.keyCode == 83
  ) {
    locMoveBackward();
  }
  if (e.key == "d" ||
    e.code == "KeyD" ||
    e.keyCode == 68
  ) {
    viewTurnRight();
  }
}