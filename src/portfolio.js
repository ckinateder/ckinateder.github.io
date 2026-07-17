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

const publications = [
  {
    title: 'Distribution-Enhanced Knowledge Distillation',
    venue: 'Elsevier Neurocomputing',
    link: 'https://doi.org/10.1016/j.neucom.2026.133605',
    description:
      "The Tsetlin Machine (TM) is a framework that uses propositional logic to learn patterns from data by creating human-interpretable conjunctive clauses. Similar to neural networks, TM accuracy generally increases with model size, and larger clause sets lead to slower training and higher memory usage. Knowledge distillation (KD) is widely used in neural networks to transfer information from a large teacher model to a smaller student model, improving accuracy without increasing training time. Extending KD to Tsetlin Machines is not straightforward due to the absence of differentiable logits. Consequently, we propose Distribution-Enhanced Knowledge Distillation (DKD), a TM-based framework that adapts KD principles to TMs. DKD transfers knowledge through two mechanisms: (1) an intelligent clause-selection algorithm that identifies and initializes the student with the most informative teacher clauses, and (2) a probability-based distillation scheme that generates soft distributions from the teacher's unclamped class sums and incorporates them into the student's training feedback. Together, these components allow the student to learn higher-level decision patterns normally accessible only to a larger TM. Experiments on benchmark image and text datasets demonstrate that DKD consistently improves student accuracy while maintaining inference time when compared to a parametrically identical baseline. This approach effectively narrows the performance gap between teacher and student models, offering a practical path toward deploying compact and interpretable Tsetlin Machines in resource-constrained environments.",
  },
  {
    title:
      'A Novel Approach To Implementing Knowledge Distillation In Tsetlin Machines',
    venue: 'OhioLINK',
    link: 'http://rave.ohiolink.edu/etdc/view?acc_num=ucin174669975158939',
    description:
      'We introduce a novel knowledge distillation approach for Tsetlin Machines that probabilistically selects the most important clauses from a larger teacher model and transfers them to a smaller student. This method significantly improves student accuracy without increasing latency, as demonstrated on image recognition and text classification tasks.',
  },
]

export { header, about, projects, experience, skills, contact, publications }
