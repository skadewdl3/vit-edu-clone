import db from '@database/surreal'

export async function GET({ params }) {
  try {
    let courses = await db.query('SELECT * FROM person')
    let teachers = await db.query('SELECT * FROM teachers')

    return new Response(
      JSON.stringify({
        courses,
        teachers,
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
  } catch (e) {
    return new Response(e.message, {
      status: 500,
    })
  }
}
