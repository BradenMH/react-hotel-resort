import React from 'react'
import { RoomContext } from '../context'
import { useContext } from 'react'
import Loading from './Loading'
import Room from './Room'
import Title from './Title'


const FeaturedRooms = () => {
    const {context} = useContext(RoomContext)
    const {loading ,featuredRooms} = context
    console.log(featuredRooms)

    const rooms = featuredRooms.map(room => {
        return <Room key={room.id} room={room}/>
    })
    return (
        <section className='featured-rooms'>
            <Title title={'featured rooms'}/>
            <div className='featured-rooms-center'>
            {loading? <Loading/>:rooms}
            </div>
        </section>
    )
}

export default FeaturedRooms