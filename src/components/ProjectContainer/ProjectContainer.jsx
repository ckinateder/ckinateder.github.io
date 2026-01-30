import { Github, ExternalLink } from 'lucide-react'
import { motion } from 'framer-motion'

const ProjectContainer = ({ project }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className='glass-card p-6 md:p-8 flex flex-col h-full'
  >
    <h3 className='text-xl font-bold text-slate-100 mb-3'>{project.name}</h3>

    <p className='text-slate-300 mb-6 flex-grow leading-relaxed text-sm'>{project.description}</p>
    
    <div className='mt-auto'>
      {project.stack && (
        <div className='flex flex-wrap gap-2 mb-6'>
          {project.stack.map((item, id) => (
            <span key={id} className='px-2 py-1 bg-orange-500/10 rounded text-xs text-orange-300 border border-orange-500/20'>
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
            className='text-slate-400 hover:text-white transition-colors'
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
            className='text-slate-400 hover:text-white transition-colors'
          >
            <ExternalLink size={20} />
          </a>
        )}
      </div>
    </div>
  </motion.div>
)

export default ProjectContainer
