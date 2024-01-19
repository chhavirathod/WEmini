import React, { useState, useEffect } from 'react'

import { DisplayCampaigns } from '../components';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const Search = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [campaigns, setCampaigns] = useState([]);
  const { title } = useParams();

  const fetchCampaigns = () => {
    axios.get(`https://venturecrowd-server.vercel.app/searchCampaigns?searchValue=${title}`)
      .then((res) => {
        setCampaigns(res.data)
        setIsLoading(false);
      })
      .catch((err)=>{
          console.log(err)
          setIsLoading(false);
    })
      
  }

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      fetchCampaigns();
    },2000)
  }, [title]);

  return (
    <DisplayCampaigns 
      title ={`Search Results for \"${title}\"`}
      notFound = "Couldn't find campaigns ....."
      isLoading={isLoading}
      campaigns={campaigns}
    />
  )
}

export default Search;