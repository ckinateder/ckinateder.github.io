import { about } from '../../portfolio'
import { motion } from 'framer-motion'
import { Github, Linkedin, FileText } from 'lucide-react'
import { heroContainer, heroItem } from '../../motion/variants'

const About = () => {
  const { name, role, description, resume, social } = about

  return (
    <section
      id="about"
      className="min-h-[calc(100vh-7rem)] flex flex-col justify-center py-16 md:py-24"
    >
      <motion.div
        variants={heroContainer}
        initial="hidden"
        animate="visible"
        className="max-w-2xl"
      >
        <motion.p variants={heroItem} className="signal-index mb-4">
          00 — INTRO
        </motion.p>

        <motion.h1
          variants={heroItem}
          className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[0.95] mb-6"
        >
          {name.split(' ').map((part, i) => (
            <span key={part}>
              {i > 0 && ' '}
              {i === name.split(' ').length - 1 ? (
                <span className="text-accent">{part}</span>
              ) : (
                part
              )}
            </span>
          ))}
        </motion.h1>

        {role && (
          <motion.h2
            variants={heroItem}
            className="font-mono text-sm md:text-base uppercase tracking-[0.2em] text-muted mb-8"
          >
            {role}
          </motion.h2>
        )}

        <motion.p
          variants={heroItem}
          className="text-base md:text-lg leading-relaxed text-ink max-w-xl mb-10 border-l-2 border-accent pl-5"
        >
          {description}
        </motion.p>

        <motion.div variants={heroItem} className="flex flex-wrap gap-3">
          {resume && (
            <a
              href={resume}
              target="_blank"
              rel="noopener noreferrer"
              className="signal-btn"
            >
              <FileText size={18} />
              Resume
            </a>
          )}

          {social?.github && (
            <a
              href={social.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="github"
              className="signal-outline"
            >
              <Github size={18} />
              GitHub
            </a>
          )}

          {social?.linkedin && (
            <a
              href={social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="linkedin"
              className="signal-outline"
            >
              <Linkedin size={18} />
              LinkedIn
            </a>
          )}
        </motion.div>
      </motion.div>
    </section>
  )
}

export default About
