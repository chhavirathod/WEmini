import React, { useState, useEffect } from 'react'

import { DisplayCampaigns } from '../components';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const Search = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [campaigns, setCampaigns] = useState([]);
  const { title } = useParams();

  const fetchCampaigns = () => {
    setIsLoading(true);
    setTimeout(() => {
      axios.post(`http://localhost:5000/searchCampaigns`, {title : title})
        .then((res) => {
          setCampaigns(res.data)
          setIsLoading(false);
        })
        .catch((err)=>{
            console.log(err)
            setIsLoading(false);
        })
      
    }, 700);
  }

  useEffect(() => {
    fetchCampaigns();
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