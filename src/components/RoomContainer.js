import React from 'react'
import RoomFilter from './RoomFilter'
import RoomList from './RoomList'
import { useContext } from 'react'
import Loading from './Loading'
import { RoomContext } from '../context'

const RoomContainer = () => {
  const {context} = useContext(RoomContext)
  const {loading, sortedRooms, rooms} = context

  console.log(context)
  if(loading){
    return <Loading/>
  }
  
  return (
    <div>
        <RoomFilter rooms={rooms}/>
        <RoomList rooms={sortedRooms}/>

    </div>
  )
}

export default RoomContainer