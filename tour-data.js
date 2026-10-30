// The six places on Doyers St, in walking order. Each has a day and night version.
const PLACES = [
  {
    day: {
      title: "Peachy's (5 Doyers St.)",
      image: "infocardimg_01.webp",
      description: "A downstairs bar serving up craft cocktails and small bites with a funky, retro Asian flair. It's managed by the proprietors of Chinese Tuxedo, a contemporary Chinese fine-dining restaurant spanning two floors.",
      link: "https://www.peachys.nyc/",
    },
    night: {
      title: "Chinese Theater",
      image: "infocardimg_07.webp",
      description: "From 1893 to 1911, 5–7 Doyers Street was home to the very first Chinese-language theater in New York City. It was also the site of a fundraising campaign to aid New York's Jewish community during the Kishinev massacre in 1903.",
      link: "https://forward.com/culture/134950/the-night-new-york-s-chinese-went-out-for-jews/",
    },
  },
  {
    day: {
      title: "U.S. Post Office (6 Doyers St.)",
      image: "infocardimg_02.webp",
      description: "In the (un)likely event you're eating your heart out at Nom Wah <i>and</i> want to write home at the same time—with the Post Office right by your side, consider those postcards raving about the best dim sum of your life as good as sent.",
      link: "https://new-york.postofficehours.us/new-york/CHINATOWN/6-DOYERS-ST-10013/",
    },
    night: {
      title: "Chatham Club",
      image: "infocardimg_08.webp",
      description: "A notorious underground dive for politicians, gangsters, and celebrities. Its true purpose remains shrouded in secret, but modern rumors suggest that it was used as a hideout for illegal activities such as gambling and racketeering.",
      link: "https://books.google.com/books?id=KEwe-UMAYWEC&pg=PA106#v=onepage&q&f=false",
    },
  },
  {
    day: {
      title: "Apotheke Chinatown (9 Doyers St.)",
      image: "infocardimg_03.webp",
      description: "An apothecary-themed bar with a vintage, speakeasy-like atmosphere. The host of many a number of private dinner events and live band performances, this off-the-beaten-path hideaway is a nightlife favorite for locals and tourists alike.",
      link: "https://www.apothekemixology.com/location/nyc-apotheke/",
    },
    night: {
      title: "Sanitary Aid Society Housing",
      image: "infocardimg_09.webp",
      description: "In 1885, the Doyers Street Sanitary Aid Society provided crucial housing support for Manhattan Chinatown's less fortunate—a move reflecting the Chinese American community's broader efforts to improve living conditions in urban areas.",
      link: "https://bedfordandbowery.com/2020/01/9-doyers-street-and-the-gangs-of-new-york-scorsese-didnt-tell-us-about/",
    },
  },
  {
    day: {
      title: "Blue Agave Pulquería NYC (11 Doyers St.)",
      image: "infocardimg_04.webp",
      description: "Underground restaurant and bar offering creative cocktails and nibbles that blend Mexican flavors with an American twist. Apparently, their vegetarian burritos are really good—too bad I only eat meat.",
      link: "https://blueagavenyc.com/",
    },
    night: {
      title: "Mandarin Tea Garden",
      image: "infocardimg_10.webp",
      description: "Mandarin Tea Garden operated in the early 1900s, apparently quite popular with white Bowery workingmen and uptown slummers. The owners were known for hosting tours around Chinatown for their clientele.",
      link: "https://fortamsterdamnyc.blogspot.com/2014/04/block-party-doyers-street-between-pell.html",
    },
  },
  {
    day: {
      title: "Nom Wah Tea Parlor (13–15 Doyers St.)",
      image: "infocardimg_05.webp",
      description: "A time-honored dim sum restaurant tucked in the heart of Chinatown, Nom Wah Tea Parlor serves a variety of classic, made-to-order dim sum dishes that have delighted its patrons since 1920.",
      link: "https://nomwah.com/chinatown/",
    },
    night: {
      title: "History of Nom Wah Tea Parlor",
      image: "infocardimg_11.webp",
      description: "Nom Wah was originally located at 13–15 Doyers Street, only moving to its current location at 11-13 after a lease loss in 1968. It used to lack a menu, only offering dish names scrawled on the back of a business card as a concession to hungry foreigners.",
      link: "https://www.nytimes.com/2011/04/13/dining/reviews/13under.html",
    },
  },
  {
    day: {
      title: "Toy Apple Beauty & Barber Salon (16 Doyers St.)",
      image: "infocardimg_06.webp",
      description: "A small-time Chinese barbershop with a traditional, nostalgic flair. Known for its expert stylists and nostalgic atmosphere, Toy Apple is a go-to spot for both classic cuts and contemporary hair designs.",
      link: "https://www.yelp.com/biz/toy-apple-beauty-and-barber-salon-new-york",
    },
    night: {
      title: "The Future of Chinatown's Barbershops?",
      image: "infocardimg_12.webp",
      description: "In recent years, Chinatown's barbershops have faced a dwindling customer base consisting of aging regulars and few newcomers. As rents rise and younger folks globalize, they risk fading into obscurity from New York's cultural landscape.",
      link: "https://www.sixthtone.com/news/1011144",
    },
  },
];

