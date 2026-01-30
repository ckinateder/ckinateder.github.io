import Navbar from './Navbar/Navbar'
import Footer from './Footer/Footer'

const Layout = ({ children }) => {
  return (
    <div className="relative min-h-screen flex flex-col text-slate-100">
      <div className="gradient-bg" />
      <Navbar />
      <main className="container mx-auto px-4 md:px-8 pt-24 pb-12 flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  )
}

export default Layout
