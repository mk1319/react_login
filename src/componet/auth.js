import key from '../redux/token'

import jwt from 'jwt-simple'

//console.log(jwt.decode(localStorage.getItem("logintoken"),'mk@1313',true))


const checktoken=()=>{

  if(localStorage.getItem("logintoken")){

        return true
  
    }
  return false

}



const autent={
    isLogin:checktoken(),
    authenticate(cb)
    {
        this.isLogin=true
        setTimeout(cb,100)
    },
    singout(cb)
    {
      this.isLogin=false
      setTimeout(cb,100)
    }
  }


export default autent