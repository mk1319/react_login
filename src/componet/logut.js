import React from 'react'
import { Redirect } from 'react-router-dom'

const logout=()=>{

    localStorage.clear()
    return <Redirect to='/'/>
}



const Logout=()=>{
    return (
        <div>
                <h1>Logout Page</h1>
                <button onClick={()=>logout()}>Logout</button>

        </div>
    )
}


export default Logout