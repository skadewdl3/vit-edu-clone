<script setup lang="ts">
import { ref } from 'vue'
import teachers from '@assets/data/teachers.json'
import courses from '@assets/data/courses-it.json'

// courses.forEach(course => {
//   console.log(course.)
// })

// console.log(teachers)
let queryString = 'BEGIN TRANSACTION;\n'

const createTeacherSting = (teacher: any) => {
  return `CREATE teachers:${teacher.id} SET
prefix = ${teacher.prefix ? `'${teacher.prefix}'` : 'NULL'},
first_name = '${teacher.first_name}',
middle_name = '${teacher.middle_name}',
last_name = '${teacher.last_name}',
qualifications = [${teacher.qualification.map((q) => `'${q}'`).join(', ')}],
specialization = [${teacher.specialization.map((q) => `'${q}'`).join(', ')}],
designation = '${teacher.designation}',
join_date = '${teacher.join_date}',
designated_date = ${teacher.designated_date ? `'${teacher.designated_date}'` : 'NULL'};  
  `}

const createCourseString = (course: any) => {
  return `
  \nCREATE courses:${course.id} SET
  name = '${course.title}',
  code = '${course.code}',
  relevance = ${course.relevance ? `'${course.relevance}'` : 'NULL'},
  objectives = ${course.objectives ? `'${course.objectives}'` : 'NULL'},
  outcomes = ${course.outcomes ? `'${course.outcomes}'` : 'NULL'},
  prerequisites = ${JSON.stringify(course.prerequisites)},
  credits = ${course.credits},
  teaching_scheme = ${JSON.stringify(course.teaching_scheme)},
  assesment_scheme = ${course.assesment_scheme ? JSON.stringify(course.assesment_scheme) : 'NULL'},
  sections = ${JSON.stringify(course.sections)},
  tutorials = ${course.tutorials ? JSON.stringify(course.tutorials) : 'NULL'},
  practicals = ${course.practicals ? JSON.stringify(course.practicals) : 'NULL'},
  group_discussion = ${course.group_discussion ? JSON.stringify(course.group_discussion) : 'NULL'},
  project = ${course.project ? JSON.stringify(course.project) : 'NULL'},
  seminar = ${course.seminar ? JSON.stringify(course.seminar) : 'NULL'},
  home_assignment = ${course.home_assignment ? JSON.stringify(course.home_assignment) : 'NULL'},
  textbooks = ${course.textbooks ? JSON.stringify(course.textbooks) : 'NULL'},
  reference_books = ${course.reference_books ? JSON.stringify(course.reference_books) : 'NULL'};\n
  `
}

const createTeachesString = (teacher: any) => {
  let str = ''
  for (let courseID of teacher.courseIDs) {
    str += `RELATE teachers:${teacher.id}->teaches->courses:${courseID};\n`
  } 
  return str
}
  
for (let teacher of teachers) {
  queryString +=  '\n\n' + createTeachesString(teacher)
}

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
  <textarea
    v-model="query"
    type="text"
    class="rounded border-2 border-solid border-blue-400 my-4 px-2 py-2 text-4xl"
  ></textarea>
  <br />
  <button
    class="px-4 py-2 bg-blue-400 active:-translate-y-1 rounded text-2xl"
    @click="execute"
  >
    Execute
  </button>
</template>

<style lang="stylus"></style>
