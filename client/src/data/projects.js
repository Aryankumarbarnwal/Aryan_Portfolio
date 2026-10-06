// ============================================================
//  PROJECTS (works with no backend at all)
//
//  To add a project, copy one block, paste it at the end of the
//  array and edit the text. A card is built for every object.
//
//  Fields:
//    title
//    description      SHORT (1 or 2 lines), shows on the card
//    longDescription  the full story, shows in the popup
//    tags             filter buttons are made from these, so spell them
//                     the same everywhere ("React", not "React" and "React.js")
//    github, live     links, leave '' to hide
//    image            cover image. Google Drive share links work as they are
//                     (file must be "Anyone with the link"). For best speed,
//                     put files in client/public/projects and use '/projects/name.png'
//    images           extra screenshots for the popup
// ============================================================
export const projects = [
  {
    id: 'onekart',
    title: 'OneK@rt',
    description: 'A full-stack e-commerce platform in the style of Flipkart and Amazon, with an admin panel.',
    longDescription:
      'I built OneK@rt while learning the MERN stack. I wanted to make something practical and close to a real-world application, so I decided to build an e-commerce platform similar to Flipkart or Amazon.\n\nI built it on my own in about a month. It helped me understand how a complete application works, from the frontend to the backend and admin control.',
    tags: ['React', 'Node.js', 'Express.js', 'MongoDB'],
    github: 'https://github.com/Aryankumarbarnwal/OneK-rt',
    live: 'https://one-k-rt-no-1-shopping-app.vercel.app/',
    image: '../vcart logo.png',
    images: [],
  },
  {
    id: 'school-management',
    title: 'School Management System',
    description: 'A MERN stack web app for managing school work in one place.', // TODO: edit
    longDescription: 'Write what this project does, the main features and what you learned.', // TODO: edit
    tags: ['React', 'Node.js', 'Express.js', 'MongoDB'],
    github: 'https://github.com/Aryankumarbarnwal/SchoolProject.git',
    live: 'https://school-project-baox.vercel.app/',
    image: '../SchoolImage2.png',
    images: ['../Screenshot 2025-12-11 145515 - Copy.png', '../Screenshot 2025-12-11 145541.png', '../Screenshot 2025-12-11 145550.png', '../Screenshot 2025-12-11 145637.png.png'],
  },
  {
    id: 'tsa-design-studio',
    title: 'TSA Design Studio',
    description: 'A responsive studio website built with React and Tailwind CSS.', // TODO: edit
    longDescription: 'Write what this project does, the main features and what you learned.', // TODO: edit
    tags: ['React', 'Tailwind CSS'],
    github: 'https://github.com/Aryankumarbarnwal/TSA-Design-Studio.git',
    live: 'https://tsa-design-studio.vercel.app/',
    image: '',
    images: [],
  },
  {
    id: 'sample-4',
    sample: true,
    title: 'Sustainable Cities and Communities',
    description: 'Cards fan in from different sides as you scroll.',
    longDescription: 'Longer description for the popup.',
    tags: ['React.js', 'Tailwind CSS'],
    github: 'https://github.com/Aryankumarbarnwal/IBM-Project.git',
    live: 'https://aryankumarbarnwal.github.io/IBM-Project/',
    image: '',
    images: [],
  },
];
