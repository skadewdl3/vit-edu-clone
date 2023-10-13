import db from '@database/surreal'
import { storage } from '@database/firebase-server'

export async function GET({ params, request }) {
  try {
    let res = await db.query('SELECT id, name, image, relevance FROM courses')
    let result = JSON.parse(JSON.stringify(res[0].result)) as Array<any>

    for (let course of result) {
      if (course.image) {
        let url = await storage
          .bucket(import.meta.env.FIREBASE_STORAGE_BUCKET)
          .file(course.image)
          .getSignedUrl({
            action: 'read',
            expires: '03-09-2491',
          })
        course.image = url[0]
      }
    }

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
