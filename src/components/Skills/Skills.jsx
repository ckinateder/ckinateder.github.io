import { skills } from '../../portfolio'

const Skills = () => {
  if (!skills.length) return null

  return (
    <section id='skills' className='py-20'>
      <h2 className='section-title text-center'>Skills</h2>
      <div className='flex flex-wrap justify-center gap-4 max-w-4xl mx-auto'>
        {skills.map((skill, id) => (
          <span key={id} className='px-4 py-2 glass hover:bg-white/10 transition-colors text-slate-200 text-sm md:text-base cursor-default'>
            {skill}
          </span>
        ))}
      </div>
    </section>
  )
}

export default Skills
