import React, { useEffect, useState } from 'react'
import './Home.css'
import red from '../src/images/red.png'
import yellow from '../src/images/yellow.webp'
import purple from '../src/images/purple.png'
import green from '../src/images/green.png'
import orange from '../src/images/orange.webp'
import blue from '../src/images/blue.png'
import blank from '../src/images/blank.png'
import Score from './Score'
import { Link } from 'react-router-dom'


const width=8;
const CandyColors=[
    blue,
    red,
    purple,
    green,
    yellow,
    orange
]


const Home =()=> {

   
    const [color,setColor]=useState([])
    const [squareBeingDraggged,setSquareBeingDragged]=useState(null)
    const [squareBeingReplaced,setSquareBeingReplced]=useState(null)
    const [scoreDisplay,setScoredisplay]=useState(0  )

    const checkColumnOfFour=()=>{
        for(let i=0;i<=39;i++){
            const columnofFour=[i,i+width,i+width*2,i+width*3]
            const decidedcolor=color[i]
            const isBlank = color[i] === blank


            if(columnofFour.every(a=>color[a] === decidedcolor && !isBlank)){
                setScoredisplay((Score)=> Score+4)
                columnofFour.forEach(a=>color[a] = blank)
                return true;

            }
        }
    }

    const checkRowOfFour=()=>{
        for(let i=0;i<64;i++){
            const rowofFour=[i,i+1,i+2,i+3]
            const decidedcolor=color[i]
            const notvalid=[5,6,7,13,14,15,21,22,23,29,30,31,37,38,39,45,46,47,53,54,55,62,63,64]
            const isBlank = color[i] === blank

            if(notvalid.includes(i)) continue

            if(rowofFour.every(a=>color[a] === decidedcolor  && !isBlank)){
                setScoredisplay((Score)=> Score+4)

                rowofFour.forEach(a=>color[a] = blank)
                return true;
            }
        }
    }

    const checkColumnOfThree=()=>{
        for(let i=0;i<47;i++){
            const columnofthree=[i,i+width,i+width*2]
            const decidedcolor=color[i]
            const isBlank = color[i] === blank


            if(columnofthree.every(a=>color[a] === decidedcolor  && !isBlank)){
                setScoredisplay((Score)=> Score+3)

                columnofthree.forEach(a=>color[a] = blank)
               return true;
            }

        }
    }

    const checkRowOfThree=()=>{
        for(let i=0;i<64;i++){
            const rowofthree=[i,i+1,i+2]
            const decidedcolor=color[i]
            const notvalid=[6,7,14,15,22,23,30,31,38,39,46,47,54,55,63,64]
            const isBlank = color[i] === blank


            if(notvalid.includes(i)) continue

            if(rowofthree.every(a=>color[a] === decidedcolor  && !isBlank)){
                setScoredisplay((Score)=> Score+3)

                rowofthree.forEach(a=>color[a] = blank)
                
              return true;
            }
        }
    }


    const moveintotop=()=>{
        for(let i=0;i<=55;i++){

            const firstrow=[0,1,2,3,4,5,6,7]
            const isFirstrow=firstrow.includes(i)

            if(isFirstrow && color[i] === blank){
             let randomNumber=   Math.floor(Math.random()*CandyColors.length)
             color[i]=CandyColors[randomNumber]
            }
            if((color[i+width]) === blank){
                color[i+width]= color[i]
                color[i]=blank
            }
        }
    }

    console.log(scoreDisplay);

    const dragStart = (e)=>{
       
        setSquareBeingDragged(e.target)
    }

    const dragDrop = (e)=>{
      
        setSquareBeingReplced(e.target)
    }

    const dragEnd = ()=>{
       

        const dragingid= parseInt(squareBeingDraggged.getAttribute('data-id'))
        const replacingId=parseInt(squareBeingReplaced.getAttribute('data-id'))

        color[dragingid]=squareBeingReplaced.getAttribute('src')
        color[replacingId]=squareBeingDraggged.getAttribute('src')

       

        const validMoves=[
            dragingid - 1,
            dragingid - width,
            dragingid + 1,
            dragingid + width

        ]


        const validMove=validMoves.includes(replacingId)

        const isColumnOfFour = checkColumnOfFour()
        const isRowOFFour = checkRowOfFour()
        const isColumnOfThree = checkColumnOfThree()
        const isRowOfThree = checkRowOfThree()

        if(replacingId && validMove && (isRowOfThree || isColumnOfThree || isRowOFFour || isColumnOfFour) ){
            setSquareBeingDragged(null)
            setSquareBeingReplced(null)
        }
        else{
            color[dragingid]= squareBeingDraggged.getAttribute('src')
            color[replacingId] = squareBeingReplaced.getAttribute('src')
            setColor([...color])
        }

    }



    const Board=()=>{
        const arrangments=[]

        for(let i=0;i<width*width;i++){
            const randomColors= CandyColors[Math.floor(Math.random() * CandyColors.length)]
            arrangments.push(randomColors)
        }
        setColor(arrangments)


    }
   

    useEffect(()=>{
        Board()
    },[])

    useEffect(()=>{
        const timer=setInterval(()=>{
            checkColumnOfFour()
            checkRowOfFour()
            checkColumnOfThree()
            checkRowOfThree()
            moveintotop()

            setColor([...color])
            
        },150)

        return ()=>clearInterval(timer)
    },[checkColumnOfFour,checkRowOfFour,checkColumnOfThree,checkRowOfThree,moveintotop, color])

    // console.log(color);



  return (
    <>

    <div className="row">

        <div id='saga' className="col-4">
            <img src="https://th.bing.com/th/id/R.a84c3f13029edbb677f68f5714251a5f?rik=kDkxxYJ24yrBKA&riu=http%3a%2f%2fvignette2.wikia.nocookie.net%2fcandy-crush-saga%2fimages%2f5%2f56%2fTiffitransparency.png%2frevision%2flatest%3fcb%3d20150806040430&ehk=r1TQFYw%2bkLJYTxgY6H7kfyQi18YC28CTpAfqiSoLHwA%3d&risl=&pid=ImgRaw&r=0" alt="" />
        </div>
        <div id='col-4' className="col-4">
        <div className=" w-100 mt-5">
           
           <div className="game">
                {color.map((CandyColors, index) => (
                    <img className='img-fluid'
                    
                    key={index}
                    alt={CandyColors}
                    src={CandyColors}
                    data-id={index}
                    draggable={true}
                    onDragStart={dragStart}
                    onDragOver={(e)=>e.preventDefault()}
                    onDragEnter={(e)=>e.preventDefault()}
                    onDragLeave={(e)=>e.preventDefault()}
                    onDrop={dragDrop}
                    onDragEnd={dragEnd}
            
                    />
                ))}
            </div>
            


        </div>
        <div className='score'>
            <Score score={scoreDisplay}/>

            </div>
        </div>
        <div id='candy' className="col-4 d-flex  flex-column">
            <img src="https://i.pinimg.com/originals/5b/27/71/5b27712520468fc37329a7fd84c2a31d.png" alt="" />
<div className='d-flex justify-content-center mt-5'>
    <Link to={'/'} style={{textDecoration:'none'}}>
    <button id='exit' className='btn btn-danger d-flex justify-content-center'>exit</button>

    </Link>

</div>
        </div>
    </div>
        
            
    </>
  )
}

export default Home