import React from 'react'
import { Header } from './Header'
import useNowPlayingMovies from '../hooks/useNowPlayingMovies'
import { MainContainer } from './MainContainer'
import { SecondaryContainer } from './SecondaryContainer'

export const Browse = () => {
//custom hook !!!
    useNowPlayingMovies()

  return (
    <div>
      <Header/>
    {
      /**
       * Main Container
       *  -VideoBackground
       *  -videoTitle
       * SecondaryContainer
       *  -movielist*n
       *    -cards*n
       */
    }
    <MainContainer/>
    <SecondaryContainer/>


    </div>
  )
}
