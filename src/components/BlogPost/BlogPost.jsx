import { useEffect, useRef } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useTheme } from '../../contexts/theme'
import { getPostBySlug } from '../../utils/posts'

const BlogPost = () => {
  const { slug } = useParams()
  const { theme } = useTheme()
  const post = getPostBySlug(slug)
  const contentRef = useRef(null)

  useEffect(() => {
    if (!post || !contentRef.current) return

    // Update theme for existing Gist containers
    const updateGistThemes = () => {
      const containers = contentRef.current.querySelectorAll('.gist-embed[data-gist-id]')
      containers.forEach(container => {
        container.style.backgroundColor = theme === 'dark' ? '#1f2937' : '#ffffff'
        const codeBlock = container.querySelector('.gist-code-block')
        if (codeBlock) {
          codeBlock.style.backgroundColor = theme === 'dark' ? '#111827' : '#f6f8fa'
          const code = codeBlock.querySelector('code')
          if (code) {
            code.style.color = theme === 'dark' ? '#e5e7eb' : '#24292e'
          }
        }
      })
    }

    // Replace script tags with Gist content fetched from GitHub API
    const loadGists = async () => {
      // Find all script tags with Gist URLs that haven't been processed
      const scripts = Array.from(contentRef.current.querySelectorAll('script[src*="gist.github.com"]'))
        .filter(script => !script.getAttribute('data-processed'))
      
      for (const script of scripts) {
        script.setAttribute('data-processed', 'true')
        
        // Extract Gist ID from URL (format: https://gist.github.com/username/gistid.js)
        const gistUrl = script.src
        const gistMatch = gistUrl.match(/gist\.github\.com\/([^\/]+)\/([^\.]+)/)
        
        if (gistMatch) {
          const [, username, gistId] = gistMatch
          
          // Check if container already exists (from theme change)
          let container = contentRef.current.querySelector(`.gist-embed[data-gist-id="${gistId}"]`)
          
          if (!container) {
            // Create a container div for the Gist
            container = document.createElement('div')
            container.className = 'gist-embed'
            container.setAttribute('data-gist-id', gistId)
            container.style.width = '100%'
            container.style.margin = '1rem 0'
            container.style.padding = '1rem'
            container.style.border = '1px solid #e1e4e8'
            container.style.borderRadius = '6px'
            
            // Insert the container right after the script tag to keep it inline
            // Hide the script tag but keep it in DOM to avoid React conflicts
            script.style.display = 'none'
            script.style.width = '0'
            script.style.height = '0'
            script.style.overflow = 'hidden'
            
            // Use insertAdjacentElement for reliable inline insertion
            if (script.parentNode) {
              script.insertAdjacentElement('afterend', container)
            }
          }
          
          // Update theme styles
          container.style.backgroundColor = theme === 'dark' ? '#1f2937' : '#ffffff'
          
          // Only fetch and render if container is empty or just has loading text
          if (!container.querySelector('.gist-code-block')) {
            // Show loading state
            container.innerHTML = '<p>Loading Gist...</p>'
            
            try {
              // Fetch Gist content from GitHub API
              const response = await fetch(`https://api.github.com/gists/${gistId}`)
              const gistData = await response.json()
              
              if (gistData.files) {
                // Render the first file in the Gist
                const firstFile = Object.values(gistData.files)[0]
                const language = firstFile.language || 'text'
                const content = firstFile.content
                
                // Create a code block
                const codeBlock = document.createElement('pre')
                codeBlock.style.margin = '0'
                codeBlock.style.padding = '1rem'
                codeBlock.style.overflow = 'auto'
                codeBlock.style.backgroundColor = theme === 'dark' ? '#111827' : '#f6f8fa'
                codeBlock.style.borderRadius = '4px'
                codeBlock.className = 'gist-code-block'
                
                const code = document.createElement('code')
                code.textContent = content
                code.style.fontFamily = 'monospace'
                code.style.fontSize = '0.875rem'
                code.style.color = theme === 'dark' ? '#e5e7eb' : '#24292e'
                
                codeBlock.appendChild(code)
                container.innerHTML = ''
                container.appendChild(codeBlock)
                
                // Add a link to view on GitHub
                const link = document.createElement('a')
                link.href = `https://gist.github.com/${username}/${gistId}`
                link.target = '_blank'
                link.rel = 'noopener noreferrer'
                link.textContent = 'View on GitHub →'
                link.style.display = 'block'
                link.style.marginTop = '0.5rem'
                link.style.color = '#0366d6'
                link.textDecoration = 'none'
                container.appendChild(link)
              }
            } catch (error) {
              console.error('Failed to load Gist:', error)
              container.innerHTML = `<p>Failed to load Gist. <a href="https://gist.github.com/${username}/${gistId}" target="_blank" rel="noopener noreferrer">View on GitHub</a></p>`
            }
          } else {
            // Just update the theme of existing code block
            const codeBlock = container.querySelector('.gist-code-block')
            if (codeBlock) {
              codeBlock.style.backgroundColor = theme === 'dark' ? '#111827' : '#f6f8fa'
              const code = codeBlock.querySelector('code')
              if (code) {
                code.style.color = theme === 'dark' ? '#e5e7eb' : '#24292e'
              }
            }
          }
        }
      }
      
      // Update theme for all existing Gists
      updateGistThemes()
    }

    // Wait for DOM to be ready and use requestAnimationFrame for better timing
    const timer = setTimeout(() => {
      requestAnimationFrame(loadGists)
    }, 100)
    
    return () => {
      clearTimeout(timer)
      // Don't remove containers on cleanup - just update them when theme changes
    }
  }, [post, theme])

  if (!post || !post.Component) {
    return (
      <div className="min-h-[calc(100vh-250px)] flex flex-col items-center justify-center text-center py-20">
        <h1 className="text-4xl md:text-6xl font-black text-orange-500 mb-6">
          Post Not Found
        </h1>
        <Link to="/blog" className="brutal-btn-outline">
          Back to Blog
        </Link>
      </div>
    )
  }

  const PostContent = post.Component

  return (
    <div className="min-h-[calc(100vh-250px)] py-20">
      <div className="max-w-7xl mx-auto px-4">
        <Link 
          to="/blog" 
          className={`inline-block mb-8 text-orange-500 hover:text-orange-600 font-bold ${
            theme === 'dark' ? 'text-orange-400' : 'text-orange-600'
          }`}
        >
          ← Back to Blog
        </Link>
        
        <article className="brutal-card">
          <h1 className={`text-4xl md:text-5xl font-black mb-4 ${
            theme === 'dark' ? 'text-zinc-100' : 'text-zinc-900'
          }`}>
            {post.title}
          </h1>
          
          <p className={`text-sm mb-8 ${
            theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'
          }`}>
            {new Date(post.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </p>
          
          <div 
            ref={contentRef}
            className={`max-w-none ${
              theme === 'dark' 
                ? 'text-zinc-200' 
                : 'text-zinc-800'
            }`}
          >
            <PostContent />
          </div>
        </article>
      </div>
    </div>
  )
}

export default BlogPost
