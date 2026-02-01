import { Github, ExternalLink } from 'lucide-react'
import { motion } from 'framer-motion'
import { useTheme } from '../../contexts/theme'

const ProjectContainer = ({ project }) => {
  const { theme } = useTheme()
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3 }}
      className='brutal-card flex flex-col h-full hover:border-orange-500 transition-colors duration-150'
    >
      <h3 className={`text-xl font-black mb-3 ${
        theme === 'dark' ? 'text-slate-100' : 'text-slate-900'
      }`}>{project.name}</h3>

      <p className={`mb-6 flex-grow leading-relaxed text-sm font-medium ${
        theme === 'dark' ? 'text-slate-200' : 'text-slate-800'
      }`}>{project.description}</p>
    
    <div className='mt-auto'>
      {project.stack && (
        <div className='flex flex-wrap gap-2 mb-6'>
          {project.stack.map((item, id) => (
            <span key={id} className='brutal-badge-dark'>
              {item}
            </span>
          ))}
        </div>
      )}

      <div className='flex gap-4'>
        {project.sourceCode && (
          <a
            href={project.sourceCode}
            target="_blank"
            rel="noopener noreferrer"
            aria-label='source code'
            className={`hover:text-orange-500 transition-colors duration-150 ${
              theme === 'dark' ? 'text-slate-300' : 'text-slate-700'
            }`}
          >
            <Github size={20} />
          </a>
        )}

        {project.livePreview && (
          <a
            href={project.livePreview}
            target="_blank"
            rel="noopener noreferrer"
            aria-label='live preview'
            className={`hover:text-orange-500 transition-colors duration-150 ${
              theme === 'dark' ? 'text-slate-300' : 'text-slate-700'
            }`}
          >
            <ExternalLink size={20} />
          </a>
        )}
      </div>
    </div>
  </motion.div>
  )
}

export default ProjectContainer
