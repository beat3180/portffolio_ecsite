import Image from 'next/image'
import loadingImg from '../../../images/loading.gif'

const Loading = () => {
  return (
    <div className="loading-container">
      <Image
        src={loadingImg}
        alt="Loading..."
        width={100}
        height={100}
        style={{
          maxWidth: '200px',
          maxHeight: '200px',
        }}
      />
    </div>
  )
}

export default Loading
