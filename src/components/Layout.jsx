import Navbar from './Navbar/Navbar'
import Footer from './Footer/Footer'
import { useTheme } from '../contexts/theme'

const Layout = ({ children }) => {
  const { theme } = useTheme()
  
  return (
    <div className={`relative min-h-screen flex flex-col transition-colors duration-150 ${
      theme === 'dark' ? 'bg-slate-900 text-slate-100' : 'bg-slate-100 text-slate-900'
    }`}>
      <Navbar />
      <main className="container mx-auto px-4 md:px-8 pt-24 pb-12 flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  )
}

export default Layout
