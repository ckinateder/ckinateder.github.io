import { useEffect, useRef } from 'react'

const Gist = ({ src }) => {
  const gistRef = useRef(null)

  useEffect(() => {
    if (!src || !gistRef.current) return

    // Check if script is already loaded
    const existingScript = document.querySelector(`script[src="${src}"]`)
    if (existingScript && existingScript.getAttribute('data-loaded')) {
      return
    }

    // Create and load the Gist script
    const script = document.createElement('script')
    script.src = src
    script.setAttribute('data-loaded', 'true')
    document.body.appendChild(script)

    return () => {
      // Cleanup if needed
    }
  }, [src])

  return <div ref={gistRef} />
}

export default Gist
