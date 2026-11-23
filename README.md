# Aster

*You set the pace. We'll explain the rest.*

Honest, gently written and evidence-graded answers for trans and gender diverse adults in Australia, and the people beside them: how gender-affirming hormones work and what changes when (an interactive body map and timeline), staying safe on hormones, body and movement, binding and tucking, mind and emotions, daily life, family, rights and documents, surgery options and recovery stage by stage, and pages for family members and for clinicians. **Your bloom** grows a petal for each moment you choose to mark, and can be locked with a passcode. Every key claim carries an evidence grade and a link to its source.

**Open it:** https://fco-cyber.github.io/aster/

General information only, not personal medical advice. Evidence reviewed to 21 November 2026. Version 2 (23 November 2026) changes no content: the passcode box on Your bloom appears only when someone chooses to lock their moments, and **Leave** is now a plain link to the weather site.

## Install it on your device

Once installed, Aster opens like any other app, works without internet, and keeps itself up to date.

- **iPhone or iPad:** open the link in Safari, tap the Share button (the square with an arrow pointing up), then choose **Add to Home Screen**.
- **Android:** open the link in Chrome and tap **Install** when it's offered, or open the ⋮ menu and choose **Install app** (on some phones, **Add to Home screen**).
- **Mac:** in Safari, open the **File** menu and choose **Add to Dock**. In Chrome or Edge, click the install icon at the right-hand end of the address bar.
- **Windows or Chromebook:** in Chrome or Edge, click the install icon at the right-hand end of the address bar, or use the browser menu's install option.

Inside the app, **Colours and display › On this device** shows whether the offline copy is saved, offers **Install** where the browser allows it, and has a **Share this app** button.

## Updates

New versions reach every device by themselves. Whenever Aster is opened with an internet connection, it loads the latest version and saves it for offline use. If it's already open when a new version is published, a small bar offers **Refresh**.

## Publishing a new version

1. Claude prepares the update: the new version's file goes into `versions/`, and `index.html`, `sw.js` and `version.json` are rebuilt from it by `tools/build_site.py`.
2. On GitHub, open the repository, choose **Add file › Upload files**, and drag in the updated files (dragging in everything again is fine too: unchanged files are simply left as they are).
3. Press **Commit changes** (a commit is GitHub's word for saving a change). About a minute later the new version is live.

The file in `versions/` is never altered, so it still works when it's opened straight from a folder on a computer. Only the current version is kept online; earlier versions stay in the app's folder on Marcus's computer.

## What's in this repository

A repository is a project's folder on GitHub, with every past change kept. This one is published as a website with GitHub Pages, GitHub's free website hosting.

| File or folder | What it is |
|---|---|
| `index.html` | The live app: the newest version, with the install and offline features added |
| `sw.js` | The service worker: a small background script that keeps the offline copy and picks up new versions |
| `pwa.js` | The install, share and update features inside the app |
| `manifest.webmanifest` | The app's name, colours, icons and shortcuts, used when it's installed |
| `version.json` | Which version is live |
| `icons/` and `screenshots/` | App icons, install previews, and the picture shown when the link is shared |
| `versions/` | The current version of the app as one self-contained file |
| `tools/` | `build_site.py`, which prepares an update, and the service worker's template |
| `source/` | The files the app is built from (pages, styles, scripts, evidence list and fonts), with `build.py` to rebuild it |
| `DEPLOY.md` | Step-by-step instructions for putting the site online and publishing updates |
| `LICENSE` | The licence: CC BY-NC-SA 4.0 |

## Privacy

No accounts, adverts, analytics or tracking. Your moments, the documents checklist and display settings stay in the browser, on that device; your moments can be locked with a passcode (encrypted on the device), and **Getting help › Your data** lets you download or clear everything. The **Leave** button at the top, or pressing **Esc** three times, swaps the page for a weather forecast. GitHub, which hosts the site, keeps standard server logs, as any website host does.

## Licence

Shared under Creative Commons Attribution-NonCommercial-ShareAlike 4.0 (CC BY-NC-SA 4.0): anyone may share and adapt it with credit, not for commercial use, and under the same licence. See `LICENSE`.
