import variables from '../stylus/variables.json'
import metadata from './metadata.json'
import type { MenuSection } from '@typing/menu'

export const getVariable = varName => {
  if (varName in variables) {
    return variables[varName]
  }
  return null
}

export const getMetadata = pathName => {
  if (pathName in metadata) {
    return metadata[pathName]
  }
  return metadata['/']
}

export const pascalize = s => {
  let str = s.replace(/-./g, x => x[1].toUpperCase())
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export const evilDOMHack = (callback, timeout = 0) => {
  setTimeout(() => {
    callback()
  }, timeout)
}

export const sections: MenuSection[] = [
  {
    name: 'Academics',
    id: 'academics.webp',
    sections: [
      {
        name: 'Courses',
        description: 'Learning at VIT breaks the boundaries of the classroom.',
        // sections: [
        //   {
        //     name: 'Second Year',
        //     route: '/academics/courses/sy',
        //   },
        //   {
        //     name: 'Third Year',
        //     route: '/academics/courses/sy',
        //   },
        //   {
        //     name: 'Final Year',
        //     route: '/academics/courses/btech',
        //   },
        // ],
        route: '/academics/courses',
      },
      {
        name: 'Syllabus',
        route: '/academics/syllabus',
      },

      {
        name: 'Timetable',
        sections: [
          {
            name: 'Second Year',
            route: '/academics/timetable/sy',
          },
          {
            name: 'Third Year',
            route: '/academics/timetable/ty',
          },
          {
            name: 'Final Year',
            route: '/academics/timetable/btech',
          },
        ],
      },
      {
        name: 'Calendar',
        sections: [
          {
            name: 'Academic Calendar',
            route: '/academics/calendar/academic',
          },
          {
            name: 'Examination Calendar',
            route: '/academics/calendar/examination',
          },
          {
            name: 'Holidays',
            route: '/academics/calendar/holidays',
          },
        ],
      },
    ],
  },
  {
    name: 'Placements',
    id: 'placements.jpg',
    sections: [
      {
        name: 'Placement Statistics',
        route: '/placements/statistics',
      },
      {
        name: 'Recruiters',
        route: '/placements/recruiters',
      },
      {
        name: "MOU's",
        route: '/placements/mous',
      },
      {
        name: 'Enterpreneurs',
        route: '/placements/enterpreneurs',
      },
      {
        name: 'Higher Studies',
        route: '/placements/higher-studies',
      },
    ],
  },
  {
    name: 'Innovation',
    id: 'innovation',
    sections: [
      {
        name: 'Research Grants',
        route: '/innovation/grants',
      },
      {
        name: 'Patents',
        route: '/innovation/patents',
      },
      {
        name: 'Faculty Research',
        route: '/innovation/faculty',
      },
      {
        name: 'Student Innovation',
        route: '/innovation/student',
      },
    ],
  },
  {
    name: 'In Focus',
    id: 'in-focus',
    sections: [
      {
        name: 'Student Clubs',
        route: '/in-focus/clubs',
      },
      {
        name: 'Stellar Achievements',
        route: '/in-focus/achievements',
      },
      {
        name: 'Alumni',
        route: '/in-focus/alumni',
      },
    ],
  },
  {
    name: 'News',
    id: 'news',
    sections: [
      {
        name: 'IT Vishwa',
        route: '/news/bulletin',
      },
      {
        name: 'Events',
        route: '/news/events',
      },
    ],
  },
]
