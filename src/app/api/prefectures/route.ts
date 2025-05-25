import { NextResponse } from 'next/server'
import { supabase } from '../../lib/supabaseClient'
import type { Prefecture } from '../../types/prefectures'

// 画像URLを取得する関数
function getImageUrl(prefecture: Prefecture) {
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

  return imageUrl
}

// 全都道府県データを取得
export async function GET() {
  const { data, error } = await supabase.from('prefectures').select('*')
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  const prefecturesData = await Promise.all(
    (data ?? [])
      .sort((a, b) => a.id - b.id)
      .map(async (prefecture) => {
        const imageUrl = await getImageUrl(prefecture)
        return { ...prefecture, image_url: imageUrl }
      }),
  )

  return NextResponse.json(prefecturesData)
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

  const imageUrl = await getImageUrl(data)

  return NextResponse.json({ ...data, image_url: imageUrl })
}

// 都道府県データを更新
export async function PUT(request: Request) {
  const updatedPrefecture = await request.json()
  const { id, name, region, capital, area, population } = updatedPrefecture

  const { error } = await supabase
    .from('prefectures')
    .update({ name, region, capital, area, population })
    .eq('id', id)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}
