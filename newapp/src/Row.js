import React, {useEffect, useState } from 'react'
import axios from './axios'
import YouTube from 'react-youtube'
import movieTrailer from "movie-trailer"
import "./Row.css"

const  Row= ({title,fetchUrl,cineWaveOriginals}) => {
    const [movies,setMovies]=useState([])
    const [trailerUrl,setTrailerUrl]=useState("")

    const base_Url="https://image.tmdb.org/t/p/original/"

    useEffect(()=>{
        const fetchdata=async()=>{
            const request=await axios.get(fetchUrl);
            setMovies(request.data.results)
            return request;
        }
        fetchdata()
    },[fetchUrl])

    const opts={
        height:"390",
        width:"100%",
        playerVars:{
            autoplay:1
        }
    }
    const handleClick=(movie)=>{
        if(trailerUrl){
            setTrailerUrl('')
        }else{
            movieTrailer(movie?.name||"")
            .then(url=>{
                const urlParams=new URLSearchParams(new URL(url).search)
                setTrailerUrl(urlParams.get("v"))
            })
            .catch((err)=>console.log(err))
        }
    }

  return (
    <div className='row'>
        <h2>{title}</h2>
        <div className= "row-posters">          
            {movies.map(movie=>
                (<img 
                    key={movie.id}
                    className={`row-poster ${cineWaveOriginals && "row-posterLarge"}`} 
                    onClick={()=>handleClick(movie)}
                    src={`${base_Url}${cineWaveOriginals?movie.poster_path:movie.backdrop_path}`}
                    alt={movie.name}/>)
            )}
        </div>
        {trailerUrl&&<YouTube videoId={trailerUrl} opts={opts}/>}
    
    </div>

  )
}

export default Row