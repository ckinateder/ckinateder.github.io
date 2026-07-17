import { useEffect, useState } from 'react'
import { ArrowUp } from 'lucide-react'

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const toggleVisibility = () =>
      window.pageYOffset > 500 ? setIsVisible(true) : setIsVisible(false)

    window.addEventListener('scroll', toggleVisibility)
    return () => window.removeEventListener('scroll', toggleVisibility)
  }, [])

  return isVisible ? (
    <div className="fixed bottom-8 right-8 z-50">
      <a
        href="#top"
        className="p-3 bg-accent text-white border border-accent hover:bg-transparent hover:text-accent transition-colors duration-150 flex items-center justify-center"
        aria-label="Scroll to top"
      >
        <ArrowUp size={20} />
      </a>
    </div>
  ) : null
}

export default ScrollToTop
