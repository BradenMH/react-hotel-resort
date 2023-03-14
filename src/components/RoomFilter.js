import React, { useEffect } from 'react'
import { useContext } from 'react'
import { RoomContext } from '../context'
import Title from './Title'

const RoomFilter = ({ rooms }) => {
  const { context, setContext } = useContext(RoomContext)
  const { type, capacity, price, minPrice,
    maxPrice, minSize, maxSize, breakfast, pets } = context

  const getUnique = (items, value) => {
    if (!items) return []
    return [...new Set(items.map(item => item[value]))]
  }
  //get unique types
  let types = getUnique(rooms, 'type')
  // add all
  types = ['all', ...types]
  //map to jsx
  types = types.map((item, index) => {
    return <option value={item} key={index}>{item}</option>
  })

  let people = getUnique(rooms, 'capacity')
  people = people.map((item, index) => {
    return <option key={index} value={item}>{item}</option>
  })


  const handleChange = event => {
    const target = event.target
    const value = target.type === 'checkbox' ?
      target.checked : target.value
    const name = event.target.name


    setContext((prevState) => {
      return ({
        ...prevState,
        [name]: value
      })
    }
    )
  }


  const filterRooms = () => {

    let {
      rooms, type, capacity, price, minSize, maxSize, breakfast, pets
    } = context
    // all the rooms
    let tempRooms = [...rooms]
    //transform value
    capacity = parseInt(capacity)
    price = parseInt(price)

    //filter by type
    if (type !== 'all') {
      tempRooms = tempRooms.filter(room => room.type === type)
    }
    //filter by capacity
    if (capacity !== 1) {
      tempRooms = tempRooms.filter(room => room.capacity >= capacity)
    }
    //filter by price
    tempRooms = tempRooms.filter(room => room.price <= price)
    //filter by size
    tempRooms = tempRooms.filter(room => room.size >= minSize && room.size <= maxSize)
    //filter by breakdfast
    if(breakfast){
      tempRooms = tempRooms.filter(room => room.breakfast === true)
    }
    //filter by pets
    if(pets){
      tempRooms = tempRooms.filter(room => room.pets === true)
    }

    setContext((prevState) => {
      return ({
        ...prevState,
        sortedRooms: tempRooms
      })
    })

  }

  useEffect(() => {
    filterRooms()
  }, [type, capacity, price, pets, breakfast, minSize, maxSize])


  return (
    <section className='filterContainer'>
      <Title title='search Rooms' />
      <form className='filter-form'>
        {/* select type */}
        <div className='form-group'>
          <label htmlFor='type'>room type</label>
          <select
            name='type'
            id='type'
            value={type}
            className='form-control'
            onChange={handleChange}>
            {types}
          </select>
        </div>
        {/* endselect type */}
        {/* guests */}
        <div className='form-group'>
          <label htmlFor='capacity'>Guests</label>
          <select
            name='capacity'
            id='capacity'
            value={capacity}
            className='form-control'
            onChange={handleChange}>
            {people}
          </select>
        </div>
        {/* end guests */}
        {/* room price */}
        <div className='form-group'>
          <label htmlFor='price'>
            room price ${price}
          </label>
          <input type='range' name='price' min={minPrice} max={maxPrice}
            id='price' value={price} onChange={handleChange} className='form-control' />
        </div>
        {/* end price */}
        {/* size */}
        <div className='form-group'>
          <label htmlFor='size'>room size</label>
          <div className='size-inputs'>
            <div className='size-inputs'>
              <input
                type='number'
                name='minSize'
                id='size'
                value={minSize}
                onChange={handleChange}
                className='size-input' />
              <input
                type='number'
                name='maxSize'
                id='size'
                value={maxSize}
                onChange={handleChange}
                className='size-input' />
            </div>
          </div>
        </div>
        {/* end of size */}
        {/* extras */}
        <div className='form-group'>
          <div className='single-extra'>
            <input 
            type='checkbox' 
            name='breakfast' 
            id='breakfast' 
            checked={breakfast}
            onChange={handleChange}
            />
            <label htmlFor='breakfast'>breakfast</label>
          </div>
          <div className='single-extra'>
            <input 
            type='checkbox' 
            name='pets' 
            id='pets' 
            checked={pets}
            onChange={handleChange}
            />
            <label htmlFor='pets'>pets</label>
          </div>
        </div>

      </form>
    </section>
  )
}

export default RoomFilter