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
      `
      return {

      let $first_names = select <-teaches<-teachers.first_name as first_name from only courses:${courseID};
      let $last_names = select <-teaches<-teachers.last_name as last_name from only courses:${courseID};
      let $prefixes = select <-teaches<-teachers.prefix as prefix from only courses:${courseID};

      $first_names = $first_names.first_name;
      $last_names = $last_names.last_name;
      $prefixes = $prefixes.prefix;
      
      $names = {
        first_names: $first_names,
        last_names: $last_names,
        prefixes: $prefixes
      };

      return $names;
      }
      `
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
