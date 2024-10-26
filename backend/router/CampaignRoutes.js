const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const router = express.Router()


require("../db/connnection");
const User = require('../model/userSchema');
const Campaign = require('../model/campaignSchema');
const authenticate = require('../middleware/authenticate');
const { allCampaigns, getCampaignById, deleteCampaignById, checkCampaign, searchCampaigns, getManyCampaigns, getManyDonatedCampaigns, addCampaign, updateCampaignById, donateCampaignById } = require('../controllers/campaign.controller')

router.get('/' , (req,res) => {
    res.send("Backend Home Page");
})


router.get('/allCampaigns' , allCampaigns)

router.get('/getCampaign/:id' , getCampaignById)


router.post('/deleteCampaign', authenticate, deleteCampaignById);

router.post('/checkCampaign' , authenticate , checkCampaign)

router.get('/searchCampaigns' , searchCampaigns)

router.post('/getManyCampaigns' , getManyCampaigns)

router.post('/getManyDonatedCampaigns' , getManyDonatedCampaigns)


router.post('/addCampaign' , authenticate , addCampaign)

router.post('/update' , updateCampaignById)

router.post('/donate' , authenticate , donateCampaignById)

module.exports = router
