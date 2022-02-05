import React from 'react'
import { useParams } from 'react-router-dom'

import PlaceList from '../components/PlaceList'

export const DUMMY_PLACES = [
    {
        id: 'p1',
        title: 'Empire State Building',
        description: 'One of the most famous skyscrappers in the world!',
        imageURL: 'https://www.worldatlas.com/upload/62/89/67/shutterstock-432247444.jpg',
        address: '20 W 34th St, New York, NY 10001',
        creator: 'u1',
        location: {
            lat: 40.7484405,
            lng: -73.9856644
        }
    },

    {
        id: 'p2',
        title: 'New York Empire State',
        description: 'One of the most famous skyscrappers in the world!',
        imageURL: 'https://www.worldatlas.com/upload/62/89/67/shutterstock-432247444.jpg',
        address: '20 W 34th St, New York, NY 10001',
        creator: 'u2',
        location: {
            lat: 40.7484405,
            lng: -73.9856644
        }
    }
]

const UserPlaces = () => {
    const uid = useParams().userId // get property of param object
    const loadedPlaces = DUMMY_PLACES.filter(place => place.creator === uid)
    
    return (
        <PlaceList items={loadedPlaces}/>

    )
}

export default UserPlaces
