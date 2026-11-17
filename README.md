# Summer Meadow: an anime countryside theme for Claude Code on desktop

A painterly, anime-style summer countryside behind your Claude Code chat in the Claude Desktop app.

- **The scene:** a deep blue night sky with a glowing moon and twinkling stars, drifting clouds, rolling hills, swaying grass, fireflies, and cherry blossom petals falling and tumbling across the whole view.
- **The colors:** matching interface colors for both light and dark mode.

The scene is night-only for now: on Desktop 5.11492.5, a light/dark `@media` rule in a scene stops its animation ([#109766](https://github.com/anthropics/claude-code/issues/109766)), so one scene serves both modes.

All artwork is original and drawn in SVG by the mod; it copies no show, studio or character. Motion stops when your system asks for reduced motion.

## Install

At the prompt of a Claude Code terminal session:

```
/plugin install summer-meadow --marketplace Danez-AI/claude-summer-meadow-theme
```

From a shell:

```
claude plugin install summer-meadow --marketplace Danez-AI/claude-summer-meadow-theme
```

In the Desktop app, where `/plugin` does not run: click **+** next to the prompt box, then **Plugins**, **Add marketplace** with `Danez-AI/claude-summer-meadow-theme`, then **Add plugin**.

Then start a new local session in the Desktop app's Code tab. If the theme doesn't show straight away, send a message.

## Requirements

- Claude Desktop with Claude Code 2.1.323 or later in the Code tab (type `/status` in a Code tab session to check).
- **Windows: turn on Transparency effects** (Settings → Personalization → Colors → Transparency effects). With it off, the Desktop app draws the theme's colors but skips the animated background, with no error. This applies to Anthropic's own `theme-examples` themes too.

## If the scene freezes or doesn't show

These are known Desktop app issues on 5.11492.5, not this mod:

- **Install it, don't load it from a folder.** A mod loaded from a folder (a session's mods folder, `~/.claude/skills/`, or `CLAUDE_CODE_PLUGIN_DIRS`) can animate for a few seconds and then freeze; the same mod installed with the lines above keeps animating ([#109766](https://github.com/anthropics/claude-code/issues/109766)). Don't keep a folder copy loaded alongside the installed one.
- **New session, `/clear`, or a reopened archived session:** no theme shows until you send a message.
- **No theme in any session after an app restart:** restart the app again ([#109853](https://github.com/anthropics/claude-code/issues/109853)).
- **Another theme mod:** a session shows one theme at a time, so a theme from another mod (such as `/custom-theme` from `theme-examples`) replaces this one there.

## If you can't turn on transparency

`hooks/vector.ts` holds a still version of the night meadow that the app draws even with transparency off. In `hooks/register.tsx`, import `MEADOW_GROUND` from `./vector.ts` and set `backdrop: MEADOW_GROUND` in place of the `scene` line.

## Files

| File | What it does |
|---|---|
| `hooks/register.tsx` | Sets the colors and the backdrop when a session starts, and draws the scene |
| `hooks/scene.ts` | The animated meadow, as an SVG with CSS animation |
| `hooks/vector.ts` | The still vector fallback |
| `hooks/make-colors.js`, `hooks/make-colors.d.ts` | Anthropic's helper that turns a few colors into a full Desktop palette (see License) |

## License

MIT, except `hooks/make-colors.js` and `hooks/make-colors.d.ts`, which are Anthropic's, copied unchanged from the plugin-authoring skill that ships with Claude Code. See [LICENSE](LICENSE).
