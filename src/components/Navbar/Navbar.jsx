import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Menu, X, Sun, Moon } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from '../../contexts/theme'
import { publications } from '../../portfolio'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { theme, toggleTheme } = useTheme()

  const navLinks = [
    { name: 'Experience', href: '/#experience' },
    { name: 'Projects', href: '/#projects' },
    ...(publications.length
      ? [{ name: 'Publications', href: '/#publications' }]
      : []),
    { name: 'Skills', href: '/#skills' },
    { name: 'Contact', href: '/#contact' },
    { name: 'Blog', href: '/blog' },
  ]

  return (
    <nav className="fixed top-0 left-0 w-full z-50 border-b border-line bg-canvas/95 backdrop-blur-sm transition-colors duration-150">
      <div className="max-w-6xl mx-auto px-5 md:px-8 py-4 flex justify-between items-center">
        <Link to="/" className="font-display text-2xl font-bold text-accent tracking-tight">
          CK.
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="font-mono text-xs uppercase tracking-wider text-ink hover:text-accent transition-colors duration-150"
            >
              {link.name}
            </a>
          ))}
          <button
            onClick={toggleTheme}
            className="p-2 border border-line text-ink hover:border-accent hover:text-accent transition-colors duration-150"
            aria-label="toggle theme"
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>

        <div className="md:hidden flex items-center gap-3">
          <button
            onClick={toggleTheme}
            className="p-2 border border-line text-ink hover:border-accent hover:text-accent transition-colors duration-150"
            aria-label="toggle theme"
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button
            className="text-ink"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.15 }}
            className="md:hidden absolute top-full left-0 w-full border-b border-line bg-canvas p-6 flex flex-col gap-4"
          >
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="font-mono text-sm uppercase tracking-wider text-ink hover:text-accent transition-colors duration-150"
              >
                {link.name}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}

export default Navbar
