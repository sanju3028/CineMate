import { useDispatch, useSelector } from "react-redux"
import { API_OPTIONS } from "../utils/constants"
import { useEffect } from "react"
import { addNowPlayingMovies } from "../utils/moviesSlice"


//custom hook : fetching movies and storing data in store.

//here, when we are going to searcg gpt page and coming back to homepage, again content is loading and api calls made even though data is there in store, we should stop this. This is called memoization.
const useNowPlayingMovies = ()=>{
    const dispatch = useDispatch()

    const nowPlayingMovies = useSelector(store => store.movies.nowPlayingMovies)

  const getNowPlayingMovies = async ()=> {
    const data = await fetch("https://api.themoviedb.org/3/movie/now_playing?page=1",API_OPTIONS)
    const json = await data.json()
    
//api will be called two times because of react strict-mode(by default made by react in index.js but that too in local storage only, in production side, it happens only once.)

    dispatch(addNowPlayingMovies(json.results))
  }

  useEffect(()=>{
    !nowPlayingMovies && 
    getNowPlayingMovies();
  },[])
}
export default useNowPlayingMovies

//seperation of concern : everything responsible for only particular thing, readable, testable, modular etcc