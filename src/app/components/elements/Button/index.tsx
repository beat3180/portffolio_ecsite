
import type { ButtonProps } from '../../../types'


const Button = ({ variant = 'primary', children, ...rest }: ButtonProps) => {
  let buttonClassName = 'button'

  switch (variant) {
    case 'primary':
      buttonClassName += ' button-primary'
      break
    case 'secondary':
      buttonClassName += ' button-secondary'
      break
    case 'danger':
      buttonClassName += ' button-danger'
      break
  }

  return (
    <button className={buttonClassName} {...rest}>
      {children}
    </button>
  )
}

export default Button
