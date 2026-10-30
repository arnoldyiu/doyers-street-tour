# Doyers Street Tour

A virtual walk down Doyers Street in New York's Chinatown. Move between six spots along the street, look around in every direction, and switch between day and night to see the street's present and its history. Markers in each view open a card about the place in front of you: today's bars, restaurants and shops by day, and stories from the street's past by night.

Built in 2024 as my final project for a university Topics course, and cleaned up in 2026.

![Daytime view of Doyers Street with the minimap, a place marker and navigation buttons](docs/screenshot.webp)

## Controls

| Action | Mouse | Keyboard |
| --- | --- | --- |
| Look left / right | Arrow buttons on the sides | ← → or A / D |
| Walk forward / back | Buttons at the bottom (when facing along the street) | ↑ ↓ or W / S |
| Switch day / night | Clock in the top right | – |
| Learn about a place | Click a marker | Tab to it, then Enter |
| Close a card | Close | Escape |

## Running it

It's plain HTML, CSS and JavaScript with no build step. Open `index.html` in a browser, or serve the folder:

```sh
python3 -m http.server
```

Then visit http://localhost:8000.

## Project structure

| File | What it does |
| --- | --- |
| `index.html` | Page markup: the stage, buttons, minimap and info card |
| `style.css` | Layout and styling. Everything sits on a 1512×851 stage that scales to fit the window |
| `script.js` | Movement, rendering, sounds, info cards and keyboard controls |
| `tour-data.js` | All the content: places, links, marker positions and minimap positions |
| `assets/` | Street photos (`bg{A\|P}Location0{1-6}View0{0-7}.webp`, A = day, P = night), UI images and sounds |

### Editing the tour

Text, links and marker positions all live in `tour-data.js`, so changing them doesn't involve touching the code.

To place a marker, set `DEV_MODE = true` at the top of `script.js`, open the view, and click where the marker should go. The console logs `{ x, y }` ready to paste into `MARKERS`.

## License

[MIT](LICENSE.txt). Originally prototyped [on CodePen](https://codepen.io/yiua963/pen/xxeybBP).
