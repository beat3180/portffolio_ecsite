import { NextResponse } from 'next/server'
import { supabase } from '../../lib/supabaseClient'

export async function GET() {
  const { data, error } = await supabase
    .from('todos')
    .select('*')
    .not('title', 'is', null)
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
  return NextResponse.json(data)
}

export async function POST(request: Request) {
  const newTodo = await request.json()
  const { data, error } = await supabase
    .from('todos')
    .insert([newTodo])
    .select()
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
  return NextResponse.json(data[0])
}

export async function PUT(request: Request) {
  const updatedTodo = await request.json()
  const { error } = await supabase
    .from('todos')
    .update(updatedTodo)
    .eq('id', updatedTodo.id)
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
  return NextResponse.json({ success: true })
}

export async function DELETE(request: Request) {
  const { id } = await request.json()
  const { error } = await supabase.from('todos').delete().eq('id', id)
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
  return NextResponse.json({ success: true })
}
