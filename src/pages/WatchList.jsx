import React, { useState, useEffect } from 'react';
import { HiTrash } from 'react-icons/hi2';
import GlobalApi from '../services/GlobalApi';

export default function WatchList() {
    const [watchlist, setWatchlist] = useState([]);
    const [isGridView, setIsGridView] = useState(true);

    useEffect(() => {
        loadWatchlist();
    }, []);

    const loadWatchlist = () => {
        const list = GlobalApi.getWatchlist();
        setWatchlist(list);
    };

    const handleRemove = (movieId) => {
        GlobalApi.removeFromWatchlist(movieId);
        loadWatchlist();
    };

    return (
        <div className='p-8 px-8 md:px-16'>
            <div className='flex items-center justify-between'>
                <div>
                    <h1 className='text-4xl md:text-6xl font-semibold text-white'>WatchList</h1>
                    <p className='mt-6 text-xl md:text-2xl font-semibold text-gray-400'>
                        My Movies & Series ({watchlist.length})
                    </p>
                </div>
                <div className='flex gap-4'>
                    <button 
                        onClick={() => setIsGridView(true)}
                        className={`px-4 py-2 rounded ${isGridView ? 'bg-white text-black' : 'bg-gray-800 text-white'}`}
                    >
                        Grid
                    </button>
                    <button 
                        onClick={() => setIsGridView(false)}
                        className={`px-4 py-2 rounded ${!isGridView ? 'bg-white text-black' : 'bg-gray-800 text-white'}`}
                    >
                        List
                    </button>
                </div>
            </div>

            {watchlist.length === 0 ? (
                <div className='flex flex-col items-center justify-center mt-20 text-gray-400'>
                    <p className='text-xl'>Your watchlist is empty</p>
                    <p className='mt-2'>Add movies and series to keep track of what you want to watch</p>
                </div>
            ) : isGridView ? (
                <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 mt-8'>
                    {watchlist.map(item => (
                        <div key={item.id} className='relative group'>
                            <img 
                                src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                                alt={item.title || item.name}
                                className='w-full rounded-lg shadow-lg cursor-pointer transform transition-transform duration-200 group-hover:scale-105'
                            />
                            <button
                                onClick={() => handleRemove(item.id)}
                                className='absolute top-2 right-2 p-2 bg-black bg-opacity-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200'
                            >
                                <HiTrash className='text-white text-xl hover:text-red-500' />
                            </button>
                        </div>
                    ))}
                </div>
            ) : (
                <div className='mt-8 space-y-4'>
                    {watchlist.map(item => (
                        <div key={item.id} className='flex gap-4 bg-gray-800 rounded-lg p-4 group'>
                            <img 
                                src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                                alt={item.title || item.name}
                                className='w-24 h-36 object-cover rounded'
                            />
                            <div className='flex-1'>
                                <h3 className='text-xl font-semibold text-white'>
                                    {item.title || item.name}
                                </h3>
                                <p className='text-gray-400 mt-2'>
                                    {item.overview?.slice(0, 150)}...
                                </p>
                                <p className='text-gray-400 mt-2'>
                                    {new Date(item.release_date || item.first_air_date).getFullYear()}
                                </p>
                            </div>
                            <button
                                onClick={() => handleRemove(item.id)}
                                className='self-start p-2 hover:bg-gray-700 rounded'
                            >
                                <HiTrash className='text-gray-400 text-xl hover:text-red-500' />
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}