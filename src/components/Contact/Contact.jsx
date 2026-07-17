import { contact } from '../../portfolio'
import { motion } from 'framer-motion'
import { Mail, Calendar } from 'lucide-react'
import { fadeUp, viewportOnce } from '../../motion/variants'

const Contact = () => {
  if (!contact.email) return null

  return (
    <section id="contact" className="py-20 signal-rule">
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="max-w-xl"
      >
        <p className="signal-index mb-3">05 — CONTACT</p>
        <h2 className="signal-title">Get in touch</h2>
        <div className="flex flex-col sm:flex-row gap-3">
          <a href={`mailto:${contact.email}`} className="signal-btn">
            <Mail size={18} />
            Email me
          </a>
          {contact.meeting && (
            <a
              href={contact.meeting}
              target="_blank"
              rel="noreferrer"
              className="signal-outline"
            >
              <Calendar size={18} />
              Schedule meeting
            </a>
          )}
        </div>
      </motion.div>
    </section>
  )
}

export default Contact
