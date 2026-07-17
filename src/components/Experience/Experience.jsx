import { experience } from '../../portfolio'
import { motion } from 'framer-motion'
import ExperienceContainer from '../ExperienceContainer/ExperienceContainer'
import { fadeUp, staggerContainer, viewportOnce } from '../../motion/variants'

const Experience = () => {
  if (!experience.length) return null

  return (
    <section id="experience" className="py-20 signal-rule">
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
      >
        <p className="signal-index mb-3">01 — EXPERIENCE</p>
        <h2 className="signal-title">Experience</h2>
      </motion.div>

      <motion.div
        className="flex flex-col"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
      >
        {experience.map((exp, id) => (
          <ExperienceContainer key={id} experience={exp} index={id} />
        ))}
      </motion.div>
    </section>
  )
}

export default Experience
