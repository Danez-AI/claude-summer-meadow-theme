// The night meadow as a still vector ground (the app draws it itself; no Backdrop hook).
// Limits from the types: viewBox sides 1-256, at most 64 paths, each `d` <= 16,384 chars,
// filled even-odd, so shapes that overlap go in separate paths.
import type { ThemeSetArgs } from 'claude-code'

const W = 256
const H = 160

let seed = 7
const rnd = () => (seed = (seed * 9301 + 49297) % 233280) / 233280
const f = (n: number) => Number(n.toFixed(1))

const circle = (cx: number, cy: number, r: number) =>
  `M${f(cx - r)} ${f(cy)}a${f(r)} ${f(r)} 0 1 0 ${f(2 * r)} 0a${f(r)} ${f(r)} 0 1 0 ${f(-2 * r)} 0Z`
const ellipse = (cx: number, cy: number, rx: number, ry: number) =>
  `M${f(cx - rx)} ${f(cy)}a${f(rx)} ${f(ry)} 0 1 0 ${f(2 * rx)} 0a${f(rx)} ${f(ry)} 0 1 0 ${f(-2 * rx)} 0Z`
const many = (n: number, at: () => string) => Array.from({ length: n }, at).join('')

type Hex = `#${string}`
type Path = { d: string; color: Hex; strokeWidth?: number }

const cloud = (x: number, y: number, s: number, color: Hex): Path[] => [
  { d: ellipse(x, y, 16 * s, 6 * s), color },
  { d: ellipse(x - 2 * s, y - 5 * s, 9 * s, 6.5 * s), color },
  { d: ellipse(x + 7 * s, y - 3 * s, 7 * s, 5 * s), color },
]

const paths: Path[] = [
  { d: `M0 0H${W}V${H}H0Z`, color: '#18264a' }, // sky
  { d: `M0 70H${W}V${H}H0Z`, color: '#1f3460' }, // lower sky, lighter toward the horizon
  // moon and its halo, largest first
  { d: circle(214, 24, 26), color: '#22355f' },
  { d: circle(214, 24, 18), color: '#2f4470' },
  { d: circle(214, 24, 12), color: '#4c5f86' },
  { d: circle(214, 24, 7.5), color: '#f6f2d8' },
  { d: circle(211, 22, 1.2) + circle(216.5, 27, 0.9), color: '#e3ddbd' },
  // stars
  { d: many(55, () => circle(rnd() * W, rnd() * 66, 0.25 + rnd() * 0.35)), color: '#fdfbe8' },
  // clouds
  ...cloud(96, 30, 1.1, '#5d6f96'),
  ...cloud(150, 52, 1.5, '#57698f'),
  ...cloud(145, 18, 0.8, '#62749b'),
  // hills, back to front
  { d: `M0 102C35 90 67 94 102 99S173 90 208 93S246 99 ${W} 98V${H}H0Z`, color: '#2c3f4f' },
  { d: `M0 115C42 106 83 112 122 117S198 110 ${W} 112V${H}H0Z`, color: '#22353f' },
  // tree on the far right hill
  { d: `M225 100h2.4v12h-2.4Z`, color: '#1f1914' },
  { d: circle(226, 98, 7.5), color: '#16291f' },
  { d: circle(221, 101.5, 5), color: '#16291f' },
  { d: circle(231, 101.5, 5.3), color: '#16291f' },
  { d: `M0 131C48 123 102 128 150 133S227 128 ${W} 128V${H}H0Z`, color: '#1a2b31' },
  { d: `M0 146C61 139 131 144 ${W} 141V${H}H0Z`, color: '#132226' },
  // grass blades, stroked
  {
    d: many(80, () => {
      const x = rnd() * W
      const h = 6 + rnd() * 10
      const lean = rnd() * 3 - 1.5
      return `M${f(x)} ${H}Q${f(x + lean)} ${f(H - h / 2)} ${f(x + lean * 2)} ${f(H - h)}`
    }),
    strokeWidth: 1,
    color: '#24452f',
  },
  // fireflies over the meadow
  { d: many(26, () => circle(rnd() * W, 104 + rnd() * 52, 0.55)), color: '#e9ff8a' },
  // cherry petals drifting across the whole view
  { d: many(34, () => ellipse(rnd() * W, rnd() * H, 1.3, 0.7)), color: '#d9a7c0' },
]

export const MEADOW_GROUND: NonNullable<ThemeSetArgs['backdrop']> = {
  vector: { viewBox: [W, H], paths },
}
