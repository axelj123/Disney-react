import React, { useState, useEffect } from 'react';
import { HiMagnifyingGlass } from "react-icons/hi2";
import { HiX } from "react-icons/hi";
import { Link } from 'react-router-dom'; 
import GlobalApi from '../services/GlobalApi';

function SearchModal({ isOpen, onClose }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const searchContent = async () => {
            if (searchTerm.trim() === '') {
                setResults([]);
                return;
            }

            setLoading(true);
            try {
                const response = await GlobalApi.searchMovies(searchTerm);
                setResults(response.data.results.filter(item => 
                    item.media_type === 'movie' || item.media_type === 'tv'
                ));
            } catch (error) {
                console.error('Error searching:', error);
            } finally {
                setLoading(false);
            }
        };

        const timeoutId = setTimeout(searchContent, 500);
        return () => clearTimeout(timeoutId);
    }, [searchTerm]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/90 z-50">
            <div className="container mx-auto px-4 pt-20">
                <div className="relative max-w-3xl mx-auto">
                    {/* Search Input */}
                    <div className="flex items-center bg-[#16181b] rounded-full p-4 mb-8">
                        <HiMagnifyingGlass className="w-6 h-6 text-gray-400" />
                        <input
                            type="text"
                            className="flex-1 bg-transparent text-white px-4 outline-none"
                            placeholder="Buscar películas y series..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            autoFocus
                        />
                        <button onClick={onClose} className="p-2">
                            <HiX className="w-6 h-6 text-gray-400 hover:text-white" />
                        </button>
                    </div>

                    {/* Results */}
                    <div className="max-h-[60vh] overflow-y-auto">
                        {loading ? (
                            <div className="text-white text-center">Buscando...</div>
                        ) : results.length > 0 ? (
                            <div className="grid gap-4">
                                {results.map((item) => (
                                    <Link 
                                        to={`/movie/${item.id}`} 
                                        key={item.id}
                                        className="flex items-start gap-4 bg-[#16181b] rounded-lg p-4 hover:bg-[#1f2123] transition-colors"
                                        onClick={onClose}
                                    >
                                        <img
                                            src={item.poster_path 
                                                ? `https://image.tmdb.org/t/p/w200${item.poster_path}`
                                                : 'https://via.placeholder.com/200x300'}
                                            alt={item.title || item.name}
                                            className="w-20 h-30 object-cover rounded"
                                        />
                                        <div>
                                            <h3 className="text-white font-medium text-lg">
                                                {item.title || item.name}
                                            </h3>
                                            <p className="text-gray-400 text-sm">
                                                {item.media_type === 'movie' ? 'Película' : 'Serie'}
                                                {item.release_date && ` • ${item.release_date.split('-')[0]}`}
                                                {item.first_air_date && ` • ${item.first_air_date.split('-')[0]}`}
                                            </p>
                                            <p className="text-gray-400 text-sm mt-2 line-clamp-2">
                                                {item.overview || 'No hay descripción disponible.'}
                                            </p>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        ) : searchTerm.trim() !== '' && (
                            <div className="text-white text-center">
                                No se encontraron resultados
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SearchModal;
