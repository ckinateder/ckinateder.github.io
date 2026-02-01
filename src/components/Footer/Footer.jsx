import { useTheme } from '../../contexts/theme'

const Footer = () => {
  const { theme } = useTheme()
  
  return (
    <footer className={`pt-8 pb-6 text-center text-sm font-bold border-t-4 border-black transition-colors duration-150 ${
      theme === 'dark' ? 'bg-slate-900 text-slate-200' : 'bg-slate-100 text-slate-800'
    }`}>
      <p>
        © {new Date().getFullYear()} Calvin Kinateder. Built with React & Tailwind.
      </p>
    </footer>
  )
}

export default Footer
