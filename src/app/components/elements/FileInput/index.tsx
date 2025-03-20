import type { FileInputProps } from '../../../types'

const FileInput = ({ onChange, accept }: FileInputProps) => {
  return (
    <input
      type="file"
      onChange={onChange}
      accept={accept}
      className="file-input"
    />
  )
}

export default FileInput
