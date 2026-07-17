import Navbar from './Navbar/Navbar'
import Footer from './Footer/Footer'

const Layout = ({ children }) => {
  return (
    <div className="relative min-h-screen flex flex-col bg-canvas text-ink transition-colors duration-150">
      <Navbar />
      <main className="w-full max-w-6xl mx-auto px-5 md:px-8 pt-28 pb-16 flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  )
}

export default Layout
