import React from 'react'
import './Score.css'

function Score({score}) {
  return (
    <div className='display d-flex justify-content-center'>
       <p> <span>Score:</span><h1>{score}</h1></p>
    </div>
  )
}

export default Score