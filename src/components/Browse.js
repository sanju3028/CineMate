import React from 'react'
import { Header } from './Header'
import useNowPlayingMovies from '../hooks/useNowPlayingMovies'
import { MainContainer } from './MainContainer'
import SecondaryContainer from './SecondaryContainer'
import usePopularMovies from '../hooks/UsePopularMovies'
import {  GptSearchPage } from './GptSearchPage'
import { useSelector } from 'react-redux'

export const Browse = () => {

  const showGptSearch = useSelector(store => store.gpt.showGptSearch)
//custom hook !!!

    useNowPlayingMovies()
     usePopularMovies()
  return (
    <div>
      <Header/>
    {
      showGptSearch ? (<GptSearchPage/>) : (
        <>
      <MainContainer/>
      <SecondaryContainer/>
      </>
      )
    }
   

    </div>
  )
}
