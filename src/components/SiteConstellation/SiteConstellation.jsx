import { useEffect, useRef } from 'react'

const NODE_COUNT = 50
const SIGNAL_COUNT = 5
const LINK_DIST = 0.22
const MAX_PULL = 30
const PULL_RADIUS = 160
const BASE_OPACITY = 0.28
const HERO_OPACITY = 0.55
const VIEW_INSET = 8
const MAX_AVOID_RECTS = 40
const FIELD_RADIUS = 90
const FIELD_FORCE = 2200
const INSIDE_MULT = 2.4
const SPRING = 18
const DAMPING = 0.86
const FIELD_DAMPING = 0.72
const MAX_SPEED = 420
const MERGE_GAP = 28
const AVOID_SELECTOR = 'h1, h2, h3, h4, p, a, li, .signal-tag, .signal-btn, .signal-outline'

const seedNodes = () => {
  const nodes = []
  for (let i = 0; i < NODE_COUNT; i += 1) {
    nodes.push({
      x: 0.04 + Math.random() * 0.92,
      y: 0.04 + Math.random() * 0.92,
      phase: Math.random() * Math.PI * 2,
      speed: 0.35 + Math.random() * 0.55,
      amp: 3 + Math.random() * 5,
      signal: i < SIGNAL_COUNT,
      px: null,
      py: null,
      vx: 0,
      vy: 0,
    })
  }
  return nodes
}

const readCssColor = (name, fallback) => {
  const value = getComputedStyle(document.documentElement)
    .getPropertyValue(name)
    .trim()
  return value || fallback
}

const hexToRgba = (hex, alpha) => {
  const raw = hex.replace('#', '')
  const full =
    raw.length === 3
      ? raw
          .split('')
          .map((c) => c + c)
          .join('')
      : raw
  const n = parseInt(full, 16)
  const r = (n >> 16) & 255
  const g = (n >> 8) & 255
  const b = n & 255
  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}

const heroBoost = () => {
  const about = document.getElementById('about')
  if (!about) return 0

  const rect = about.getBoundingClientRect()
  const vh = window.innerHeight || 1
  const visible = Math.min(rect.bottom, vh) - Math.max(rect.top, 0)
  const coverage = Math.max(0, Math.min(1, visible / Math.min(rect.height, vh)))

  const centerY = vh / 2
  const aboutCenter = rect.top + rect.height / 2
  const dist = Math.abs(centerY - aboutCenter) / vh
  const proximity = Math.max(0, 1 - dist * 1.4)

  return Math.max(coverage, proximity * 0.85)
}

const getRepelPad = () => (window.innerWidth >= 768 ? 20 : 12)

const rectsNearOrOverlap = (a, b, gap) =>
  a.left <= b.right + gap &&
  a.right >= b.left - gap &&
  a.top <= b.bottom + gap &&
  a.bottom >= b.top - gap

const mergeAvoidRects = (rects) => {
  if (rects.length < 2) return rects

  const list = rects.map((r) => ({ ...r }))
  let merged = true
  while (merged) {
    merged = false
    for (let i = 0; i < list.length; i += 1) {
      for (let j = i + 1; j < list.length; j += 1) {
        if (!rectsNearOrOverlap(list[i], list[j], MERGE_GAP)) continue
        const a = list[i]
        const b = list[j]
        list[i] = {
          left: Math.min(a.left, b.left),
          top: Math.min(a.top, b.top),
          right: Math.max(a.right, b.right),
          bottom: Math.max(a.bottom, b.bottom),
          cx: 0,
          cy: 0,
        }
        list[i].cx = (list[i].left + list[i].right) / 2
        list[i].cy = (list[i].top + list[i].bottom) / 2
        list.splice(j, 1)
        merged = true
        break
      }
      if (merged) break
    }
  }
  return list
}

const collectAvoidRects = () => {
  const main = document.getElementById('site-main')
  if (!main) return []

  const pad = getRepelPad()
  const nodes = main.querySelectorAll(AVOID_SELECTOR)
  const rects = []
  const vh = window.innerHeight
  const vw = window.innerWidth

  for (let i = 0; i < nodes.length && rects.length < MAX_AVOID_RECTS; i += 1) {
    const r = nodes[i].getBoundingClientRect()
    if (r.width < 4 || r.height < 4) continue
    if (r.bottom < -FIELD_RADIUS || r.top > vh + FIELD_RADIUS) continue
    if (r.right < -FIELD_RADIUS || r.left > vw + FIELD_RADIUS) continue
    rects.push({
      left: r.left - pad,
      top: r.top - pad,
      right: r.right + pad,
      bottom: r.bottom + pad,
      cx: (r.left + r.right) / 2,
      cy: (r.top + r.bottom) / 2,
    })
  }

  return mergeAvoidRects(rects)
}

