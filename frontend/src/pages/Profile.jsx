import React, { useState, useEffect } from 'react'

import { DisplayCampaigns } from '../components';
import axios from 'axios';
// import { useStateContext } from '../context'

const Profile = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [campaigns, setCampaigns] = useState([]);

  const fetchCampaigns = () => {
    setIsLoading(true);

    setTimeout(() => {
      axios.get('http://localhost:5000/profile',{withCredentials: true})   //returns rootUser
      .then((res) => {
      // console.log(res.data.yourCampaigns)

      axios.post(`http://localhost:5000/getManyCampaigns`, res.data.yourCampaigns ) //returns list of campaigns from id's in yourCampaigns
        .then((res) => {
          console.log(res.data)
          setCampaigns(res.data)
        })
        .catch((err)=>console.log(err))
      })
      .catch((e)=>{console.log(e)})
      setIsLoading(false);
    }, 700);
  }

  useEffect(() => {
    fetchCampaigns();
  }, []);

  return (
    <DisplayCampaigns 
      title="Your Campaigns"
      isLoading={isLoading}
      campaigns={campaigns}
    />
  )
}

export default Profile