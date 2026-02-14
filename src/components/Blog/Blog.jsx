import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useTheme } from '../../contexts/theme'
import { getAllPosts } from '../../utils/posts'

const Blog = () => {
  const { theme } = useTheme()
  const posts = getAllPosts()
  
  if (posts.length === 0) {
    return (
      <div className="min-h-[calc(100vh-250px)] flex flex-col items-center justify-center text-center py-20">
        <h1 className="text-4xl md:text-6xl font-black text-orange-500 mb-6 leading-tight pb-2">
          Blog Coming Soon
        </h1>
        <p className={`text-lg max-w-lg font-medium ${
          theme === 'dark' ? 'text-zinc-200' : 'text-zinc-800'
        }`}>
          I'm working on sharing my thoughts and experiences. Stay tuned!
        </p>
      </div>
    )
  }
  
  return (
    <div className="min-h-[calc(100vh-250px)] py-20">
      <div className="max-w-8xl mx-auto px-4">
        <h1 className="brutal-title-orange text-center">Blog</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post, index) => (
          <motion.div
            key={post.slug}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <Link to={`/blog/${post.slug}`}>
              <div className="brutal-card flex flex-col h-full hover:border-orange-500 transition-colors duration-150 cursor-pointer">
                <h2 className={`text-xl md:text-2xl font-black mb-3 ${
                  theme === 'dark' ? 'text-zinc-100' : 'text-zinc-900'
                }`}>
                  {post.title}
                </h2>
                
                <p className={`text-sm mb-4 ${
                  theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'
                }`}>
                  {new Date(post.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
                
                <div className="mt-auto">
                  <span className={`text-orange-500 hover:text-orange-600 font-bold text-sm transition-colors duration-150 ${
                    theme === 'dark' ? 'text-orange-400' : 'text-orange-600'
                  }`}>
                    Read More →
                  </span>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
        </div>
      </div>
    </div>
  )
}

export default Blog
