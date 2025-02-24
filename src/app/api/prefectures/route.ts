import { NextResponse } from 'next/server'
import { supabase } from '../../lib/supabaseClient'

// 全都道府県データを取得
export async function GET() {
  const { data, error } = await supabase.from('prefectures').select('*')
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
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
            console.error(`画像取得エラー(${prefecture.name}):`)
          } else {
            imageUrl = storageData.publicUrl
          }
        } catch (error) {
          console.error(`画像取得エラー(${prefecture.name}):`, error)
        }
      }

      return { ...prefecture, image_url: imageUrl }
    }),
  )

  return NextResponse.json(prefecturesWithImages)
}

// 特定の都道府県データを取得
export async function POST(request: Request) {
  const { id } = await request.json()
  const { data, error } = await supabase
    .from('prefectures')
    .select('*')
    .eq('id', id)
    .single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
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

  return NextResponse.json({ ...data, image_url: imageUrl })
}
