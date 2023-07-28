import React, { useEffect, useState } from 'react'
import axios from 'axios';

import { useParams } from 'react-router-dom';   // useParams hook

export default function Details() {

    // get sent id from App.js from path   (( getParams  id  from the current URL ))
    let { id } = useParams()

    let [obj, setObj] = useState({})
    const imgSrc = 'https://image.tmdb.org/t/p/w500';
    let [arr,setArr] = useState([])

    useEffect(() => {
        getMovieDetails(id)
    }, [])

    async function getMovieDetails(movie_id) {
        let { data } = await axios.get(`https://api.themoviedb.org/3/movie/${movie_id}?api_key=ad5b8a40f505d647529a35d8a53e24fd&language=en-US`);
        console.log(data);
        setObj(data)
        setArr(data.genres)
        // console.log(imgSrc+obj.poster_path);
    }

    return (
        <div>
            <div className="row">
                <div className="col-md-4">
                    <img src={imgSrc + obj.poster_path} className='w-100' alt="" />
                </div>
                <div className="col-md-8">
                    <p>{obj.title}</p>
                    <p>{obj.overview}</p>
                    {arr.map((e) => <span className='bg-info p-2 m-2'>{e.name}</span>)}
                </div>
            </div>
        </div>
    )
}
