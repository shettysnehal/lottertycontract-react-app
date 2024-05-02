import React from 'react'
import '../App.css';
import imageSrc from '../image.jpeg';


export default function Animation(props) {
  return (
    <div className='animation'>
        <div className='intro'><p>
          Hello,i'm <strong>{props.address}</strong>.Welcome to my lottery hub.
          I am the manager of this contract and only i can pick the winner.
          There are currently {""} {props.players.length} people entered,competing to win{""} {props.balance} ether! May the odds be ever in your favour!!
      
        </p>
        </div>
        <div className='img.div'>
           <img  className="img" src={imageSrc}/>
        </div>
    </div>
  )
}


