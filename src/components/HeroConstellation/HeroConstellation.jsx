import { useEffect, useRef } from 'react'

const NODE_COUNT = 22
const SIGNAL_COUNT = 4
const LINK_DIST = 0.28
const MAX_PULL = 16
const PULL_RADIUS = 140

const seedNodes = () => {
  const nodes = []
  for (let i = 0; i < NODE_COUNT; i += 1) {
    nodes.push({
      x: 0.12 + Math.random() * 0.76,
      y: 0.12 + Math.random() * 0.76,
      phase: Math.random() * Math.PI * 2,
      speed: 0.4 + Math.random() * 0.6,
      amp: 4 + Math.random() * 6,
      signal: i < SIGNAL_COUNT,
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

const HeroConstellation = ({ sectionRef }) => {
  const wrapRef = useRef(null)
  const canvasRef = useRef(null)
  const nodesRef = useRef(seedNodes())
  const pointerRef = useRef(null)
  const scrollRef = useRef(0)
  const reducedRef = useRef(false)

  useEffect(() => {
    const wrap = wrapRef.current
    const canvas = canvasRef.current
    if (!wrap || !canvas) return undefined

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

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      width = wrap.clientWidth
      height = wrap.clientHeight
      canvas.width = Math.floor(width * dpr)
      canvas.height = Math.floor(height * dpr)
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const updateScroll = () => {
      const section = sectionRef?.current
      if (!section) {
        scrollRef.current = 0
        return
      }
      const rect = section.getBoundingClientRect()
      const visible = Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0)
      const ratio = 1 - Math.max(0, Math.min(1, visible / Math.max(rect.height, 1)))
      scrollRef.current = ratio
    }

    const onPointerMove = (e) => {
      if (reducedRef.current) return
      const rect = wrap.getBoundingClientRect()
      pointerRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      }
    }

    const onPointerLeave = () => {
      pointerRef.current = null
    }

    const drawFrame = (time) => {
      const ink = readCssColor('--color-ink', '#141414')
      const line = readCssColor('--color-line', '#A1A1AA')
      const accent = readCssColor('--color-accent', '#F97316')
      const reduced = reducedRef.current
      const scroll = reduced ? 0 : scrollRef.current
      const t = reduced ? 0 : time * 0.001

      const opacity = 1 - scroll * 0.65
      const scale = 1 - scroll * 0.08
      const rotate = scroll * (Math.PI / 30)

      ctx.clearRect(0, 0, width, height)
      ctx.save()
      ctx.globalAlpha = opacity
      ctx.translate(width / 2, height / 2)
      ctx.rotate(rotate)
      ctx.scale(scale, scale)
      ctx.translate(-width / 2, -height / 2)

      const positions = nodesRef.current.map((node) => {
        let x = node.x * width
        let y = node.y * height

        if (!reduced) {
          x += Math.sin(t * node.speed + node.phase) * node.amp
          y += Math.cos(t * node.speed * 0.85 + node.phase) * node.amp
        }

        const pointer = pointerRef.current
        if (pointer && !reduced) {
          const dx = pointer.x - x
          const dy = pointer.y - y
          const dist = Math.hypot(dx, dy) || 1
          if (dist < PULL_RADIUS) {
            const force = (1 - dist / PULL_RADIUS) * MAX_PULL
            x += (dx / dist) * force
            y += (dy / dist) * force
          }
        }

        return { x, y, signal: node.signal, phase: node.phase }
      })

      ctx.lineWidth = 1
      for (let i = 0; i < positions.length; i += 1) {
        for (let j = i + 1; j < positions.length; j += 1) {
          const a = positions[i]
          const b = positions[j]
          const nx = (a.x - b.x) / width
          const ny = (a.y - b.y) / height
          const dist = Math.hypot(nx, ny)
          if (dist < LINK_DIST) {
            const alpha = 0.15 + (1 - dist / LINK_DIST) * 0.35
            ctx.strokeStyle = hexToRgba(line, alpha)
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.stroke()
          }
        }
      }

      positions.forEach((pos) => {
        let radius = pos.signal ? 3.5 : 2.2
        let fill = pos.signal ? accent : ink

        if (pos.signal && !reduced) {
          const pulse = 0.5 + 0.5 * Math.sin(t * 2.2 + pos.phase)
          radius = 3 + pulse * 2
          ctx.beginPath()
          ctx.fillStyle = hexToRgba(accent, 0.12 + pulse * 0.18)
          ctx.arc(pos.x, pos.y, radius + 6, 0, Math.PI * 2)
          ctx.fill()
        }

        ctx.beginPath()
        ctx.fillStyle = fill
        ctx.arc(pos.x, pos.y, radius, 0, Math.PI * 2)
        ctx.fill()
      })

      ctx.restore()
    }

    const loop = (time) => {
      updateScroll()
      drawFrame(time)
      if (!reducedRef.current) {
        rafId = requestAnimationFrame(loop)
      }
    }

    const ro = new ResizeObserver(() => {
      resize()
      if (reducedRef.current) {
        drawFrame(0)
      }
    })

    resize()
    ro.observe(wrap)
    wrap.addEventListener('pointermove', onPointerMove)
    wrap.addEventListener('pointerleave', onPointerLeave)
    window.addEventListener('scroll', updateScroll, { passive: true })
    updateScroll()

    if (reducedRef.current) {
      drawFrame(0)
    } else {
      rafId = requestAnimationFrame(loop)
    }

    return () => {
      cancelAnimationFrame(rafId)
      ro.disconnect()
      wrap.removeEventListener('pointermove', onPointerMove)
      wrap.removeEventListener('pointerleave', onPointerLeave)
      window.removeEventListener('scroll', updateScroll)
      mq.removeEventListener('change', onMq)
    }
  }, [sectionRef])

  return (
    <div
      ref={wrapRef}
      className="relative w-full h-[200px] md:h-full md:min-h-[420px] opacity-70 md:opacity-100"
      aria-hidden="true"
    >
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
    </div>
  )
}

export default HeroConstellation
