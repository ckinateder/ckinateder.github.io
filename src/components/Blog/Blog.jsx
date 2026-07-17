import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { getAllPosts } from '../../utils/posts'
import { fadeUp, staggerContainer, staggerItem, viewportOnce } from '../../motion/variants'

const Blog = () => {
  const posts = getAllPosts()

  if (posts.length === 0) {
    return (
      <div className="min-h-[calc(100vh-250px)] flex flex-col justify-center py-20">
        <p className="signal-index mb-3">BLOG</p>
        <h1 className="font-display text-4xl md:text-6xl font-bold text-accent mb-6 tracking-tight">
          Coming soon
        </h1>
        <p className="text-muted max-w-lg">
          I&apos;m working on sharing my thoughts and experiences. Stay tuned!
        </p>
      </div>
    )
  }

  return (
    <div className="min-h-[calc(100vh-250px)] py-12 md:py-20">
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="visible"
      >
        <p className="signal-index mb-3">BLOG</p>
        <h1 className="signal-title-accent">Blog</h1>
      </motion.div>

      <motion.div
        className="flex flex-col"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        {posts.map((post, index) => {
          const num = String(index + 1).padStart(2, '0')
          return (
            <motion.div key={post.slug} variants={staggerItem}>
              <Link
                to={`/blog/${post.slug}`}
                className="group flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-8 border-t border-line py-6 last:border-b transition-colors duration-150 hover:border-accent"
              >
                <span className="font-mono text-xs text-accent shrink-0">{num}</span>
                <div className="flex-grow min-w-0">
                  <h2 className="font-display text-xl md:text-2xl font-bold text-ink group-hover:text-accent transition-colors duration-150 mb-2">
                    {post.title}
                  </h2>
                  <p className="font-mono text-xs text-muted">
                    {new Date(post.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </p>
                </div>
                <span className="font-mono text-xs text-accent opacity-0 group-hover:opacity-100 transition-opacity duration-150 sm:ml-auto">
                  Read →
                </span>
              </Link>
            </motion.div>
          )
        })}
      </motion.div>
    </div>
  )
}

export default Blog
