import type { Register, ThemeSetArgs } from 'claude-code'

import { makeColors } from './make-colors.js'
import { SCENE } from './scene.ts'

// Painterly summer countryside: sky-and-meadow by day, dusk-blue meadow by night.
const { theme, problems } = makeColors({
  label: 'Summer meadow',
  roles: { accent: '#3d7fc1', danger: '#c2453a', success: '#4f8a3c', warning: '#c98a1b', pro: '#7a5fa8' },
  light: {
    gray: {
      anchors: {
        'surface-0': '#e4ede3',
        'surface-1': '#edf3ea',
        'surface-2': '#f7faf2',
        'text-primary': '#1d2b22',
        'text-secondary': '#3c4f43',
        'text-muted': '#53665a',
      },
    },
  },
  dark: {
    gray: {
      anchors: {
        'surface-0': '#121a25',
        'surface-1': '#18222f',
        'surface-2': '#1e2937',
        'surface-3': '#232f3e',
        'text-primary': '#eef1e6',
        'text-secondary': '#c6cdc0',
        'text-muted': '#a4ad9f',
      },
    },
  },
})

// On Windows the Desktop app draws a `scene` backdrop only with Settings > Personalization > Colors >
// Transparency effects on (found 2026-11-16). With it off, use `backdrop: MEADOW_GROUND` from ./vector.ts.
const LOOK: ThemeSetArgs = {
  colors: theme,
  // Thin glass so the scene shows through the panels (the default is blur 16, opacity 0.6).
  backdrop: { scene: 'meadow', glass: { blur: 6, opacity: 0.35 } },
}

export const register: Register = on => {
  on('session.start', async ($, e, next) => {
    const unpainted = problems.find(line => line.startsWith("Desktop won't paint"))

    if (unpainted !== undefined) {
      $.ui.toast(unpainted)
    }
    const set = await $.theme.set(LOOK)

    if (!set.isDrawn) {
      $.ui.status(set.reason)
    }

    return next(e)
  })

  on('ui.render', { component: 'Backdrop' }, ($, e, next) => {
    // Older builds hand the scene name under `id`, newer ones under `scene`.
    const props = e.props as { scene?: unknown; id?: unknown; plugin?: unknown }
    const name = typeof props.scene === 'string' ? props.scene : props.id

    if ((e.surface !== 'desktop' && e.surface !== 'mobile') || name !== 'meadow') {
      return next(e)
    }
    const { Svg } = $.ui.resolve(e)

    return <Svg source={SCENE} alt="A painted summer meadow with drifting clouds, falling cherry petals and swaying grass" isInteractive />
  })
}
