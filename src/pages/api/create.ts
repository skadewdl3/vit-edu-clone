import db from '@database/surreal.ts'

export async function POST({ params, request }) {
  try {
    let body = await request.json()
    let result = await db.query(body.query)
    return new Response(JSON.stringify(result), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  } catch (e) {
    console.log(e)
    return new Response(e.message, {
      status: 500,
    })
  }
}
