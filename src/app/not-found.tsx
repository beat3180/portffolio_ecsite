import Link from 'next/link'
import Button from './components/elements/Button'
import './styles/notFound.css'

export default function NotFound() {
  return (
    <div className="not-found-container">
      <h2>ページが見つかりません</h2>
      <p>リクエストされたリソースが見つかりませんでした。</p>
      <Link href="/">
        <Button variant="primary">ホームに戻る</Button>
      </Link>
    </div>
  )
}
