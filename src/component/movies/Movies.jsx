import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import style from './movies.module.css'

export default function Movies() {

  let [moviesArr, setMoviesArr] = useState([])
  const imgSrc = 'https://image.tmdb.org/t/p/w500';

  let pageNumber = new Array(5).fill(1).map((e, index) => index + 1)
  // let pageNumber = [1, 2, 3, 4, 5]
  
  let [globalPage, setGlobalPage] = useState(0)

  async function getMovies(pageNum) {
    setGlobalPage(pageNum)
    let { data } = await axios.get(`https://api.themoviedb.org/3/trending/movie/day?api_key=ad5b8a40f505d647529a35d8a53e24fd&page=${pageNum}`)
    console.log(data.results);
    setMoviesArr(data.results)
  }

  useEffect(() => {
    getMovies(1)
  }, [])

  function next() {
    if (globalPage === 1000)
      globalPage = 1000
    else
      globalPage++;
    getMovies(globalPage)
  }
  function prev() {
    if (globalPage === 1)
      globalPage = 1
    else
      globalPage--;
    getMovies(globalPage)
  }


  return (
    <div>
      <div className="row">
        {moviesArr.map((ele, index) =>
          <div key={index} className="col-md-2">
            <Link to={`/details/${ele.id}`} className='text-decoration-none text-white text-center'>
              <img className='w-100' src={imgSrc + ele.poster_path} alt="" />
              <p className='pt-2'>{ele.title}</p>
            </Link>
          </div>
        )}
      </div>
      {/* pagination  */}
      <nav aria-label="Page navigation example">
        <ul className="pagination d-flex justify-content-center my-5">

          <li className="page-item" onClick={prev}>
            <span className="page-link" aria-label="Previous">
              <span aria-hidden="true">&laquo;</span>
            </span>
          </li>

          {pageNumber.map((num, index) =>
            <li key={index} className="page-item" onClick={() => { getMovies(num) }}>
              <span className="page-link" >{num}</span>
            </li>)}

          <li className="page-item" onClick={next}>
            <span className="page-link" aria-label="Next">
              <span aria-hidden="true">&raquo;</span>
            </span>
          </li>
        </ul>
      </nav>
    </div>
  )
}
