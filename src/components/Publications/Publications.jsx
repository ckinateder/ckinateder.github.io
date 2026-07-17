import { publications } from '../../portfolio'
import PublicationContainer from './PublicationContainer'

const Publications = () => {
  if (!publications.length) return null

  return (
    <section id="publications" className="py-20">
      <h2 className="brutal-title-orange">Publications</h2>
      <div className="space-y-8">
        {publications.map((publication, id) => (
          <PublicationContainer key={id} publication={publication} />
        ))}
      </div>
    </section>
  )
}

export default Publications
