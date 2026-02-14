import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import About from './components/About/About'
import Projects from './components/Projects/Projects'
import Experience from './components/Experience/Experience'
import Skills from './components/Skills/Skills'
import Thesis from './components/Thesis/Thesis'
import Contact from './components/Contact/Contact'
import ScrollToTop from './components/ScrollToTop/ScrollToTop'
import Blog from './components/Blog/Blog'
import BlogPost from './components/BlogPost/BlogPost'

const Home = () => (
  <>
        <About />
        <Experience />
        <Projects />
        <Thesis />
        <Skills />
        <Contact />
  </>
)

const App = () => {
  return (
    <Layout>
      <div id='top'></div>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/blog' element={<Blog />} />
        <Route path='/blog/:slug' element={<BlogPost />} />
      </Routes>
      <ScrollToTop />
    </Layout>
  )
}

export default App
