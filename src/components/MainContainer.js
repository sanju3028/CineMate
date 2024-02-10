


import React from 'react'
import { useSelector } from 'react-redux'
import { VideoTitle } from './VideoTitle'
import { VideoBackground } from './VideoBackground'

export const MainContainer = () => {
  
  const movies = useSelector(store => store.movies?.nowPlayingMovies)
  if(!movies) return //early return
  const mainMovie = movies[5]

  const {title, overview,id} = mainMovie
    return (
    <div>
     <VideoTitle title ={title} overview={overview}/>
     <VideoBackground movieId={id}/>



    </div>
  )
}
