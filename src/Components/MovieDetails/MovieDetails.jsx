import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios';

export default function MovieDetails() {
  let {id,mediatype}=useParams();
  const[details,setDetails]=useState({})

async function getTrending(id,mediatype){

let {data}=await axios.get(`https://api.themoviedb.org/3/${mediatype}/${id}?api_key=baf5ee589fc45882c1da2b56f6919fcc&language=en-us`) 

setDetails(data)  
console.log(data);
}

useEffect(() => {
    getTrending(id,mediatype)
    
},[])

  return (<>
  <div className="row">
<div className="col-md-3">
{details.poster_path?<img src={'https://image.tmdb.org/t/p/w500'+details.poster_path} className='w-100' alt="" />:<img src={'https://image.tmdb.org/t/p/w500'+details.profile_path} className='w-100' alt="" />}

</div>
<div className="col-md-6 d-flex align-items-center">
<div>
<h3 className=''>{details.title} {details.name}</h3>
<p className='text-muted my-3'>{details.overview}{details.biography}</p>
{details.vote_average?<h4>vote average : {details.vote_average}</h4>
:""}
{details.vote_count?<h4>vote average : {details.vote_count}</h4>
:""}


</div>
</div>
  </div>

  </>
    )
}
