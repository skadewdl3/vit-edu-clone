import { Surreal } from 'surrealdb.js'

const db = new Surreal()
await db.connect('http://0.0.0.0:8000/rpc')
db.signin({
  user: 'root',
  pass: 'root',
  ns: 'test',
  db: 'test',
})

export async function POST({ params, request }) {
  try {
    let body = await request.json()
    let result = await db.query(body.query)
    console.log(result)
    return new Response(JSON.stringify(result), {
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
