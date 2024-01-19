import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { DisplayCampaigns } from '../components';

const Home = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [campaigns, setCampaigns] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    //fetch campaigns
    // Run after 700 Millisecinds the new Campaign
    setTimeout(() => {
      axios.get('https://venturecrowd-server.vercel.app/allCampaigns')
      .then((res) => {
        setCampaigns(res.data);
        setIsLoading(false);
      })
      .catch((e)=>{
        console.log(e);
        setIsLoading(false);
      })
    }, 700);

  },[]);

  return (
    <DisplayCampaigns 
      title="All Campaigns"
      isLoading={isLoading}
      campaigns={campaigns}
    />
  )
}

export default Home