import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

export default function Tvshow() {

    const[tv,setTv]=useState([])
    let mediaType='tv'
  let nums =new Array(10).fill(1).map((elem,index)=>index+1);
      
  async function getTrending(page){
  
  let {data}=await axios.get(`https://api.themoviedb.org/3/discover/tv?api_key=baf5ee589fc45882c1da2b56f6919fcc&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=true&page=${page}`) 
    setTv(data.results);
    console.log(data.results);
  
  }
  
  useEffect(() => {
      getTrending(1)
  
  
  },[])
    return (<>
    <div className="row mt-4">
  {tv.map((item,index)=>  <div key={index} className="col-md-3">
  <Link className='text-decoration-none text-white' to={`/moviedetails/${item.id}/${mediaType}`}> 
  <div className='position-relative'>
    <img src={'https://image.tmdb.org/t/p/w500'+item.poster_path} className='w-100' alt="" />
  <h3 className='h5'>{item.name}</h3>
  
  <div className="vote top-0 end-0 position-absolu te p-1">{item.vote_average}</div>
   
  </div>
  </Link>
    </div>)}
  
    </div>
    <nav className='py-5'>
      <ul className='pagination pagination-sm d-flex justify-content-center'>
        {nums.map((page)=><li key={page} onClick={()=>getTrending(page)} className='page-item p-1'>
  <Link className='page-link bg-transparent text-white'>{page}</Link>
        </li>)}
   
      </ul>
    </nav>
    </>
    )


}
