import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Movies from '../Movies/Movies';
import Mediaitem from'../Mediaitem/Mediaitem'

export default function Home() {


  const[movie,setMovie]=useState([])
const[tv,setTv]=useState([])
const[people,setPeople]=useState([])


  
async function getTrending(mediaitem,callback){
let {data}=await axios.get(`http://api.themoviedb.org/3/trending/${mediaitem}/week?api_key=baf5ee589fc45882c1da2b56f6919fcc`) 
callback(data.results) 
console.log(data.results);
}

useEffect(() => {
    getTrending('movie',setMovie)
    getTrending('tv',setTv)
    getTrending('person',setPeople)

},[])

  return  <>
  {movie?<>
    <div className="row py-3 mt-4">
<div className="col-md-4 d-flex align align-items-center">
  <div>
    <div className="brdr w-25 mb-3"></div>
<h2 className='h3'>Trending <br/>Movies <br/>To Watch Now</h2>
<p className='text-muted'>Most Watched Movies By week </p>
<div className="brdr w-100 mt-3"></div>
    </div >
</div>
  
    {movie.slice(0,10).map((item,index)=><Mediaitem key={index} item={item}/>)}
 
    </div>



    <div className="row py-3 mt-4">
<div className="col-md-4 d-flex align align-items-center">
  <div>
    <div className="brdr w-25 mb-3"></div>
<h2 className='h3'>Trending <br/>TV <br/>To Watch Now</h2>
<p className='text-muted'>Most Watched Tv By week </p>
<div className="brdr w-100 mt-3"></div>
    </div >
</div>
  
    {tv.slice(0,10).map((item,index)=><Mediaitem key={index} item={item}/>)}
 
    </div>




    <div className="row py-3 mt-4">
<div className="col-md-4 d-flex align align-items-center">
  <div>
    <div className="brdr w-25 mb-3"></div>
<h2 className='h3'>Trending <br/> People <br/>To Watch Now</h2>
<p className='text-muted'>Most Watched People By week </p>
<div className="brdr w-100 mt-3"></div>
    </div >
</div>
   
    {people.slice(0,10).map((item,index)=><Mediaitem key={index} item={item}/>)}
 
    </div>
    </> :<div className='d-flex  vh-100 justify-content-center align-items-center'>
      
      <i className='fas fa-fa-spinner fa-spin fa-8x'></i>
      
      </div>}

    </>
    
}
     