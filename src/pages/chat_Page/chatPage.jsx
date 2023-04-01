import React, { useEffect, useState } from 'react'
import "./chat.css"
import logo from '../../img/real logo.png'
import pfp from '../../img/Profile_avatar_placeholder_large.png'
import { AiOutlineSearch } from 'react-icons/ai';
import { FaPaperPlane } from 'react-icons/fa';
import { SocketProvider } from 'socket.io-react';
import io from "socket.io-client";
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const socket = io.connect(`${import.meta.env.Vite_APP_URL}`);



function chatPage() {
    const navigate = useNavigate()
    const {id} = useParams()

    const [count, setcount] = useState(0)
    const [user_name, setuser_name] = useState('')
    const [user_list, setuser_list] = useState()
    const [user_id, setuser_id] = useState()
    useEffect(() => {
        const token = localStorage.getItem("token")
        // console.log(token);
        fetch(`${import.meta.env.Vite_APP_URL}/islogged`,{
            method:"post",
            headers:{"content-type":"application/json"},
            body:JSON.stringify({
                token:token,
            })
        }).then((res)=>res.json())
        .then((data)=>{setuser_name(data.user.name)
            // console.log("data2",data.user.id);
            setuser_id(data.user.id)
            socket.emit("user_connected",{id:data.user.id})
            fetch(`${import.meta.env.Vite_APP_URL}/users`)
            .then((res)=>res.json())
            .then((data2)=>{
                
                    // e => !data.includes(username)
                    var newArray = data2.filter(function (el)
                    {
                      return el.username != data.user.name 
                             
                    }
                    )
                    // console.log(newArray);
                    setuser_list(newArray)
            })
        })

       return()=>{
        socket.on('message', text2 => {
            const dev = document.createElement('div')
            dev.classList.add("recived_message")
            const el = document.createElement('dev');
            el.classList.add("recived_message_Inner")
            el.innerHTML = text2;
            dev.appendChild(el)
            document.querySelector('.chat_body').appendChild(dev)
        
        });
       }
  
  

    }, [])

   
            console.log(user_list);


    const send= ()=>{
        let text = document.querySelector('.message_imp').value;
        const dev = document.createElement('div')
        dev.classList.add("sent_message")
        const el = document.createElement('dev');
        el.classList.add("sent_message_Inner")
        el.innerHTML = text;
        dev.appendChild(el)
        document.querySelector('.chat_body').appendChild(dev)
    
        socket.emit('message', {message:text,from_id:user_id,to_id:id})
        
        document.querySelector('.message_imp').value = ""

    // fetch("http://localhost:8082/",{
    //     method:"POST",
    //     headers:{"content-type":"application/json"},
    //     body:JSON.stringify({
    //         message:text
            
    //     })
    // }).then((res)=>res.json())
    // .then((data)=>{
    //     if(data){
    //         console.log();
    //         alert("saved")
    //     }
    // })
}

  
    // socket.on('message', msg => console.log(msg));

const chatter=(e)=>{
    console.log(e.currentTarget.getAttribute("datatype"));
    const id = e.currentTarget.getAttribute("datatype")
    navigate(`/chat/${id}`)
}


    const activator= (e)=>{
        console.log(e.target);
      
        document.querySelectorAll(".nav_headers").forEach(ele => {
            ele.classList.remove("actibe_nav")
        });
        e.target.classList.add("actibe_nav")
    }


    const enter_clicked = (e)=>{
        if (e.keyCode === 13) {
            send()
          }
    }

  return (
    <div style={{width:"100%"}} > 

    <header className="header">
        <div className="logo">
            <img className='logo_img' src={logo} alt=""/>
            <div>Lightning</div> 
        </div>
      
        <div className='nav_dev'>
            <ul className="nav_cont">
                <li className="nav_headers" onClick={(e)=>{activator(e)}}>Home</li>
                <li className="nav_headers actibe_nav" onClick={(e)=>{activator(e)}}>Chat</li>
                <li className="nav_headers" onClick={(e)=>{activator(e)}}>Terms of use</li>
                <li className="nav_headers" onClick={(e)=>{activator(e)}}>About us</li>
            </ul>
        </div>
       

    </header>

   <div style={{padding:"0 20px",marginTop:"10px"}}>

            <div style={{display:"flex",alignItems:"end",justifyContent:"space-between",width:"100%"}}>
                        <div className='search_inp'>
                            <input className='input_its' type="text" placeholder='Search'/> 

                            <div >
                                <AiOutlineSearch style={{color:"#786D99",marginTop:"3px"}} size={24}/>
                            </div>
                        </div>
                        
                        <div style={{display:"flex",alignItems:"center",gap:'15px'}}>
                            <div className='action_btn'>CLEAR CHAT</div>
                            <div className='action_btn'>MORE</div>
                        </div>

                        
            </div>
            
            <div className='container_forchat'>
                    <div className='contact_cont'>
                            {/* <div className='contact_info'>
                                    <div><img style={{width:"50px",height:"50%",borderRadius:"50%"}} src={pfp} alt="" /></div>
                                    <div>{user_name}</div>
                            </div> */}

                            {user_list?.map((ele,i)=>{
                                console.log(ele["username"]);
                                return (
                                <div onClick={(e)=>{chatter(e)}} className='contact_info' key={i} datatype={ele["id"]}>
                                    <div><img  style={{width:"50px",height:"50%",borderRadius:"50%"}} src={pfp} alt="" /></div>
                                    <div>{ele["username"]}</div>
                                 </div>
                                 )
                            })
                            }

                    </div>

                    <div className='chat_page'>
                        <div className='chat_body'>
                                
                        </div>
                                <div className='lower_part_chat'>
                                            <div className='type_inp'>
                                                <input className='type message_imp' onKeyDown={(e)=>{enter_clicked(e)}} type="text" placeholder='Type a message'/> 
                                            </div>

                                            <button className='send_btn' onClick={()=>{send()}}><FaPaperPlane   color='white' size={23}/></button>
                                </div>
                    </div>

            </div>
   </div>

</div>

  )
}

export default chatPage