import { publications } from '../../portfolio'
import { motion } from 'framer-motion'
import PublicationContainer from './PublicationContainer'
import { fadeUp, staggerContainer, viewportOnce } from '../../motion/variants'

const Publications = () => {
  if (!publications.length) return null

  return (
    <section id="publications" className="py-20">
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
      >
        <p className="signal-index mb-3">03 — PUBLICATIONS</p>
        <h2 className="signal-title">Publications</h2>
      </motion.div>

      <motion.div
        className="flex flex-col gap-0"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
      >
        {publications.map((publication, id) => (
          <PublicationContainer key={id} publication={publication} index={id} />
        ))}
      </motion.div>
    </section>
  )
}

export default Publications
