import uniqid from 'uniqid'
import LaunchIcon from '@material-ui/icons/Launch'
import './ExperienceContainer.css'

const ExperienceContainer = ({ experience }) => (
  <div className='experience'>
    <h3>{experience.company}</h3>
    <p className='experience__title'>{experience.title}</p>
    <p className='experience__dates'>{experience.startDate} – {experience.endDate}</p>
    <p className='experience__description'>{experience.description}</p>
    {experience.stack && (
      <ul className='experience__stack'>
        {experience.stack.map((item) => (
          <li key={uniqid()} className='experience__stack-item'>
            {item}
          </li>
        ))}
      </ul>
    )}

    {experience.companyLink && (
      <a
        href={experience.companyLink}
        aria-label='comany link'
        className='link link--icon'
      >
        <LaunchIcon />
      </a>
    )}
  </div>
)

export default ExperienceContainer
