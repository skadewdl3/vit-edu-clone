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
  try {
    let res = await db.query('SELECT * FROM courses')
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
