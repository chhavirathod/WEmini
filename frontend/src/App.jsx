import React, { createContext, useReducer } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Sidebar, Navbar } from './components';
import { Home, Profile, CreateCampaign, CampaignDetails } from './pages'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { initialState , reducer } from './UseReducer';

export const UserContext = createContext();

const App = () => {

  const [state , dispatch] = useReducer( reducer , initialState )
  return (
    <UserContext.Provider value={{state , dispatch}}>
      <div className="relative min-w-full sm:-8 p-4 bg-[#13131a] min-h-screen flex flex-row">
        <div className="sm:flex hidden mr-10 relative">
          <Sidebar />
        </div>

        <div className="flex-1 max-sm:w-full max-w-[1280px] min-w-screen mx-auto sm:pr-5">
          <Navbar />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/create-campaign" element={<CreateCampaign />} />
            <Route path="/campaign-details/:id" element={<CampaignDetails />} />
          </Routes>
          
        </div>
        <ToastContainer
            position="bottom-center"
            autoClose={2000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
          />
      </div>
    </UserContext.Provider>
  )
}

export default App