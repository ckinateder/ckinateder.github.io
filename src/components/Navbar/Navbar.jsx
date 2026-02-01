import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, Sun, Moon } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from '../../contexts/theme'
import { experience, projects, skills, thesis, contact } from '../../portfolio'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const { theme, toggleTheme } = useTheme()
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { name: 'Experience', href: '/#experience' },
    { name: 'Projects', href: '/#projects' },
    { name: 'Thesis', href: '/#thesis' },
    { name: 'Skills', href: '/#skills' },
    { name: 'Contact', href: '/#contact' },
    { name: 'Blog', href: '/blog' },
  ]

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 border-b-4 border-black transition-colors duration-150 ${
        theme === 'dark' ? 'bg-slate-900' : 'bg-slate-100'
      }`}
    >
      <div className='container mx-auto px-6 py-4 flex justify-between items-center'>
        <Link to='/' className='text-2xl font-black text-orange-500'>
          CK.
        </Link>

        {/* Desktop Menu */}
        <div className='hidden md:flex items-center space-x-8'>
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className={`font-bold text-sm transition-colors duration-150 ${
                theme === 'dark' ? 'text-slate-100 hover:text-orange-500' : 'text-slate-900 hover:text-orange-500'
              }`}
            >
              {link.name}
            </a>
          ))}
          <button
            onClick={toggleTheme}
            className={`p-2 border-2 border-black transition-colors duration-150 ${
              theme === 'dark' 
                ? 'bg-slate-800 text-slate-100 hover:bg-slate-700' 
                : 'bg-white text-slate-900 hover:bg-slate-200'
            }`}
            aria-label='toggle theme'
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>

        {/* Mobile Toggle */}
        <div className='md:hidden flex items-center gap-4'>
          <button
            onClick={toggleTheme}
            className={`p-2 border-2 border-black transition-colors duration-150 ${
              theme === 'dark' 
                ? 'bg-slate-800 text-slate-100 hover:bg-slate-700' 
                : 'bg-white text-slate-900 hover:bg-slate-200'
            }`}
            aria-label='toggle theme'
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button
            className={theme === 'dark' ? 'text-slate-100' : 'text-slate-900'}
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.15 }}
            className={`md:hidden absolute top-full left-0 w-full border-b-4 border-black p-6 flex flex-col space-y-4 ${
              theme === 'dark' ? 'bg-slate-900' : 'bg-slate-100'
            }`}
          >
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`text-lg font-bold transition-colors duration-150 ${
                  theme === 'dark' ? 'text-slate-100 hover:text-orange-500' : 'text-slate-900 hover:text-orange-500'
                }`}
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