const signedDistAndNormal = (x, y, r) => {
  const inside =
    x >= r.left && x <= r.right && y >= r.top && y <= r.bottom

  if (inside) {
    const dl = x - r.left
    const dr = r.right - x
    const dt = y - r.top
    const db = r.bottom - y
    const min = Math.min(dl, dr, dt, db)
    if (min === dl) return { dist: -dl, nx: -1, ny: 0 }
    if (min === dr) return { dist: -dr, nx: 1, ny: 0 }
    if (min === dt) return { dist: -dt, nx: 0, ny: -1 }
    return { dist: -db, nx: 0, ny: 1 }
  }

  const cx = Math.min(Math.max(x, r.left), r.right)
  const cy = Math.min(Math.max(y, r.top), r.bottom)
  const dx = x - cx
  const dy = y - cy
  const dist = Math.hypot(dx, dy) || 0.0001
  return { dist, nx: dx / dist, ny: dy / dist }
}

const fieldForce = (x, y, rects) => {
  let bestStrength = 0
  let fx = 0
  let fy = 0

  // Winner-takes-most: avoid summing opposing normals between nearby boxes
  for (let i = 0; i < rects.length; i += 1) {
    const r = rects[i]
    const { dist, nx, ny } = signedDistAndNormal(x, y, r)
    if (dist > FIELD_RADIUS) continue

    let strength
    if (dist < 0) {
      strength = FIELD_FORCE * INSIDE_MULT * (1 + Math.min(40, -dist) / 40)
    } else {
      const t = 1 - dist / FIELD_RADIUS
      strength = FIELD_FORCE * t * t
    }

    if (strength > bestStrength) {
      bestStrength = strength
      fx = nx * strength
      fy = ny * strength
    }
  }

  return { fx, fy, strength: bestStrength }
}

const overlapFade = (x, y, rects) => {
  let fade = 1
  for (let i = 0; i < rects.length; i += 1) {
    const r = rects[i]
    const { dist } = signedDistAndNormal(x, y, r)
    if (dist >= 0) continue
    const depth = Math.min(1, -dist / 24)
    fade = Math.min(fade, 1 - depth * 0.85)
  }
  return fade
}

