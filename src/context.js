import React, { Component } from 'react'
import { useState } from 'react';
import items from './data'
import { useEffect } from 'react';
import client from './Contentful'


const RoomContext = React.createContext();

const RoomProvider = ({ children }) => {
    const [context, setContext] = useState({
        rooms: [],
        sortedRooms: [],
        featuredRooms: [],
        loading: true,
        getRoom: () => { },
        type: 'all',
        capacity: 1,
        price: 0,
        minPrice: 0,
        maxPrice: 0,
        minSize: 0,
        maxSize: 0,
        breakfast: false,
        pets: false,
       
    });

    const getAndSetData = async () => {
        try {
            let response = await client.getEntries({
                content_type: 'beachResortRoom',
                order: 'sys.createdAt'
            })

            let rooms = formatData(response.items)
            let featuredRooms = rooms.filter(room => room.featured === true)
            let maxPrice = Math.max(...rooms.map(item =>
                item.price))
            let maxSize = Math.max(...rooms.map(item =>
                item.size))
    
            const getRoom = (slug) => {
                let tempRooms = rooms
                const room = tempRooms.find((room) =>
                    room.slug === slug
                )
                return room
            }
    
            setContext({
                ...context,
                rooms, featuredRooms,
                sortedRooms: rooms,
                loading: false,
                getRoom,
                price: maxPrice,
                maxPrice, maxSize,
    
            })
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getAndSetData()
    }, [])

    const componentDidMount = () => {
         getAndSetData()
    //     let rooms = getData()
    //     console.log(rooms)
    //    // let rooms = formatData(data)
    //     let featuredRooms = rooms.filter(room => room.featured === true)
    //     let maxPrice = Math.max(...rooms.map(item =>
    //         item.price))
    //     let maxSize = Math.max(...rooms.map(item =>
    //         item.size))

    //     const getRoom = (slug) => {
    //         let tempRooms = rooms
    //         console.log(tempRooms)
    //         console.log('slug: ' + slug)
    //         const room = tempRooms.find((room) =>
    //             room.slug === slug
    //         )
    //         return room
    //     }

    //     setContext({
    //         ...context,
    //         rooms, featuredRooms,
    //         sortedRooms: rooms,
    //         loading: false,
    //         getRoom,
    //         price: maxPrice,
    //         maxPrice, maxSize,

    //     })
    }


    const formatData = (items) => {
        let tempItems = items.map(item => {
            let id = item.sys.id
            let images = item.fields.images.map(image => image.fields.file.url)

            let room = { ...item.fields, images: images, id }
            return room;
        })
        return tempItems
    }
    function handleChange(event) {
        const target = event.target;
        const value = event.type === "checkbox" ? target.checked : target.value;
        const name = event.target.name;
        setContext((prevState) => {
            return {
                ...prevState,
                [name]: value,
            };
        }, filterRooms()
        );

    }


    const filterRooms = () => {
        console.log('context pre assign', context)
        let {
            rooms, type, capacity, price, minSize, maxSize, breakfast, pets
        } = context

        let tempRooms = [...rooms]
        console.log('temprooms', tempRooms)
        if (type !== 'all') {
            tempRooms = tempRooms.filter(room => room.type === type)
        }
        // console.log('context pre assign', context)
        setContext((prevState) => {
            return ({
                ...prevState,
                sortedRooms: tempRooms
            })
        })
        console.log('hello')
    }


    return (
        <RoomContext.Provider value={{ context, setContext }}>
            {children}
        </RoomContext.Provider>
    )
}


const RoomConsumer = RoomContext.Consumer
export { RoomProvider, RoomContext }



// <RoomContext.provider value{}

// class RoomProvider extends Component {

//     state = {};
//     render() {
//         return (
//             <RoomContext.Provider value={'hello'}>
//                 {this.props.children}
//             </RoomContext.Provider>
//         )
//     }
// }

// const RoomConsumer = RoomContext.Consumer

// export{RoomConsumer,RoomProvider, RoomContext}


