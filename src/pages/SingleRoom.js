import React from 'react'
import { useContext } from 'react'
import Banner from '../components/Banner'
import Hero from '../components/Hero'
import defaultBcg from '../images/room-1.jpeg'
import { Link, useParams } from 'react-router-dom'
import { RoomContext } from '../context'
import { useState } from 'react'
import StyledHero from '../components/StyledHero'

const SingleRoom = () => {
  const { slug } = useParams()
  const [state, setState] = useState({

  })

  const {context} = useContext(RoomContext)

  //const {getRoom} = context
  
  //console.log('slug '+slug)
  const room = context.getRoom(slug)

  if (!room) {
    return <div className='error'>
      <h3>no such room could be found...</h3>
      <Link to='/rooms' className='btn-primary'>
        back to rooms
      </Link>
    </div>
  }
  const { name, description, capacity, size, price, extras, pets, images, breakfast } = room
  const [mainImg, ...defaultImg] = images
  return (
    <>
      <StyledHero img={mainImg || defaultBcg}>
        <Banner title={`${name} room`}>
          <Link to='/rooms' className='btn-primary'>
            Back to rooms
          </Link>
        </Banner>
      </StyledHero>
      <section className='single-room'>
        <div className='single-room-images'>
          {defaultImg.map((item, index) => {
            return <img key={index} src={item} alt={name} />
          })}
        </div>
        <div className='single-room-info'>
          <article className='desc'>
            <h3>details</h3>
            <p>{description}</p>
          </article>
          <article className='info'>
            <h3>info</h3>
            <h6>price : ${price}</h6>
            <h6>size : ${size} SQFT</h6>
            <h6>
              max capacity : {''}
              {capacity > 1 ? `${capacity} people` : `${capacity} person`}
            </h6>
            <h6>{pets ? 'pets allowed' : 'no pets allowed'}</h6>
            <h6>{breakfast && 'free breakfast included'}</h6>
          </article>
        </div>
      </section>
      <section className='room-extras'>
        <h6>extras</h6>
        <ul className='extras'>
          {extras.map((item, index) =>{
            return <li key={index}>- {item}</li>
          })}
        </ul>
      </section>
    </>
  )
}

export default SingleRoom
