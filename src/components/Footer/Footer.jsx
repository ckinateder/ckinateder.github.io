import { useTheme } from '../../contexts/theme'

const Footer = () => {
  const { theme } = useTheme()
  
  return (
    <footer className={`pt-8 pb-6 text-center text-sm font-bold border-t-4 border-black transition-colors duration-150 ${
      theme === 'dark' ? 'bg-zinc-900 text-zinc-200' : 'bg-zinc-100 text-zinc-800'
    }`}>
      <p>
        © {new Date().getFullYear()} Calvin Kinateder. Built with React & Tailwind.
      </p>
    </footer>
  )
}

export default Footer
