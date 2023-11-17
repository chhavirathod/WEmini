import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { DisplayCampaigns } from '../components';
// import { useStateContext } from '../context'

const Home = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [campaigns, setCampaigns] = useState([]);

  // const { address, contract, getCampaigns } = useStateContext();

  const fetchCampaigns = () => {
    setIsLoading(true);
    // const data = await getCampaigns();
    axios.get('http://localhost:5000/allCampaigns')
      .then((res) => {
        setCampaigns(res.data);
        setIsLoading(false);
      })
      .catch((e)=>{
        console.log(e);
        setIsLoading(false);
      })
    
  }

  useEffect(() => {
    fetchCampaigns()
  }, []);

  return (
    <DisplayCampaigns 
      title="All Campaigns"
      isLoading={isLoading}
      campaigns={campaigns}
    />
  )
}

export default Home