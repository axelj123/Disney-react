import React from 'react'
import disney from './../assets/img/disney.png'
import marvel from './../assets/img/marvel.png'
import nationalG from './../assets/img/nationalG.png'
import pixar from './../assets/img/pixar.png'
import starwar from './../assets/img/starwar.png'

import disneyV from './../assets/videos/disney.mp4'
import marvelV from './../assets/videos/marvel.mp4'
import nationalGV from './../assets/videos/national-geographic.mp4'
import pixarV from './../assets/videos/pixar.mp4'
import starwarV from './../assets/videos/star-wars.mp4'





function ProductionHouse() {
    const ProductionHouselist = [
        {
            id: 1,
            image: disney,
            video: disneyV
        },
        {
            id: 2,
            image: pixar,
            video: pixarV
        },
        {
            id: 3,
            image: marvel,
            video: marvelV
        },
        {
            id: 4,
            image: starwar,
            video: starwarV
        },
        {
            id: 5,
            image: nationalG,
            video: nationalGV,
        }
    ]
    return (
        <div className='flex gap-2 md:gap-5 p-2 px-5 md:px-16'>
            {ProductionHouselist.map((item) => (
                <div className='relative border-[2px] border-gray-600
                rounded-lg hover:scale-105 transition-all duration-300 ease-in-out 
                cursor-pointer shadow-xl shadow-gray-800'>
                    <video src={item.video}
                        autoPlay loop playsInline className='absolute w-full h-full object-cover
                     top-0 rounded-md 
                    z-0 opacity-0 hover:opacity-50'/>
                    <img src={item.image} className='w-full z-[1]' />

                </div>
            ))}
        </div>
    )
}

export default ProductionHouse