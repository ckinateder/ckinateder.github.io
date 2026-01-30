import { ExternalLink } from 'lucide-react'
import { motion } from 'framer-motion'

const ExperienceContainer = ({ experience }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className='glass-card p-6 md:p-8 flex flex-col h-full'
  >
    <div className='flex justify-between items-start mb-4'>
      <div>
        <h3 className='text-xl md:text-2xl font-bold text-slate-100'>{experience.company}</h3>
        <p className='text-orange-400 font-medium'>{experience.title}</p>
      </div>
      <p className='text-slate-400 text-sm whitespace-nowrap ml-4'>{experience.startDate} – {experience.endDate}</p>
    </div>
    
    <p className='text-slate-300 mb-6 flex-grow leading-relaxed'>{experience.description}</p>
    
    <div className='mt-auto'>
      {experience.stack && (
        <div className='flex flex-wrap gap-2 mb-4'>
          {experience.stack.map((item, id) => (
            <span key={id} className='px-3 py-1 bg-slate-800/50 rounded-full text-xs text-slate-300 border border-slate-700'>
              {item}
            </span>
          ))}
        </div>
      )}

      {experience.companyLink && (
        <a
          href={experience.companyLink}
          target="_blank"
          rel="noopener noreferrer"
          className='inline-flex items-center text-orange-400 hover:text-orange-300 transition-colors text-sm font-medium'
        >
          Visit Company <ExternalLink size={16} className='ml-1' />
        </a>
      )}
    </div>
  </motion.div>
)

export default ExperienceContainer
