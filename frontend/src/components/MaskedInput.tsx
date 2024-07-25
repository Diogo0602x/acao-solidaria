import React from 'react'
import { IMaskInput } from 'react-imask'

interface CustomProps {
  onChange: (event: { target: { name: string; value: string } }) => void
  name: string
  mask: string
}

const MaskedInput = React.forwardRef<HTMLElement, CustomProps>(
  function MaskedInput(props, ref) {
    const { onChange, mask, ...other } = props
    return (
      <IMaskInput
        {...other}
        mask={mask}
        inputRef={ref as React.Ref<HTMLInputElement>}
        onAccept={(value: any) =>
          onChange({ target: { name: props.name, value } })
        }
        overwrite
      />
    )
  },
)

export { MaskedInput }
