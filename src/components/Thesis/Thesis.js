import { thesis } from "../../portfolio"
import "./Thesis.css"

const Thesis = () => {
  if (!thesis.title) return null

  return (
    <section id="thesis" className="section thesis">
      <h2 className="section__title">Master&apos;s Thesis</h2>

      <div className="thesis__content">
        <h3 className="thesis__title">{thesis.title}</h3>
        <h4 className="thesis__subtitle">Abstract</h4>
        <p className="thesis__description">{thesis.description}</p>

        <div className="thesis__actions">
          <a
            href={thesis.link}
            aria-label="view thesis"
            className="btn btn--outline"
            target="_blank" 
            rel="noreferrer"
          >
            View Thesis
          </a>
        </div>
      </div>
    </section>
  )
}

export default Thesis 