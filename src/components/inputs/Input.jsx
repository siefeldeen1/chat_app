import React from 'react'
import './Input.css'

function Input({label,placeholder,onchange,value,type}) {
  return (
    <div className='cont_input'>
        <label htmlFor="" className="label_input">{label}</label>
        <input className='input_class' type={type} value={value} onChange={onchange}  placeholder={placeholder} />
    </div>
  )
}

export default Input