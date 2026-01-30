import { projects } from '../../portfolio'
import ProjectContainer from '../ProjectContainer/ProjectContainer'

const Projects = () => {
  if (!projects.length) return null

  return (
    <section id='projects' className='py-20'>
      <h2 className='section-title'>Projects</h2>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
        {projects.map((project, id) => (
          <ProjectContainer key={id} project={project} />
        ))}
      </div>
    </section>
  )
}

export default Projects
