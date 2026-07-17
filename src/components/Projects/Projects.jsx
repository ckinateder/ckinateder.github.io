import { projects } from '../../portfolio'
import { motion } from 'framer-motion'
import ProjectContainer from '../ProjectContainer/ProjectContainer'
import { fadeUp, staggerContainer, viewportOnce } from '../../motion/variants'

const Projects = () => {
  if (!projects.length) return null

  return (
    <section id="projects" className="py-20">
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
      >
        <p className="signal-index mb-3">02 — PROJECTS</p>
        <h2 className="signal-title">Projects</h2>
      </motion.div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-0 border-t border-l border-line"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
      >
        {projects.map((project, id) => (
          <ProjectContainer key={id} project={project} index={id} />
        ))}
      </motion.div>
    </section>
  )
}

export default Projects
