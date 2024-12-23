import { supabase } from '../../../lib/supabaseClient'
import type { Prefecture } from '../types'


// 特定のIDでデータを取得
export const fetchPrefectureById = async (
  id: number,
): Promise<{
  data: Prefecture | null
  error: unknown
}> => {
  try {
    const { data, error } = await supabase
      .from('prefectures')
      .select('*')
      .eq('id', id)
      .single()

    if (error) {
      return { data: null, error }
    }

    let imageUrl = null
    const imagePath = `${data.image_url}.png`

    if (imagePath) {
      try {
        const { data: storageData } = supabase.storage
          .from('prefectures')
          .getPublicUrl(imagePath)

        if (!storageData.publicUrl) {
          console.error(`画像取得エラー(${data.name}):`)
        } else {
          imageUrl = storageData.publicUrl
        }
      } catch (error) {
        console.error(`画像取得エラー(${data.name}):`, error)
      }
    }

    return { data: { ...data, image_url: imageUrl }, error: null }
  } catch (error) {
    return { data: null, error }
  }
}


//　全データ取得
export const fetchPrefectures = async (): Promise<{
  data: Prefecture[] | null
  error: unknown
}> => {
  try {
    const { data, error } = await supabase.from('prefectures').select('*')

    if (error) {
      return { data: null, error }
    }

    const prefecturesWithImages = await Promise.all(
      (data ?? []).map(async (prefecture) => {
        const imagePath = `${prefecture.image_url}.png`
        let imageUrl = null

        if (imagePath) {
          try {
            const { data: storageData } = supabase.storage
              .from('prefectures')
              .getPublicUrl(imagePath)

            if (!storageData.publicUrl) {
              console.error(
                `画像取得エラー(${prefecture.name}):`
              )
            } else {
              imageUrl = storageData.publicUrl
            }
          } catch (error) {
            console.error(`画像取得エラー(${prefecture.name}):`, error)
            // エラーが発生しても処理を続行する
          }
        }

        return { ...prefecture, image_url: imageUrl }
      }),
    )

    return { data: prefecturesWithImages ?? [], error: null }
  } catch (error) {
    return { data: null, error }
  }
}
