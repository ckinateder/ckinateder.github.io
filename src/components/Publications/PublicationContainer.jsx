import { FileText } from 'lucide-react'
import { motion } from 'framer-motion'
import { staggerItem } from '../../motion/variants'

const PublicationContainer = ({ publication, index }) => {
  const num = String(index + 1).padStart(2, '0')

  return (
    <motion.article
      variants={staggerItem}
      className="group border-t border-line py-8 last:border-b transition-colors duration-150"
    >
      <div className="flex flex-col md:flex-row gap-4 md:gap-8">
        <span className="font-mono text-xs text-accent shrink-0 pt-1">{num}</span>
        <div className="min-w-0 flex-grow">
          <h3 className="font-display text-xl md:text-2xl font-bold text-ink mb-2 group-hover:text-accent transition-colors duration-150">
            {publication.title}
          </h3>
          {publication.venue && (
            <p className="font-mono text-xs text-muted mb-3">
              {publication.venue}
            </p>
          )}
          <p className="font-mono text-xs uppercase tracking-wider text-accent mb-4">
            Abstract
          </p>
          <p className="leading-relaxed mb-6 text-sm md:text-base text-muted max-w-3xl">
            {publication.description}
          </p>
          <a
            href={publication.link}
            target="_blank"
            rel="noreferrer"
            className="signal-outline"
          >
            <FileText size={16} />
            Read publication
          </a>
        </div>
      </div>
    </motion.article>
  )
}

export default PublicationContainer
