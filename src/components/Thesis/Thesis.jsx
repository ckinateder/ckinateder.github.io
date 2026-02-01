import { thesis } from "../../portfolio"
import { FileText } from 'lucide-react'
import { useTheme } from '../../contexts/theme'

const Thesis = () => {
  const { theme } = useTheme()
  
  if (!thesis.title) return null

  return (
    <section id="thesis" className="py-20">
      <h2 className="brutal-title-orange">Master&apos;s Thesis</h2>
      <div className="brutal-card">
        <h3 className={`text-2xl md:text-3xl font-black mb-4 ${
          theme === 'dark' ? 'text-slate-100' : 'text-slate-900'
        }`}>{thesis.title}</h3>
        <h4 className="text-orange-500 font-black mb-4 uppercase tracking-wider">Abstract</h4>
        <p className={`leading-relaxed mb-8 text-base md:text-lg font-medium ${
          theme === 'dark' ? 'text-slate-200' : 'text-slate-800'
        }`}>{thesis.description}</p>
        <a
          href={thesis.link}
          target="_blank"
          rel="noreferrer"
          className="brutal-btn-outline inline-flex items-center gap-2"
        >
          <FileText size={20} />
          Read Full Thesis
        </a>
      </div>
    </section>
  )
}

export default Thesis
