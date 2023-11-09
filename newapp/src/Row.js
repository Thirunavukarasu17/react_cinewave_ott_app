import React, {useEffect, useState } from 'react'
import axios from './axios'
import "./Row.css"

const  Row= ({title,fetchUrl,cineWaveOriginals}) => {
    const [movies,setMovies]=useState([])

    const base_Url="https://image.tmdb.org/t/p/original/"

    useEffect(()=>{
        const fetchdata=async()=>{
            const request=await axios.get(fetchUrl);
            setMovies(request.data.results)
            return request;
        }
        fetchdata()
    },[fetchUrl])

    
  return (
    <div className='row'>
        <h2>{title}</h2>
        <div className= "row-posters">          
            {movies.map(movie=>
                (<img 
                    key={movie.id}
                    className={`row-poster ${cineWaveOriginals && "row-posterLarge"}`} 
                    
                    src={`${base_Url}${cineWaveOriginals?movie.poster_path:movie.backdrop_path}`}
                    alt={movie.name}/>)
            )}
        </div>
    </div>

  )
}

export default Row