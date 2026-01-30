import { about } from '../../portfolio'
import { motion } from 'framer-motion'
import { Github, Linkedin, FileText } from 'lucide-react'

const About = () => {
  const { name, role, description, resume, social } = about

  return (
    <section className='min-h-screen flex flex-col justify-center py-20 pb-32'>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <h1 className='text-5xl md:text-7xl font-bold mb-6 text-slate-100'>
          Hi, I'm <span className='bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-orange-600'>{name}.</span>
        </h1>
        
        {role && (
          <h2 className='text-2xl md:text-4xl font-medium text-slate-400 mb-8'>
            {role}
          </h2>
        )}

        <p className='text-base md:text-lg text-slate-300 max-w-2xl leading-relaxed mb-10 glass p-6 border-l-4 border-orange-500 rounded-r-xl rounded-l-sm'>
          {description}
        </p>

        <div className='flex flex-wrap gap-4'>
          {resume && (
            <a href={resume} target="_blank" rel="noopener noreferrer" className='btn-primary flex items-center gap-2'>
              <FileText size={20} />
              Resume
            </a>
          )}

          {social && (
            <>
              {social.github && (
                <a
                  href={social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label='github'
                  className='btn-outline flex items-center gap-2 text-slate-100'
                >
                  <Github size={20} />
                  GitHub
                </a>
              )}

              {social.linkedin && (
                <a
                  href={social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label='linkedin'
                  className='btn-outline flex items-center gap-2 text-slate-100'
                >
                  <Linkedin size={20} />
                  LinkedIn
                </a>
              )}
            </>
          )}
        </div>
      </motion.div>
    </section>
  )
}

export default About
