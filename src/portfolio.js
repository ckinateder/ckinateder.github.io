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
    'I\'m a computer science student and software developer focused on building applications that are perfectly designed from the inside out. Whether research or UX-oriented, my vision is that every project be equally end-user and developer oriented. I\'m currently pursuing a BS and MS in computer science at the University of Cincinnati.',
  resume: 'https://calvinkinateder.com',
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
    sourceCode: 'https://github.com/ckinateder/flower-dp',
    livePreview: 'https://github.com/ckinateder/flower-dp',
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
    name: 'Abraham',
    description:
      'Sentiment analysis Python package for news articles and Twitter',
    stack: ['Python', 'VADER', 'NLTK'],
    sourceCode: 'https://github.com/ckinateder/abraham',
    livePreview: 'https://ckinateder.github.io/abraham/',
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

export { header, about, projects, skills, contact }
