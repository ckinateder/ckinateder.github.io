import { contact } from '../../portfolio'
import { Mail, Calendar } from 'lucide-react'

const Contact = () => {
  if (!contact.email) return null

  return (
    <section id='contact' className='py-20 text-center'>
      <h2 className='section-title'>Get In Touch</h2>
      <div className='flex flex-col md:flex-row justify-center items-center gap-6'>
        <a href={`mailto:${contact.email}`} className='btn-primary flex items-center gap-2 text-white'>
          <Mail size={20} />
          Email Me
        </a>
        {contact.meeting && (
           <a href={contact.meeting} target="_blank" rel="noreferrer" className='btn-outline flex items-center gap-2 text-slate-100'>
             <Calendar size={20} />
             Schedule Meeting
           </a>
        )}
      </div>
    </section>
  )
}

export default Contact
