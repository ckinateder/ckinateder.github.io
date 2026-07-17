import { ExternalLink } from 'lucide-react'
import { motion } from 'framer-motion'
import { staggerItem } from '../../motion/variants'

const ExperienceContainer = ({ experience, index }) => {
  const num = String(index + 1).padStart(2, '0')

  return (
    <motion.article
      variants={staggerItem}
      className="group border-b border-line py-8 first:border-t transition-colors duration-150 hover:border-accent"
    >
      <div className="flex flex-col md:flex-row md:items-start gap-4 md:gap-8">
        <span className="font-mono text-xs text-accent shrink-0 pt-1">{num}</span>

        <div className="flex-grow min-w-0">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-2 mb-3">
            <div>
              <h3 className="font-display text-xl md:text-2xl font-bold text-ink group-hover:text-accent transition-colors duration-150">
                {experience.company}
              </h3>
              <p className="font-mono text-sm text-accent mt-1">{experience.title}</p>
            </div>
            <p className="font-mono text-xs text-muted whitespace-nowrap">
              {experience.startDate} — {experience.endDate}
            </p>
          </div>

          <p className="text-sm md:text-base leading-relaxed text-muted mb-4 max-w-2xl">
            {experience.description}
          </p>

          {experience.stack && (
            <div className="flex flex-wrap gap-2 mb-3">
              {experience.stack.map((item) => (
                <span key={item} className="signal-tag">
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
              className="inline-flex items-center font-mono text-xs text-accent hover:underline"
            >
              Visit company <ExternalLink size={12} className="ml-1" />
            </a>
          )}
        </div>
      </div>
    </motion.article>
  )
}

export default ExperienceContainer
