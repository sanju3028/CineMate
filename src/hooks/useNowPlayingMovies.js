import { useDispatch } from "react-redux"
import { API_OPTIONS } from "../utils/constants"
import { useEffect } from "react"
import { addNowPlayingMovies } from "../utils/moviesSlice"


//custom hook : fetching movies and storing data in store.
const useNowPlayingMovies = ()=>{
    const dispatch = useDispatch()
  const getNowPlayingMovies = async ()=> {
    const data = await fetch("https://api.themoviedb.org/3/movie/now_playing?page=1",API_OPTIONS)
    const json = await data.json()
    console.log(json.results)
//api will be called two times because of react strict-mode(by default made by react in index.js but that too in local storage only, in production side, it happens only once.)

    dispatch(addNowPlayingMovies(json.results))
  }

  useEffect(()=>{
    getNowPlayingMovies();
  },[])
}
export default useNowPlayingMovies