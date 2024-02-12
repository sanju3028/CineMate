
import { BG_URL } from '../utils/constants'

import React from 'react'
import { GptSearchBar } from './GptSearchBar'
import { GptMovieSuggestions } from './GptMovieSuggestions'

export const GptSearchPage = () => {
  return (
    <div className=''>
      <div className='fixed -z-10'>
        <img src = {BG_URL} alt = "logo"/>
      </div>
      <GptSearchBar/>
      <GptMovieSuggestions/>
    </div>
  )
}
