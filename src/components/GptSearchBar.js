

import React, { useRef } from 'react'
import lang from '../utils/LanguageConstants'
import { useDispatch, useSelector } from 'react-redux'
import openai from '../utils/openAI'
import { API_OPTIONS } from '../utils/constants'
import { addGptMovieResult } from '../utils/GptSlice'
 export const GptSearchBar = () => {
  const dispatch = useDispatch()
  const searchText = useRef(null)
  const langKey = useSelector(store => store.config.lang)

  const searchMovieTMDB = async (movie) => {
    const data = await fetch(
      "https://api.themoviedb.org/3/search/movie?query=" + movie + "&include_adult=false&language=en-US&page=1", API_OPTIONS
    )
      const json = await data.json()
    return json.results
  }
  const handleGptSearchClick = async()=>{
    const gptQuery = "Act as a Movie Recommendation System and suggest some movies for the query : " + searchText.current.value+ " . only give me names of 6 movies, comma seperated like the example result given ahead. Example Result: Gadar, Eagle, AquaMan, Sallar-Part1"
   const gptResults = await openai.chat.completions.create({
      messages: [{ role: 'user', content: gptQuery}],
      model: 'gpt-3.5-turbo',

      //now if we run directly we will get an error, because we are calling openai api from frontend side but it is not safe, we should call it in backend side. still if we wnt to allow that we should add a particular property to openai call function.
  })
const gptMovies = gptResults.choices?.[0]?.message?.content.split(",")

const promiseArray = gptMovies.map(movie => searchMovieTMDB(movie))

const tmdbResults = await Promise.all(promiseArray)

dispatch(addGptMovieResult({movieNames : gptMovies ,movieResults : tmdbResults}))


}
  return (
    <div className='pt-[20%] flex justify-center' onSubmit={(e)=>e.preventDefault()}>
        <form className='w-1/2 bg-black grid grid-cols-12'>
            <input  ref = {searchText} type="text" className='p-4 m-4 col-span-9' placeholder={lang[langKey].gptSearchPlaceHolder}/>
            <button className='col-span-3 m-4 py-2 px-4 bg-red-700 text-white rounded-lg '
            
            onClick={handleGptSearchClick}
            >{lang[langKey].search}</button>

        </form>





    </div>
  )
}
