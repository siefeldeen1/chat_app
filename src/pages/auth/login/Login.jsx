import React, { useState } from 'react'
import Input2 from '../../../components/inputs/Input2' 
import './Login.css'
import { FcGoogle } from 'react-icons/fc';
import { ImGoogle } from 'react-icons/im';
import { useNavigate } from "react-router-dom";
import Popup from '../../../components/popup/Popup';

function Login() {
  
    const navigate = useNavigate();
    const [Username, setUsername] = useState("")
    const [password, setpassword] = useState('')
    const [confrim_pass, setconfrim_pass] = useState('')
    const [pass_valid, setpass_valid] = useState(true)
    const [confri_vaild, setconfri_vaild] = useState(true)
    const [email_vaild, setemail_vaild] = useState(true)
    const [btn_vaild, setbtn_vaild] = useState(false)
    const [popup_error, setpopup_error] = useState(false)


    const change=()=>{
        if((email.includes('@'))&&(email.includes('.'))){
            setbtn_vaild(true)
           }else{
            setbtn_vaild(false)
           }
    }

    const submit = ()=>{
        if(Username.length < 2){
            setemail_vaild(false)
        }else if(password.length < 8){
        setpass_valid(false)
       } else {
    
        fetch(`${import.meta.env.Vite_URL}/login`,{
            method:"POST",
            headers:{"content-type":"application/json"},
            body:JSON.stringify({
                username:Username,
                password:password
            })
        }).then((res)=>{
           
            if(res.status ==200 ){
                navigate("/")
            }else{
                setpopup_error(true)
            }
        
        })
      }
    }
    
    const google= ()=>{
        window.open("http://localhost:8082/auth/google", "_self")
       }
    
    return (
      <div className='big_cont_background'> 
      {popup_error&&
         <Popup closepop={()=>{setpopup_error(false)}}/>
      }
       
      <div className='test_signup_body'>
          
          <form onSubmit={(e)=>{e.preventDefault();submit()}} className='form_class'>
          <div className='upper_part_signip_page'>
                  <button className='login_google'>
                      <div class="lock">
                          <FcGoogle size={23} class="icon-unlock"/> 
                          <ImGoogle size={23} color='white' class="icon-lock"/>
                      </div>
                      <div>Login with Google</div>
                  </button>
  
                  <div className='hr_sep_line_dev'>
                      <div className='hr_sep_line_text'>or</div>
                      <hr className='hr_sep_line' />
                  </div>
          </div>
        
                  <div className='input_class_signup_page'>
                  <Input2 value={Username} onchange={(e)=>{setUsername(e.target.value);change()}} vaild={email_vaild} label={"Username"} messge_err={"You can't leave this field empty"}  placeholder={"Please enter your Username"}   />
                    
                  
                      <div className='login_instead'>
                        <Input2 value={password} onchange={(e)=>{setpassword(e.target.value)}} vaild={pass_valid} messge_err={"Password has to be at least 8 characters"}  label={"Password"} placeholder={"Please enter your Password"} type={"password"}/>
                          <div className='text_under_pass'>
                               <div className='text_login_instead'>You don't have an account? <span className='span_text_login_instead' onClick={()=>{navigate("/SignUp")}}>sign up now for free</span></div>
                               <div className='text_forgetpass'>Forget password</div>
                          </div>
                        
                      </div>
                  </div>
  
              <div className='btn_cont_signup'>
                {/* <input type="submit" value={"submit"}  /> */}
                <button type="submit"  className='signup_btn_class' >Sign Up</button>
                </div>
          </form>
        
      </div>
  
      <div className='TEST_animation'>
          <div class="father-div">
              <div class="cat"></div>
              <div class="dog"></div>   
          </div>
      </div>
  
  </div>
    )
  
    }
  
  


export default Login