const SiteConstellation = () => {
  const canvasRef = useRef(null)
  const nodesRef = useRef(seedNodes())
  const pointerRef = useRef(null)
  const boostRef = useRef(0)
  const avoidRef = useRef([])
  const reducedRef = useRef(false)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return undefined

    const ctx = canvas.getContext('2d')
    if (!ctx) return undefined

    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    reducedRef.current = mq.matches
    const onMq = () => {
      reducedRef.current = mq.matches
    }
    mq.addEventListener('change', onMq)

    let rafId = 0
    let width = 0
    let height = 0
    let dpr = 1
    let lastTime = 0

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = Math.floor(width * dpr)
      canvas.height = Math.floor(height * dpr)
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      nodesRef.current.forEach((node) => {
        node.px = null
        node.py = null
        node.vx = 0
        node.vy = 0
      })
    }

    const refreshAvoid = () => {
      avoidRef.current = collectAvoidRects()
      boostRef.current = heroBoost()
    }

    const onPointerMove = (e) => {
      if (reducedRef.current) return
      pointerRef.current = { x: e.clientX, y: e.clientY }
    }

    const onPointerLeave = () => {
      pointerRef.current = null
    }

    const drawFrame = (time) => {
      const ink = readCssColor('--color-ink', '#141414')
      const line = readCssColor('--color-line', '#A1A1AA')
      const accent = readCssColor('--color-accent', '#F97316')
      const reduced = reducedRef.current
      const t = reduced ? 0 : time * 0.001
      const boost = reduced ? 0 : boostRef.current
      const opacity = BASE_OPACITY + (HERO_OPACITY - BASE_OPACITY) * boost
      const rects = avoidRef.current

      const dt = lastTime ? Math.min(0.033, (time - lastTime) / 1000) : 0.016
      lastTime = time

      ctx.clearRect(0, 0, width, height)
      ctx.save()
      ctx.globalAlpha = opacity

      const positions = nodesRef.current.map((node) => {
        let homeX = node.x * width
        let homeY = node.y * height

        if (!reduced) {
          homeX += Math.sin(t * node.speed + node.phase) * node.amp
          homeY += Math.cos(t * node.speed * 0.85 + node.phase) * node.amp
        }

        const pointer = pointerRef.current
        if (pointer && !reduced) {
          const dx = pointer.x - homeX
          const dy = pointer.y - homeY
          const dist = Math.hypot(dx, dy) || 1
          if (dist < PULL_RADIUS) {
            const force = (1 - dist / PULL_RADIUS) * MAX_PULL
            homeX += (dx / dist) * force
            homeY += (dy / dist) * force
          }
        }

        if (node.px == null || node.py == null) {
          node.px = homeX
          node.py = homeY
        }

        if (reduced) {
          const { fx, fy } = fieldForce(homeX, homeY, rects)
          let x = homeX + fx * 0.0004
          let y = homeY + fy * 0.0004
          x = Math.min(width - VIEW_INSET, Math.max(VIEW_INSET, x))
          y = Math.min(height - VIEW_INSET, Math.max(VIEW_INSET, y))
          node.px = x
          node.py = y
          node.vx = 0
          node.vy = 0
        } else {
          const { fx, fy, strength } = fieldForce(node.px, node.py, rects)
          const fieldMix = Math.min(1, strength / (FIELD_FORCE * 0.85))
          const spring = SPRING * (1 - fieldMix * 0.85)
          const damp = DAMPING - (DAMPING - FIELD_DAMPING) * fieldMix

          node.vx += fx * dt
          node.vy += fy * dt
          node.vx += (homeX - node.px) * spring * dt
          node.vy += (homeY - node.py) * spring * dt
          node.vx *= damp
          node.vy *= damp

          // Kill micro-oscillation once nearly settled in a field
          if (fieldMix > 0.35 && Math.hypot(node.vx, node.vy) < 18) {
            node.vx = 0
            node.vy = 0
          }

          const speed = Math.hypot(node.vx, node.vy)
          if (speed > MAX_SPEED) {
            node.vx = (node.vx / speed) * MAX_SPEED
            node.vy = (node.vy / speed) * MAX_SPEED
          }

          node.px += node.vx * dt
          node.py += node.vy * dt
          node.px = Math.min(width - VIEW_INSET, Math.max(VIEW_INSET, node.px))
          node.py = Math.min(height - VIEW_INSET, Math.max(VIEW_INSET, node.py))
        }

        const fade = overlapFade(node.px, node.py, rects)
        return {
          x: node.px,
          y: node.py,
          signal: node.signal,
          phase: node.phase,
          fade,
        }
      })

      ctx.lineWidth = 1
      for (let i = 0; i < positions.length; i += 1) {
        for (let j = i + 1; j < positions.length; j += 1) {
          const a = positions[i]
          const b = positions[j]
          const fade = Math.min(a.fade, b.fade)
          if (fade < 0.08) continue

          const nx = (a.x - b.x) / width
          const ny = (a.y - b.y) / height
          const dist = Math.hypot(nx, ny)
          if (dist < LINK_DIST) {
            const alpha = (0.12 + (1 - dist / LINK_DIST) * 0.3) * fade
            ctx.strokeStyle = hexToRgba(line, alpha)
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.stroke()
          }
        }
      }

      positions.forEach((pos) => {
        if (pos.fade < 0.08) return

        let radius = pos.signal ? 3.2 : 2
        const fill = pos.signal ? accent : ink

        if (pos.signal && !reduced) {
          const pulse = 0.5 + 0.5 * Math.sin(t * 2.2 + pos.phase)
          radius = 2.8 + pulse * 1.8
          ctx.beginPath()
          ctx.fillStyle = hexToRgba(accent, (0.1 + pulse * 0.15) * pos.fade)
          ctx.arc(pos.x, pos.y, radius + 5, 0, Math.PI * 2)
          ctx.fill()
        }

        ctx.beginPath()
        ctx.globalAlpha = opacity * pos.fade
        ctx.fillStyle = fill
        ctx.arc(pos.x, pos.y, radius, 0, Math.PI * 2)
        ctx.fill()
        ctx.globalAlpha = opacity
      })

      ctx.restore()
    }

    const loop = (time) => {
      refreshAvoid()
      drawFrame(time)
      if (!reducedRef.current) {
        rafId = requestAnimationFrame(loop)
      }
    }

    const onResize = () => {
      resize()
      refreshAvoid()
      if (reducedRef.current) {
        drawFrame(performance.now())
      }
    }

    const onScroll = () => {
      refreshAvoid()
      if (reducedRef.current) {
        drawFrame(performance.now())
      }
    }

    resize()
    refreshAvoid()
    window.addEventListener('resize', onResize)
    window.addEventListener('pointermove', onPointerMove)
    window.addEventListener('pointerleave', onPointerLeave)
    window.addEventListener('scroll', onScroll, { passive: true })

    if (reducedRef.current) {
      drawFrame(performance.now())
    } else {
      rafId = requestAnimationFrame(loop)
    }

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('resize', onResize)
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('pointerleave', onPointerLeave)
      window.removeEventListener('scroll', onScroll)
      mq.removeEventListener('change', onMq)
    }
  }, [])

  return (
    <div
      className="fixed inset-0 z-0 pointer-events-none"
      aria-hidden="true"
    >
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
    </div>
  )
}

export default SiteConstellation
