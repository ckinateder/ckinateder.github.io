import Navbar from './Navbar/Navbar'
import Footer from './Footer/Footer'
import SiteConstellation from './SiteConstellation/SiteConstellation'

const Layout = ({ children }) => {
  return (
    <div className="relative min-h-screen flex flex-col bg-canvas text-ink transition-colors duration-150">
      <SiteConstellation />
      <div className="relative z-10 flex flex-col flex-grow min-h-screen">
        <Navbar />
        <main id="site-main" className="w-full max-w-6xl mx-auto px-5 md:px-8 pt-28 pb-16 flex-grow">
          {children}
        </main>
        <Footer />
      </div>
    </div>
  )
}

export default Layout
