import { Surreal } from 'surrealdb.js'

const db = new Surreal()
await db.connect(`${import.meta.env.SURREAL_URL}/rpc`)
db.signin({
  user: import.meta.env.SURREAL_USER,
  pass: import.meta.env.SURREAL_PASS,
  ns: 'test',
  db: 'test',
})

export default db
