import React,{useState} from 'react';
import { Redirect } from 'react-router-dom';
import {Link} from 'react-router-dom'
import autent from './auth'
import axios from 'axios'
import jwt from 'jwt-simple'
import key from '../redux/token'


const LoginPage=()=>{

    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")
    const [err,seterr]= useState({emailerror:"",passworderror:""})

    const[loginerror,setloginerror]=useState("")
    const [loginstatus ,setloginstatus]=useState(false)


    if(autent.isLogin)
    {
      return <Redirect to="/admin"/>

    }




    // const login=async()=>{
  
  //   await axios.post('http://localhost:5000/user/login',{
  //     email:email,
  //     Password:password
  //   })
  //   .then((res)=>{  
  //     console.log(res.data)
      
  //     localStorage.setItem("logintoken",jwt.encode(res.data,key, 'HS512'))
  //     autent.isLogin=true
  //     autent.authenticate(()=>{
  //       setloginstatus(()=>({
  //         loginstatus:true
  //       }))
  //     })

  //   })
  // }






  const handlesubmit=async (e)=>{

    e.preventDefault();
    if(err.emailerror!=="" || err.passworderror!=="")
    {
      return false
    }

    //USE API OTHER WISE EXAMPLE GIVEN BELOW

    await axios.post('',{
      email:email,
      Password:password
    })
    .then((res)=>{
      
  

      if(res.data.isLogin)
      {
      localStorage.setItem("logintoken",jwt.encode(res.data,key, 'HS512'))
      autent.authenticate(()=>{
        setloginstatus(()=>({
          loginstatus:res.data.isLogin
        }))
      })
    }
    else{

      setloginerror(res.data.msg)
    }
    }).catch((err)=>{

        console.log(err)
    })
  
    // login()


  }

  const validEmailRegex = RegExp(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/);
  const valedation=(e)=>{
      const name=e.target.name
      const value=e.target.value
      let error=err
      switch(name){
        case "email":
           error.emailerror=validEmailRegex.test(value)?"":"Enter Valid Email"
           setemail(value)
           seterr(error)
        break;
        case "password":
          error.passworderror=value.length >=4 ? "":"Minimum 8 character"
          seterr(error)
          setpassword(value)
        break;
        default:
        break;
      }
  }

  if(loginstatus){

    return(<Redirect to='/admin' />)
  }



  return (
    <div>
      <p>{loginerror}</p>
      <span>Login Form</span>
      <form onSubmit={handlesubmit}>
   
        <span>Enter Email:-</span>
          <input type="email" value={email} name="email"
            onChange={(e)=>{valedation(e)}} 
            required
          />
          {err.emailerror.length===""?<span></span>:<span style={{color:"red"}}>{err.emailerror}</span> }
          
          <br/>
          <span>Enter password:- </span>

          <input type="text" value={password} name="password"
            onChange={(e)=>{valedation(e)}}
            required
          />
          {err.passworderror.length===""?<span></span>:<span style={{color:"red"}}>{err.passworderror}</span> }
          <br/>
          <input type="submit"/>
      </form>
      <Link to="/logout">Logout</Link>
    </div>
  );
}

export default LoginPage;
