import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import FundCard from './FundCard';
import { loader } from '../assets';
import { toast } from 'react-toastify';
import { UserContext } from '../App';

const DisplayCampaigns = ({ title, isLoading, campaigns }) => {
  const navigate = useNavigate();
  const {state,dispatch} = useContext(UserContext)

  const handleNavigate = (campaign) => {
    navigate(`/campaign-details/${campaign.title}`, { state: campaign })
  }
  
  return (
    <div>
      <h1 className="font-epilogue font-semibold text-xl md:text-3xl text-white text-left px-7">{title} ({campaigns.length})</h1>

      <div className="flex flex-wrap mt-[20px] gap-[26px]">
        {isLoading && (
          <img src={loader} alt="loader" className="w-[100px] h-[100px] object-contain" />
        )}

        {!isLoading && campaigns.length === 0 && (
          <p className="font-epilogue font-semibold text-[14px] leading-[30px] text-[#818183] px-7">
            You have not created any campaigns yet
          </p>
        )}

        {!isLoading && campaigns.length > 0 && campaigns.map((campaign) => <FundCard 
          key={campaign._id}
          {...campaign}
          handleClick={() => {
            if(state){
              handleNavigate(campaign)
            }
            else{
              toast.info("Please login first!")
            }
          }}
        />)}
      </div>
    </div>
  )
}

export default DisplayCampaigns