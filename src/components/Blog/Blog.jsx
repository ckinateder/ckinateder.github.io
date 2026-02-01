import { useTheme } from '../../contexts/theme'

const Blog = () => {
  const { theme } = useTheme()
  
  return (
    <div className="min-h-[calc(100vh-250px)] flex flex-col items-center justify-center text-center py-20">
      <h1 className="text-4xl md:text-6xl font-black text-orange-500 mb-6 leading-tight pb-2">
        Blog Coming Soon
      </h1>
      <p className={`text-lg max-w-lg font-medium ${
        theme === 'dark' ? 'text-slate-200' : 'text-slate-800'
      }`}>
        I'm working on sharing my thoughts and experiences. Stay tuned!
      </p>
    </div>
  )
}

export default Blog
