import React from 'react'
import login_logo from '../assets/Login_logo.png'
import withPrivate from '../hoc/withPrivate'

const Home = () => {
  return (
   <>
    <div className="ml-64">
      <div className=' h-screen flex justify-center items-center '>
      <div className='flex flex-col justify-center items-center'>
        <span><img src={login_logo} alt="" width={120} height={60}/></span>
        <p>Welcome to DigitalFlake Admin</p>
      </div>
    </div>
    </div>
   </>
  )
}

export default withPrivate(Home)