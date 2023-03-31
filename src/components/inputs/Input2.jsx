import React from 'react'
import './Input.css'

function Input2({label,placeholder,onchange,value,type,pattern,messge_err,vaild}) {
  return (
    <div className='input2_big_div'>
    <div className='cont_input'>
        <label htmlFor="">{label}</label>
        <input className='input_class2' type={type} style={{borderColor:vaild ==false? '#FF9494 ':'' }} pattern={pattern} value={value} onChange={onchange}  placeholder={placeholder} />
        <span class="underline"></span>
    </div>

    {!vaild &&
        <div style={{color:"#FF9494 "}}>{messge_err}</div>
      }  
    </div>
  )
}

export default Input2