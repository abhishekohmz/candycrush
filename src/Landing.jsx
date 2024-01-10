import React from 'react'
import { Link } from 'react-router-dom'
import './Landing.css'

function Landing() {
  return (
    <>

      <div className="landing">
        <div className="col">
        <div id='landing' className="container text-center">
            <img src="https://i.pinimg.com/originals/5b/27/71/5b27712520468fc37329a7fd84c2a31d.png" alt="" />
            <div className='d-flex justify-content-center'>
        <button id='start' className='btn btn-primary'>
            <Link to={'/home'} style={{textDecoration:'none',color:'white'}}>
            Lets Go
            </Link>
        </button>
        </div>
        </div>
        </div>
        
        </div>
        
       
    </>
  )
}

export default Landing