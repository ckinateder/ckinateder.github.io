import { skills } from '../../portfolio'
import { motion } from 'framer-motion'
import { fadeUp, staggerContainer, staggerItem, viewportOnce } from '../../motion/variants'

const Skills = () => {
  if (!skills.length) return null

  return (
    <section id="skills" className="py-20">
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
      >
        <p className="signal-index mb-3">04 — SKILLS</p>
        <h2 className="signal-title">Skills</h2>
      </motion.div>

      <motion.div
        className="flex flex-wrap gap-2 max-w-4xl"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
      >
        {skills.map((skill) => (
          <motion.span key={skill} variants={staggerItem} className="signal-tag cursor-default">
            {skill}
          </motion.span>
        ))}
      </motion.div>
    </section>
  )
}

export default Skills
