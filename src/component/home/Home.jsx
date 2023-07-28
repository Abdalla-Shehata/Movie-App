import React, { useState } from 'react'
import axios from 'axios'
import { useEffect } from 'react'
import style from './home.module.css'

export default function Home() {

  let [moviesArr, setMoviesArr] = useState([])
  let [tvsArr, settvsArr] = useState([])
  let [peopleArr, setpeopleArr] = useState([])
  const imgSrc = 'https://image.tmdb.org/t/p/w500';

  async function getMovies(mediatype, callback) {
    let { data } = await axios.get(`https://api.themoviedb.org/3/trending/${mediatype}/day?api_key=ad5b8a40f505d647529a35d8a53e24fd`)
    console.log(data.results);
    callback(data.results.slice(0,10))
  }
  // api 
  useEffect(() => {
    getMovies('movie', setMoviesArr)
    getMovies('tv', settvsArr)
    getMovies('person', setpeopleArr)

  }, [])

  return (
    <div>
      <div className="row align-items-center">
       <div className="col-md-4">
        <div className={style.brd_top}></div>
        <h2 className='my-2'>trending <br /> movies <br /> to watch now</h2>
        <p className='text-muted'>Lorem ipsum dolor sit.</p>
        <div className={style.brd_bottom}></div>
       </div>
       {moviesArr.map((ele,index)=> <div key={index} className="col-md-2">
          <img className='w-100' src={imgSrc + ele.poster_path} alt="" />
          <p>{ele.title}</p>
        </div>)}

      </div>
      <div className="row align-items-center">
       <div className="col-md-4">
        <div className={style.brd_top}></div>
        <h2 className='my-2'>trending <br /> tv <br /> to watch now</h2>
        <p className='text-muted'>Lorem ipsum dolor sit.</p>
        <div className={style.brd_bottom}></div>
       </div>
       {tvsArr.map((ele,index)=> <div key={index} className="col-md-2">
          <img className='w-100' src={imgSrc + ele.poster_path} alt="" />
          <p>{ele.name}</p>
        </div>)}

      </div>
      <div className="row align-items-center">
       <div className="col-md-4">
        <div className={style.brd_top}></div>
        <h2 className='my-2'>trending <br /> person <br /> to watch now</h2>
        <p className='text-muted'>Lorem ipsum dolor sit.</p>
        <div className={style.brd_bottom}></div>
       </div>
       {peopleArr.map((ele,index)=> <div key={index} className="col-md-2">
          {ele.profile_path ? <img className='w-100' src={imgSrc + ele.profile_path} alt="" />
          :<img className='w-100' src='./assets/vector.jpg' alt="" />}
          <p>{ele.name}</p>
        </div>)}

      </div>
    </div>
  )
}
