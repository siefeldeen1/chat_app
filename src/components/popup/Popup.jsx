import React from 'react'
import './Popup.css'
import { IoWarningOutline } from 'react-icons/io5';


function Popup(props) {
  return (
    <div className='popup_background'>
        <div className='popup_body'>
                <IoWarningOutline size={75} color="#B33A3A" />
                <div className='title_sub_dev_popup'>
                    <div className='main_warning_popup'>Email or Password is incorrect</div>
                    <div className='mini_title_popup'>Please, try again </div>
                </div>
                <button className='btn_popup' onClick={()=>{props.closepop()}}>Try again</button>
        </div>
    </div>
  )
}

export default Popup