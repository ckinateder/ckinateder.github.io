import { ExternalLink } from 'lucide-react'
import { motion } from 'framer-motion'
import { useTheme } from '../../contexts/theme'

const ExperienceContainer = ({ experience }) => {
  const { theme } = useTheme()
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3 }}
      className='brutal-card flex flex-col h-full hover:border-orange-500 transition-colors duration-150'
    >
      <div className='flex justify-between items-start mb-4'>
        <div>
          <h3 className={`text-xl md:text-2xl font-black ${
            theme === 'dark' ? 'text-slate-100' : 'text-slate-900'
          }`}>{experience.company}</h3>
          <p className='text-orange-500 font-bold'>{experience.title}</p>
        </div>
        <p className={`text-sm whitespace-nowrap ml-4 font-bold ${
          theme === 'dark' ? 'text-slate-300' : 'text-slate-700'
        }`}>{experience.startDate} – {experience.endDate}</p>
      </div>
      
      <p className={`mb-6 flex-grow leading-relaxed font-medium ${
        theme === 'dark' ? 'text-slate-200' : 'text-slate-800'
      }`}>{experience.description}</p>
    
    <div className='mt-auto'>
      {experience.stack && (
        <div className='flex flex-wrap gap-2 mb-4'>
          {experience.stack.map((item, id) => (
            <span key={id} className='brutal-badge'>
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
          className='inline-flex items-center text-orange-500 hover:text-orange-600 font-bold text-sm transition-colors duration-150'
        >
          Visit Company <ExternalLink size={16} className='ml-1' />
        </a>
      )}
    </div>
  </motion.div>
  )
}

export default ExperienceContainer
