<script setup lang="ts">
import { ref } from 'vue'
import teachers from '@assets/data/teachers.json'
import courses from '@assets/data/courses-ty.json'
import oldCourses from '@assets/data/courses-it.json'

// courses.forEach(course => {
//   course.
// })

let queryString = 'BEGIN TRANSACTION;\n'

const createTeacherString = (teacher: any) => {
  return `UPDATE teachers:${teacher.id} SET
prefix = ${teacher.prefix ? `'${teacher.prefix}'` : 'NULL'},
first_name = '${teacher.first_name}',
middle_name = '${teacher.middle_name}',
last_name = '${teacher.last_name}',
qualifications = ${JSON.stringify(teacher.qualifications)},
specialization = ${JSON.stringify(teacher.specialization)},
designation = '${teacher.designation}',
join_date = '${teacher.join_date}',
designated_date = ${teacher.designated_date ? `'${teacher.designated_date}'` : 'NULL'};  
  `}

const createCourseString = (course: any) => {
  return `
  \n\nCREATE courses:${course.id} SET
  name = "${course.title}",
  code = "${course.code}",
  relevance = ${course.relevance ? `"${course.relevance}"` : 'NULL'},
  objectives = ${course.objectives ? `"${course.objectives}"` : 'NULL'},
  outcomes = ${course.outcomes ? `"${course.outcomes}"` : 'NULL'},
  prerequisites = ${JSON.stringify(course.prerequisites)},
  credits = ${course.credits},
  teaching_scheme = ${JSON.stringify(course.teaching_scheme)},
  assessment_scheme = ${course.assessment_scheme ? JSON.stringify(course.assessment_scheme) : 'NULL'},
  sections = ${JSON.stringify(course.sections)},
  tutorials = ${course.tutorials ? JSON.stringify(course.tutorials) : 'NULL'},
  practicals = ${course.practicals ? JSON.stringify(course.practicals) : 'NULL'},
  group_discussion = ${course.group_discussion ? JSON.stringify(course.group_discussion) : 'NULL'},
  project = ${course.project ? JSON.stringify(course.project) : 'NULL'},
  seminar = ${course.seminar ? JSON.stringify(course.seminar) : 'NULL'},
  home_assignment = ${course.home_assignment ? JSON.stringify(course.home_assignment) : 'NULL'},
  textbooks = ${course.textbooks ? JSON.stringify(course.textbooks) : 'NULL'},
  reference_books = ${course.reference_books ? JSON.stringify(course.reference_books) : 'NULL'};\n\n
  `
}

const updateCourseString = (course: any) => {
  return `
  \n UPDATE courses:${course.id} SET
  
  assesment_scheme = NONE;
 \n
  `
}

const createTeachesString = (teacher: any) => {
  let str = ''
  for (let courseID of teacher.courseIDs) {
    str += `RELATE teachers:${teacher.id}->teaches->courses:${courseID};\n`
  } 
  return str
}
  
// for (let course of courses) {
//   queryString +=  '\n\n' + createTeachesString(course)
// }

queryString += createCourseString(oldCourses.find(course => course.id == 'edai'))

queryString += '\nCOMMIT TRANSACTION;'

const query = ref(queryString)
const execute = async () => {
  let res = await fetch('/api/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query: query.value }),
  })
  let body = await res.json()
  console.log(body)
}
</script>

<template>
  <div class="z-10">
    <textarea
      v-model="query"
      type="text"
      class="rounded border-2 border-solid border-blue-400 my-4 px-2 py-2 text-2xl"
    ></textarea>
    <br />
    <button
      class="px-4 py-2 bg-blue-400 active:-translate-y-1 rounded text-2xl"
      @click="execute"
    >
      Execute
    </button>
  </div>
</template>

<style lang="stylus"></style>
