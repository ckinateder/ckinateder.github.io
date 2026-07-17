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

    const updateGistThemes = () => {
      const containers = contentRef.current.querySelectorAll('.gist-embed[data-gist-id]')
      containers.forEach(container => {
        container.style.backgroundColor = theme === 'dark' ? '#27272A' : '#F0EEEA'
        const codeBlock = container.querySelector('.gist-code-block')
        if (codeBlock) {
          codeBlock.style.backgroundColor = theme === 'dark' ? '#18181B' : '#E6E4E0'
          const code = codeBlock.querySelector('code')
          if (code) {
            code.style.color = theme === 'dark' ? '#e5e7eb' : '#141414'
          }
        }
      })
    }

    const loadGists = async () => {
      const scripts = Array.from(contentRef.current.querySelectorAll('script[src*="gist.github.com"]'))
        .filter(script => !script.getAttribute('data-processed'))

      for (const script of scripts) {
        script.setAttribute('data-processed', 'true')

        const gistUrl = script.src
        const gistMatch = gistUrl.match(/gist\.github\.com\/([^\/]+)\/([^\.]+)/)

        if (gistMatch) {
          const [, username, gistId] = gistMatch

          let container = contentRef.current.querySelector(`.gist-embed[data-gist-id="${gistId}"]`)

          if (!container) {
            container = document.createElement('div')
            container.className = 'gist-embed'
            container.setAttribute('data-gist-id', gistId)
            container.style.width = '100%'
            container.style.margin = '1rem 0'
            container.style.padding = '1rem'
            container.style.border = '1px solid var(--color-line)'

            script.style.display = 'none'
            script.style.width = '0'
            script.style.height = '0'
            script.style.overflow = 'hidden'

            if (script.parentNode) {
              script.insertAdjacentElement('afterend', container)
            }
          }

          container.style.backgroundColor = theme === 'dark' ? '#27272A' : '#F0EEEA'

          if (!container.querySelector('.gist-code-block')) {
            container.innerHTML = '<p>Loading Gist...</p>'

            try {
              const response = await fetch(`https://api.github.com/gists/${gistId}`)
              const gistData = await response.json()

              if (gistData.files) {
                const firstFile = Object.values(gistData.files)[0]
                const content = firstFile.content

                const codeBlock = document.createElement('pre')
                codeBlock.style.margin = '0'
                codeBlock.style.padding = '1rem'
                codeBlock.style.overflow = 'auto'
                codeBlock.style.backgroundColor = theme === 'dark' ? '#18181B' : '#E6E4E0'
                codeBlock.className = 'gist-code-block'

                const code = document.createElement('code')
                code.textContent = content
                code.style.fontFamily = '"JetBrains Mono", monospace'
                code.style.fontSize = '0.875rem'
                code.style.color = theme === 'dark' ? '#e5e7eb' : '#141414'

                codeBlock.appendChild(code)
                container.innerHTML = ''
                container.appendChild(codeBlock)

                const link = document.createElement('a')
                link.href = `https://gist.github.com/${username}/${gistId}`
                link.target = '_blank'
                link.rel = 'noopener noreferrer'
                link.textContent = 'View on GitHub →'
                link.style.display = 'block'
                link.style.marginTop = '0.5rem'
                link.style.color = '#F97316'
                link.style.textDecoration = 'none'
                link.style.fontFamily = '"JetBrains Mono", monospace'
                link.style.fontSize = '0.75rem'
                container.appendChild(link)
              }
            } catch (error) {
              console.error('Failed to load Gist:', error)
              container.innerHTML = `<p>Failed to load Gist. <a href="https://gist.github.com/${username}/${gistId}" target="_blank" rel="noopener noreferrer">View on GitHub</a></p>`
            }
          } else {
            const codeBlock = container.querySelector('.gist-code-block')
            if (codeBlock) {
              codeBlock.style.backgroundColor = theme === 'dark' ? '#18181B' : '#E6E4E0'
              const code = codeBlock.querySelector('code')
              if (code) {
                code.style.color = theme === 'dark' ? '#e5e7eb' : '#141414'
              }
            }
          }
        }
      }

      updateGistThemes()
    }

    const timer = setTimeout(() => {
      requestAnimationFrame(loadGists)
    }, 100)

    return () => {
      clearTimeout(timer)
    }
  }, [post, theme])

  if (!post || !post.Component) {
    return (
      <div className="min-h-[calc(100vh-250px)] flex flex-col justify-center py-20">
        <h1 className="font-display text-4xl md:text-6xl font-bold text-accent mb-6">
          Post not found
        </h1>
        <Link to="/blog" className="signal-outline w-fit">
          Back to blog
        </Link>
      </div>
    )
  }

  const PostContent = post.Component

  return (
    <div className="min-h-[calc(100vh-250px)] py-12 md:py-20">
      <Link
        to="/blog"
        className="inline-block mb-8 font-mono text-xs text-accent hover:underline"
      >
        ← Back to blog
      </Link>

      <article className="border border-line bg-surface p-6 md:p-10">
        <h1 className="font-display text-3xl md:text-5xl font-bold text-ink mb-4 tracking-tight">
          {post.title}
        </h1>

        <p className="font-mono text-xs text-muted mb-10 pb-8 border-b border-line">
          {new Date(post.date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </p>

        <div ref={contentRef} className="signal-prose max-w-none">
          <PostContent />
        </div>
      </article>
    </div>
  )
}

export default BlogPost
