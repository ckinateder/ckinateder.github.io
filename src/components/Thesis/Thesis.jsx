import { thesis } from "../../portfolio"
import { FileText } from 'lucide-react'

const Thesis = () => {
  if (!thesis.title) return null

  return (
    <section id="thesis" className="py-20">
      <h2 className="section-title">Master&apos;s Thesis</h2>
      <div className="glass p-8 md:p-12">
        <h3 className="text-2xl md:text-3xl font-bold text-slate-100 mb-4">{thesis.title}</h3>
        <h4 className="text-orange-400 font-medium mb-4 uppercase tracking-wider">Abstract</h4>
        <p className="text-slate-300 leading-relaxed mb-8 text-base md:text-lg">{thesis.description}</p>
        <a
          href={thesis.link}
          target="_blank"
          rel="noreferrer"
          className="btn-outline inline-flex items-center gap-2 text-slate-100"
        >
          <FileText size={20} />
          Read Full Thesis
        </a>
      </div>
    </section>
  )
}

export default Thesis
