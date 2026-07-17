import { Github, ExternalLink } from 'lucide-react'
import { motion } from 'framer-motion'
import { staggerItem } from '../../motion/variants'

const ProjectContainer = ({ project, index }) => {
  const num = String(index + 1).padStart(2, '0')

  return (
    <motion.article
      variants={staggerItem}
      className="group flex flex-col h-full border-r border-b border-line p-6 md:p-8 transition-colors duration-150 hover:bg-surface"
    >
      <div className="flex items-baseline justify-between mb-4">
        <span className="font-mono text-xs text-accent">{num}</span>
        <div className="flex gap-3">
          {project.sourceCode && (
            <a
              href={project.sourceCode}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="source code"
              className="text-muted hover:text-accent transition-colors duration-150"
            >
              <Github size={18} />
            </a>
          )}
          {project.livePreview && (
            <a
              href={project.livePreview}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="live preview"
              className="text-muted hover:text-accent transition-colors duration-150"
            >
              <ExternalLink size={18} />
            </a>
          )}
        </div>
      </div>

      <h3 className="font-display text-xl font-bold text-ink mb-3 group-hover:text-accent transition-colors duration-150">
        {project.name}
      </h3>

      <p className="mb-6 flex-grow leading-relaxed text-sm text-muted">
        {project.description}
      </p>

      {project.stack && (
        <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t border-line group-hover:border-accent transition-colors duration-150">
          {project.stack.map((item) => (
            <span key={item} className="signal-tag">
              {item}
            </span>
          ))}
        </div>
      )}
    </motion.article>
  )
}

export default ProjectContainer
