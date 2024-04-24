import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { DisplayCampaigns } from '../components';
import { SERVER_URL } from '../constants';

const Home = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [campaigns, setCampaigns] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    //fetch campaigns
    // Run after 700 Millisecinds the new Campaign
    setTimeout(() => {
      axios.get(SERVER_URL + '/allCampaigns')
      .then((res) => {
        setCampaigns(res.data);
        setIsLoading(false);
      })
      .catch((e)=>{
        console.log(e);
        setIsLoading(false);
      })

      // axios.
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