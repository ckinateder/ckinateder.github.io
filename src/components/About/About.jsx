import { about } from '../../portfolio'
import { motion } from 'framer-motion'
import { Github, Linkedin, FileText } from 'lucide-react'
import { useTheme } from '../../contexts/theme'

const About = () => {
  const { name, role, description, resume, social } = about
  const { theme } = useTheme()

  return (
    <section className={`min-h-screen flex flex-col justify-center py-20 pb-32 transition-colors duration-150 ${
      theme === 'dark' ? 'bg-zinc-900' : 'bg-zinc-100'
    }`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        <h1 className={`text-5xl md:text-7xl font-black mb-6 ${
          theme === 'dark' ? 'text-zinc-100' : 'text-zinc-900'
        }`}>
          Hi, I'm <span className='text-orange-500'>{name}.</span>
        </h1>
        
        {role && (
          <h2 className={`text-2xl md:text-4xl font-bold mb-8 ${
            theme === 'dark' ? 'text-zinc-200' : 'text-zinc-800'
          }`}>
            {role}
          </h2>
        )}

        <p className={`text-sm md:text-lg max-w-2xl leading-relaxed mb-10 brutal-card border-4 border-black p-6 ${
          theme === 'dark' ? 'text-zinc-200' : 'text-zinc-800'
        }`}>
          {description}
        </p>

        <div className='flex flex-wrap gap-4'>
          {resume && (
            <a href={resume} target="_blank" rel="noopener noreferrer" className='brutal-btn-primary flex items-center gap-2'>
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
                  className='brutal-btn-outline flex items-center gap-2'
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
                  className='brutal-btn-outline flex items-center gap-2'
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
