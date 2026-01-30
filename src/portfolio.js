const header = {
  // all the properties are optional - can be left empty or deleted
  homepage: 'https://calvinkinateder.com',
  title: 'CK.',
}

const about = {
  // all the properties are optional - can be left empty or deleted
  name: 'Calvin Kinateder',
  role: 'Software Engineer',
  description:
    "I'm a software engineer focused on building applications that are perfectly designed from the inside out. No matter what I'm working on, my vision is for an equal focus on both the developer and the user. I received my B.S. and M.S. in Computer Science from the University of Cincinnati in 2025.",
  resume:
    'https://drive.google.com/file/d/1RiUoG0KicpDSht8LuxRDVp09w0K7LGao/view?usp=sharing',
  social: {
    linkedin: 'https://www.linkedin.com/in/calvin-kinateder/',
    github: 'https://github.com/ckinateder',
  },
}

const projects = [
  // projects can be added an removed
  {
    name: 'flower-dp',
    description:
      'Fully functional boilerplate for differentially private federated learning',
    stack: ['Python', 'PyTorch', 'Tensorflow', 'Docker'],
    livePreview: 'https://ckinateder.github.io/flower-dp/',
  },
  {
    name: 'bacta',
    description:
      'Python library for backtesting algorithmic trading strategies',
    stack: ['Python', 'Numpy', 'Docker'],
    sourceCode: 'https://github.com/ckinateder/bacta/',
  },
  {
    name: 'google-photos-exif-merger',
    description:
      'Fixes the broken EXIF data in Google Photos exports',
    stack: ['Python', 'EXIF', 'Web'],
    sourceCode: 'https://github.com/ckinateder/google-photos-exif-merger',
  },
  {
    name: 'stegosaurus-midi',
    description:
      'Embedded MIDI controller built on the RP2040 + Arduino platform for audio device manipulation',
    stack: ['C++', 'JavaScript', 'WebMIDI', 'UNIX'],
    sourceCode: 'https://github.com/ckinateder/stegosaurus-midi',
    livePreview: 'https://ckinateder.github.io/stegosaurus-midi/',
  },
]



const experience = [
  {
    title: 'Software Engineer',
    company: 'SRC, Inc.',
    description:
      'Supporting the Electronic Warfare division at AFRL, Wright Patterson Air Force Base.',
    stack: ['Node.js', 'Python', 'MATLAB', 'Docker', 'Jenkins'],
    companyLink: 'https://www.srcinc.com/',
    startDate: 'Jun 2025',
    endDate: 'Present',
  },
  {
    title: 'Software Engineer Co-op',
    company: 'Siemens',
    description:
      'Researched cutting-edge technologies via academic papers to explore how they could be used for profit',
    stack: ['Python', 'PyTorch', 'Tensorflow', 'Docker', 'Bash'],
    companyLink: 'https://www.siemens.com/',
    startDate: 'Jan 2022',
    endDate: 'August 2024',
  },
  {
    title: 'Computer Engineer Co-op',
    company: 'Skyward LTD',
    description:
      'Implemented real-time inference for anomaly detection on incoming aircraft ADS-B transmissions',
    stack: ['C++', 'Golang', 'Tensorflow', 'TensorRT', 'Docker'],
    companyLink: 'https://skywardltd.com/',
    startDate: 'Jun 2021',
    endDate: 'Aug 2021',
  },
  {
    title: 'Software Development Intern',
    company: 'CoverMyMeds',
    description:
      'Created monitoring applications to observe production and development environments',
    stack: ['Python', 'HTML', 'JavaScript', 'Ruby on Rails', 'Agile'],
    companyLink: 'https://www.covermymeds.com/main/',
    startDate: 'Jun 2019',
    endDate: 'Aug 2019',
  },
]

const skills = [
  'Python', 
  'C++', 
  'C',
  'Java', 
  'TypeScript', 
  'Node.js',
  'Golang', 
  'Git', 
  'Bash', 
  'Linux', 
  'MySQL', 
  'MATLAB', 
  'PyTorch', 
  'CUDA', 
  'TensorRT', 
  'TensorFlow', 
  'API Development', 
  'Computer Vision', 
  'Docker', 
  'Algorithms', 
  'Data Structures', 
  'Federated Learning', 
  'Differential Privacy', 
  'Circuitry', 
  'CSG', 
  'LLMs', 
  'Math Logic'
]

const contact = {
  // email is optional - if left empty Contact section won't show up
  email: 'calvinkinateder@gmail.com',
  meeting: 'https://cal.com/calvin-kinateder-pj379i/30min',
}

const thesis = {
  title: 'A Novel Approach To Implementing Knowledge Distillation In Tsetlin Machines',
  link: 'https://drive.google.com/file/d/1H3Vv4RFBbQX8l7AghBGuidi_6qXoA4YN/view?usp=sharing',
  description: "The Tsetlin Machine (TM) is a propositional logic based model that uses conjunctive clauses to learn patterns from data. As with typical neural networks, the performance of a Tsetlin Machine is largely dependent on its parameter count, with a larger number of parameters producing higher accuracy but slower execution. Knowledge distillation in neural networks transfers information from an already-trained teacher model to a smaller student model to increase accuracy in the student without increasing execution time. We propose a novel approach to implementing knowledge distillation in Tsetlin Machines by utilizing the probability distributions of each output sample in the teacher to provide additional context to the student. Additionally, we propose a novel clause-transfer algorithm that weighs the importance of each clause in the teacher and initializes the student with only the most essential data. We find that our algorithm can significantly improve performance in the student model without negatively impacting latency in the tested domains of image recognition and text classification."
}

export { header, about, projects, experience, skills, contact, thesis }
