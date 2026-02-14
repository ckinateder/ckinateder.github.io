import matter from 'gray-matter'

// Import MDX posts as components
const postModules = import.meta.glob('../posts/*.mdx', { eager: true })
// Import MDX posts as raw text for frontmatter parsing
const postRawModules = import.meta.glob('../posts/*.mdx?raw', { eager: true })

// Parse and process posts
export const getAllPosts = () => {
  const posts = Object.entries(postModules).map(([path, module]) => {
    const slug = path
      .split('/')
      .pop()
      .replace(/\.mdx$/, '')
    
    // Get the component
    const Component = module.default
    
    // Get frontmatter - first try from the MDX module (if remark-mdx-frontmatter is working)
    let frontmatter = module.frontmatter || {}
    
    // Fallback: Get raw content for frontmatter parsing
    if (!frontmatter.title) {
      const filename = path.split('/').pop()
      const rawPath = Object.keys(postRawModules).find(key => key.includes(filename))
      const rawContent = rawPath ? postRawModules[rawPath] : null
      
      if (rawContent) {
        const content = typeof rawContent === 'string' ? rawContent : rawContent.default || ''
        try {
          const parsed = matter(content)
          frontmatter = { ...frontmatter, ...(parsed.data || {}) }
        } catch (error) {
          console.warn(`Failed to parse frontmatter for ${filename}:`, error)
        }
      }
    }
    
    return {
      slug,
      title: frontmatter.title || 'Untitled',
      date: frontmatter.date || new Date().toISOString(),
      Component,
      ...frontmatter,
    }
  })
  
  // Sort by date, newest first
  return posts.sort((a, b) => new Date(b.date) - new Date(a.date))
}

// Get a single post by slug
export const getPostBySlug = (slug) => {
  const posts = getAllPosts()
  return posts.find(post => post.slug === slug)
}

// Get post component by slug
export const getPostComponent = (slug) => {
  const post = getPostBySlug(slug)
  return post?.Component || null
}
