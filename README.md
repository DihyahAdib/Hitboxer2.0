# Hitboxer 2.0 — Sprite Sheet hitbox creation tool.

Hitboxer is a desktop tool built with Electron, SvelteKit, and TypeScript designed for artists, developers, and modders who need a fast, clean way to create hitboxes, edit them with an abundance of stats & data, and export results as a JSON file ready to be parsed by a game engine.

It supports independent scrolling panels, color-coded metadata, dynamic UI scaling, a buttload of settings, and a focused layout for productivity.

Hitboxer was built out of the frustration a lot of fellow game developers run into when making 2D games and dealing with 2D art animations, be they drawn HD or pixel art, and that's the creation, managing, and usage of hitboxes.

In my case I—like others—was exporting JSON Aseprite spritesheet data and using their "slice" tool as a bootleg hitbox outline so that it could be parsed by our game engines. but it was an absolute positioning from the origin for the dimensions of the hitbox and not relative to ITS specific frame; this pretty much ruined the entire experience for me, and Aseprite seems to have forgotten about the community's requests.

I looked around and found others who created something similar to what I'm making now, but most of their projects are out-of-date builds, and I wanted to create an updated version for the people.

So with that, I truly hope you enjoy Hitboxer!

## What it does

- Load any sprite sheet image and scale it up for precise editing
- Place hitboxes visually on top of your sprite sheet and drag them into position
- Define your sprite sheet's column and row layout to automatically calculate individual cell dimensions
- All hitbox coordinates are calculated per cell — not globally across the entire sheet — so your game engine receives accurate per-frame collision data
- Export hitbox data to a structured JSON file ready to be parsed by your game

## Features

- 🎨 Canvas editor with zoom/scale support up to 50x for pixel-precise placement
- 📐 Ruler overlay with horizontal and vertical crosshair helper lines
- 🔲 Grid overlay scoped to the image bounds with configurable X/Y cell sizes, snap-to-grid, and linked/independent axis control
- 📏 Cell dimension indicators showing source width and height per frame
- 🟦 Multiple hitboxes per sheet with individual drag, resize, and property editing
- 📊 Hitbox Info panel showing per-frame X, Y, W, H values in source pixel coordinates
- 🖼️ Sprite outline toggle tracing the exact image boundary at any scale
- ↔️ Flip X / Flip Y for previewing mirrored sprite states
- 💾 Auto-save settings — grid size, ruler config, scale, and layout preferences persist between sessions via electron-store
- 📤 JSON export in a structured format compatible with custom game engines

# JSON output format

```
{
  "meta": {
    "size": { "w": 88, "h": 30 },
    "cell_width": 22,
    "cell_height": 30,
    "columns": 4,
    "rows": 1,
    "total_frames": 4
  },
  "frames": [
    [ { "name": "Hitbox 1", "x": 7, "y": 5, "w": 8, "h": 25 } ],
    [ { "name": "Hitbox 2", "x": 7, "y": 5, "w": 8, "h": 25 } ],
    [ { "name": "Hitbox 3", "x": 7, "y": 5, "w": 8, "h": 25 } ],
    [ { "name": "Hitbox 4", "x": 7, "y": 5, "w": 8, "h": 25 } ]
  ]
}
```

## Installation

Download `Hitboxer Setup 3.0.0.exe`, run the installer, and launch Hitboxer from your desktop or start menu. No additional dependencies required.

## Platform

- ✅ Windows x64
- 🔜 Mac and Linux builds coming in a future release

### Built with

Electron + SvelteKit + TypeScript
