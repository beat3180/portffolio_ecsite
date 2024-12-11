import type { TextFieldProps } from '../../../types'



const TextField = ({ value, onChange, placeholder }: TextFieldProps) => {
  return (
    <input
      type="text"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  )
}

export default TextField
