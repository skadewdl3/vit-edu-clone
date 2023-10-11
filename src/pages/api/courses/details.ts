import { Surreal } from 'surrealdb.js'

const db = new Surreal()
await db.connect('http://0.0.0.0:8000/rpc')
db.signin({
  user: 'root',
  pass: 'root',
  ns: 'test',
  db: 'test',
})
export async function GET({ params, request }) {
  let courseID = new URLSearchParams(request.url.split('?')[1]).get('courseID')
  try {
    let res = await db.query(
      `SELECT <-teaches<-teachers.name as teachers FROM courses:${courseID}`
    )
    return new Response(JSON.stringify(res), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  } catch (e) {
    return new Response(e.message, {
      status: 500,
    })
  }
}
