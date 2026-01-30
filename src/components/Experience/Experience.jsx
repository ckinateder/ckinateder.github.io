import { experience } from '../../portfolio'
import ExperienceContainer from '../ExperienceContainer/ExperienceContainer'

const Experience = () => {
  if (!experience.length) return null

  return (
    <section id='experience' className='py-20'>
      <h2 className='section-title'>Experience</h2>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
        {experience.map((exp, id) => (
          <ExperienceContainer key={id} experience={exp} />
        ))}
      </div>
    </section>
  )
}

export default Experience
