// ============================================================
//  EDIT THIS FILE to change text on the site.
//  Replace every "your-username" / "your.email" placeholder.
// ============================================================
export const profile = {
  name: 'Aryan Kumar',
  nameLines: ['Aryan', 'Kumar'],

  // These words scramble one after another under the hero.
  roles: ['Software developer', 'MERN stack developer', 'Java problem solver', 'Quick learner'],

  intro:
    'Fresh B.Tech CSE graduate ready to start a career in software development. I build with MERN and solve problems in Java, and I am happy to pick up whatever skills a team needs.',

  resume:
    '../public/Aryan_Kumar_MERN.pdf',
  email: 'aryanbarnwal01@gmail.com', // TODO
  github: 'https://github.com/Aryankumarbarnwal', // TODO
  linkedin: 'https://www.linkedin.com/in/aryan-barnwal-124781303', // TODO
  leetcode: 'https://leetcode.com/Aryankr012345', // optional, e.g. https://leetcode.com/u/your-username

  stats: [
    { value: '5 months', label: 'of internships' },
    { value: '350+', label: 'LeetCode problems, solved in Java' },
    { value: 'MERN + Tailwind', label: 'my main stack' },
  ],

  aboutHeading: 'Fresh out of college and ready to ship.',
  about:
    'I finished my B.Tech in Computer Science and spent five months in internships: two as a full stack developer at BharatCrest, two as a frontend developer on the IBM SkillsBuild program, and one on the IBM SkillsBuild Agentic AI track. I chose full stack to get into software development. If a team needs me to work on something else, I am ready to learn it.',

  // Newest first or oldest first, your choice.
  experience: [
    {
      role: 'Full stack developer intern',
      org: 'BharatCrest',
      duration: '2 months',
      note: 'Worked across the frontend and backend of web applications.', // TODO: add what you built
    },
    {
      role: 'Frontend developer intern',
      org: 'IBM SkillsBuild',
      duration: '2 months',
      note: 'Built user interfaces as part of the skills based program.', // TODO
    },
    {
      role: 'Agentic AI intern',
      org: 'IBM SkillsBuild',
      duration: '1 month',
      note: 'Got hands-on exposure to agentic AI concepts and tools.', // TODO
    },
    {
      role: 'Freelancer',
      org: 'Averiq Solution',
      duration: '1 month',
      note: 'Built Projects', // TODO
    }
  ],

  // level: main | comfortable | core | basics
  skills: [
    { name: 'React', group: 'Building', level: 'main' },
    { name: 'Node.js', group: 'Building', level: 'main' },
    { name: 'Express', group: 'Building', level: 'main' },
    { name: 'MongoDB', group: 'Building', level: 'main' },
    { name: 'Tailwind CSS', group: 'Building', level: 'main' },
    { name: 'JavaScript', group: 'Building', level: 'comfortable' },
    { name: 'Java', group: 'Problem solving', level: 'comfortable' },
    { name: 'DSA', group: 'Problem solving', level: 'comfortable' },
    { name: 'LeetCode', group: 'Problem solving', level: 'comfortable' },
    { name: 'Python', group: 'Still learning', level: 'core' },
    { name: 'CS fundamentals', group: 'Still learning', level: 'core' },
    { name: 'Agentic AI', group: 'Still learning', level: 'basics' },
  ],
};

export const levelLabels = {
  main: 'Main stack',
  comfortable: 'Comfortable',
  core: 'Core concepts',
  basics: 'Basics from my internship',
};
