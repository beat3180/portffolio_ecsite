import { supabase } from '../../../lib/supabaseClient'
import type { Prefecture } from '../types'

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
