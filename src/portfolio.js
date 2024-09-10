const header = {
  // all the properties are optional - can be left empty or deleted
  homepage: 'https://calvinkinateder.com',
  title: 'CK.',
}

const about = {
  // all the properties are optional - can be left empty or deleted
  name: 'Calvin Kinateder',
  role: 'Software Developer',
  description:
    "I'm a computer science student and software developer focused on building applications that are perfectly designed from the inside out. No matter what I'm working on, my vision is for an equal focus on both the developer and the user. I'm currently pursuing my BS and MS in Computer Science at the University of Cincinnati, and I'll be graduating in May 2025.",
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
  },
  {
    name: 'blackswan-mvp',
    description:
      'Semi-HFT stock trading bot built around the FinnHub and Alpaca trading APIs',
    stack: ['Python', 'Sklearn', 'Docker'],
    sourceCode: 'https://ckinateder.github.io/blackswan-mvp/',
    livePreview: 'https://ckinateder.github.io/blackswan-mvp/',
  },
  {
    name: 'abraham',
    description:
      'Sentiment analysis Python package for news articles and Twitter',
    stack: ['Python', 'VADER', 'NLTK'],
    sourceCode: 'https://github.com/ckinateder/abraham',
    livePreview: 'https://ckinateder.github.io/abraham/',
  },
]

const experience = [
  // projects can be added an removed
  {
    title: 'Software Developer Co-op',
    company: 'Siemens',
    description:
      'Researched cutting-edge technologies via academic papers to explore how they could be used for profit',
    stack: ['Python', 'PyTorch', 'Tensorflow', 'Docker', 'Bash'],
    companyLink: 'https://www.siemens.com/',
    startDate: 'Jan 2022',
    endDate: 'Current',
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
  // skills can be added or removed
  // if there are no skills, Skills section won't show up
  'Python',
  'C++',
  'Java',
  'JavaScript',
  'HTML',
  'CSS',
  'Golang',
  'Git',
  'Bash',
  'Linux',
  'MySQL',
  'MATLAB',
  'API development',
  'TensorRT',
  'Tensorflow',
  'PyTorch',
  'Docker',
  'Algorithms',
  'Data Structures',
  'Federated Learning',
  'Differential Privacy',
]

const contact = {
  // email is optional - if left empty Contact section won't show up
  email: 'calvinkinateder@gmail.com',
}

export { header, about, projects, experience, skills, contact }
