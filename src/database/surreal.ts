import { Surreal } from 'surrealdb.js'

const db = new Surreal()
await db.connect('http://0.0.0.0:8000/rpc')
db.signin({
  user: import.meta.env.SURREAL_USER,
  pass: import.meta.env.SURREAL_PASS,
  ns: 'test',
  db: 'test',
})

export default db
