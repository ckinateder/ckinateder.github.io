import { FileText } from 'lucide-react'
import { useTheme } from '../../contexts/theme'

const PublicationContainer = ({ publication }) => {
  const { theme } = useTheme()

  return (
    <div className="brutal-card">
      <h3
        className={`text-2xl md:text-3xl font-black mb-4 ${
          theme === 'dark' ? 'text-zinc-100' : 'text-zinc-900'
        }`}
      >
        {publication.title}
      </h3>
      <h4 className="text-orange-500 font-black mb-4 uppercase tracking-wider">
        Abstract
      </h4>
      <p
        className={`leading-relaxed mb-8 text-sm md:text-lg font-medium ${
          theme === 'dark' ? 'text-zinc-200' : 'text-zinc-800'
        }`}
      >
        {publication.description}
      </p>
      <a
        href={publication.link}
        target="_blank"
        rel="noreferrer"
        className="brutal-btn-outline inline-flex items-center gap-2"
      >
        <FileText size={20} />
        Read Publication
      </a>
    </div>
  )
}

export default PublicationContainer