// Where the "you are here" figure sits on the minimap, for each of the 6 locations.
const MINIMAP_POSITIONS = [
  { x: 112, y: 220 },
  { x: 114, y: 178 },
  { x: 116, y: 120 },
  { x: 107, y: 90 },
  { x: 134, y: 57 },
  { x: 180, y: 26 },
];

// Which markers appear in each photo, and where.
// MARKERS[time][location - 1][view] is a list of { place, x, y }:
//   place = 1-6 (index into PLACES + 1)
//   x = pixels from the horizontal center, y = pixels from the top
const MARKERS = {
  day: [
    // Location 1
    [
      [{ place: 2, x: -31, y: 405 }], // view 0
      [{ place: 2, x: -701, y: 431 }], // view 1
      [], // view 2
      [], // view 3
      [], // view 4
      [], // view 5
      [], // view 6
      [{ place: 2, x: 608, y: 399 }], // view 7
    ],
    // Location 2
    [
      [{ place: 2, x: 118, y: 448 }, { place: 4, x: -342, y: 439 }, { place: 5, x: -268, y: 419 }], // view 0
      [{ place: 2, x: -494, y: 437 }], // view 1
      [], // view 2
      [], // view 3
      [], // view 4
      [], // view 5
      [], // view 6
      [{ place: 4, x: 373, y: 373 }, { place: 5, x: 459, y: 358 }], // view 7
    ],
    // Location 3
    [
      [{ place: 1, x: -417, y: 415 }, { place: 3, x: -220, y: 379 }, { place: 4, x: -95, y: 357 }, { place: 5, x: 46, y: 367 }], // view 0
      [{ place: 2, x: 428, y: 301 }, { place: 5, x: -581, y: 397 }], // view 1
      [{ place: 2, x: -58, y: 357 }], // view 2
      [{ place: 2, x: -482, y: 342 }], // view 3
      [], // view 4
      [], // view 5
      [], // view 6
      [{ place: 1, x: 62, y: 385 }, { place: 3, x: 244, y: 343 }, { place: 4, x: 384, y: 325 }, { place: 5, x: 582, y: 319 }], // view 7
    ],
    // Location 4
    [
      [{ place: 4, x: -544, y: 323 }, { place: 5, x: 19, y: 336 }], // view 0
      [{ place: 5, x: -680, y: 317 }, { place: 6, x: 139, y: 333 }], // view 1
      [], // view 2
      [{ place: 2, x: 480, y: 377 }], // view 3
      [{ place: 2, x: -333, y: 387 }], // view 4
      [{ place: 1, x: 300, y: 430 }], // view 5
      [{ place: 1, x: -630, y: 452 }], // view 6
      [{ place: 3, x: -738, y: 164 }, { place: 4, x: 142, y: 277 }, { place: 5, x: 540, y: 263 }], // view 7
    ],
    // Location 5
    [
      [{ place: 6, x: 613, y: 213 }], // view 0
      [{ place: 6, x: 229, y: 188 }], // view 1
      [{ place: 6, x: -585, y: 143 }], // view 2
      [], // view 3
      [{ place: 1, x: -300, y: 588 }, { place: 3, x: -150, y: 485 }, { place: 4, x: 76, y: 506 }, { place: 5, x: 176, y: 483 }], // view 4
      [{ place: 5, x: -668, y: 460 }], // view 5
      [], // view 6
      [], // view 7
    ],
    // Location 6
    [
      [], // view 0
      [], // view 1
      [], // view 2
      [], // view 3
      [{ place: 3, x: -64, y: 401 }, { place: 5, x: 70, y: 482 }, { place: 6, x: -128, y: 413 }], // view 4
      [{ place: 5, x: -749, y: 517 }], // view 5
      [], // view 6
      [], // view 7
    ],
  ],
  night: [
    // Location 1
    [
      [{ place: 2, x: 162, y: 478 }], // view 0
      [{ place: 2, x: -522, y: 503 }], // view 1
      [], // view 2
      [], // view 3
      [], // view 4
      [], // view 5
      [], // view 6
      [{ place: 2, x: 626, y: 473 }], // view 7
    ],
    // Location 2
    [
      [{ place: 1, x: -324, y: 444 }, { place: 2, x: 419, y: 441 }, { place: 3, x: -251, y: 442 }, { place: 4, x: -176, y: 426 }, { place: 5, x: -40, y: 403 }], // view 0
      [{ place: 2, x: -426, y: 451 }], // view 1
      [], // view 2
      [], // view 3
      [], // view 4
      [], // view 5
      [], // view 6
      [{ place: 1, x: 460, y: 463 }, { place: 3, x: 537, y: 451 }, { place: 4, x: 638, y: 446 }], // view 7
    ],
    // Location 3
    [
      [{ place: 1, x: -390, y: 463 }, { place: 3, x: -61, y: 397 }, { place: 4, x: 114, y: 399 }, { place: 5, x: 333, y: 371 }], // view 0
      [{ place: 2, x: 245, y: 374 }, { place: 5, x: -590, y: 390 }], // view 1
      [{ place: 2, x: 269, y: 400 }], // view 2
      [{ place: 2, x: -581, y: 433 }], // view 3
      [{ place: 2, x: -630, y: 439 }], // view 4
      [], // view 5
      [{ place: 1, x: 496, y: 517 }], // view 6
      [{ place: 1, x: -198, y: 509 }, { place: 3, x: 90, y: 479 }, { place: 4, x: 289, y: 464 }, { place: 5, x: 527, y: 439 }], // view 7
    ],
    // Location 4
    [
      [{ place: 5, x: -359, y: 364 }], // view 0
      [{ place: 6, x: -201, y: 431 }], // view 1
      [], // view 2
      [{ place: 2, x: -98, y: 503 }], // view 3
      [{ place: 1, x: 493, y: 550 }], // view 4
      [{ place: 1, x: -312, y: 557 }, { place: 3, x: 616, y: 462 }], // view 5
      [{ place: 3, x: -308, y: 462 }, { place: 4, x: 523, y: 419 }], // view 6
      [{ place: 4, x: -202, y: 426 }, { place: 5, x: 398, y: 418 }], // view 7
    ],
    // Location 5
    [
      [], // view 0
      [], // view 1
      [], // view 2
      [{ place: 1, x: 495, y: 528 }, { place: 6, x: 234, y: 413 }], // view 3
      [{ place: 1, x: -364, y: 551 }, { place: 3, x: -174, y: 505 }, { place: 5, x: 72, y: 465 }, { place: 6, x: -596, y: 405 }], // view 4
      [], // view 5
      [], // view 6
      [], // view 7
    ],
    // Location 6
    [
      [], // view 0
      [], // view 1
      [], // view 2
      [], // view 3
      [{ place: 3, x: 142, y: 413 }, { place: 4, x: 202, y: 397 }, { place: 5, x: 264, y: 392 }, { place: 6, x: 59, y: 391 }], // view 4
      [], // view 5
      [], // view 6
      [], // view 7
    ],
  ],
};
