import { storage } from '@database/firebase-server'
import db from '@database/surreal'

export async function GET({ params, request }) {
  let courseID = new URLSearchParams(request.url.split('?')[1]).get('courseID')
  try {
    let res = await db.query(
      `
      return {

      let $first_names = select <-teaches<-teachers.first_name as first_name from only courses:${courseID};
      let $last_names = select <-teaches<-teachers.last_name as last_name from only courses:${courseID};
      let $ids = select <-teaches<-teachers.id as id from only courses:${courseID};
      let $prefixes = select <-teaches<-teachers.prefix as prefix from only courses:${courseID};
      let $courseDetails = select * from only courses:${courseID};

      $first_names = $first_names.first_name;
      $ids = $ids.id;
      $last_names = $last_names.last_name;
      $prefixes = $prefixes.prefix;
      
      $details = {
        teachers: {
          first_names: $first_names,
          last_names: $last_names,
          ids: $ids,
          prefixes: $prefixes
        },
        course: $courseDetails
      };

      return $details;
      }
      `
    )

    // console.log(JSON.parse(JSON.stringify(res[0].result)))
    let result = JSON.parse(JSON.stringify(res[0].result))

    if (result.course.image) {
      let url = await storage
        .bucket(import.meta.env.FIREBASE_STORAGE_BUCKET)
        .file(result.course.image)
        .getSignedUrl({
          action: 'read',
          expires: '03-09-2491',
        })
      result.course.image = url[0]
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
