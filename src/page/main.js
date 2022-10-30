import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

import { faEdit, faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import { faClose, faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faInstagram, faTwitter } from "@fortawesome/free-brands-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import initActivity from "../utils/service";

const style = {
  position: 'absolute',
  top: '40%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  height : 500,
  bgcolor: 'background.paper',
  boxShadow: 24,
};

export default function Main() {

  const [myActivitys, setMyActivitys] = useState(initActivity);

  const removeActivity = ( index ) => {
    setMyActivitys(current =>
      current.filter(myActivity => {
        return myActivity.id !== index;
      }),
    );
  };

  const [description, setDescription] = useState('');
  const [socialPlatformName, setSocialPlatform] = useState(0);
  const [socialType, setSocialType] = useState(0);
  const [earned, setEarned] = useState(10);
  
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  
  const handleClose = () => {
    setDescription('');
    setSocialPlatform(0);
    setSocialType(0);
    setEarned(0);
    setOpen(false);
  };

  const updateActivity = () => {
    myActivitys.push({
      id: myActivitys.length + 1,
      date : '2020-12-22',
      activity : description,
      socialPlatform : parseInt(socialPlatformName),
      socialType: parseInt(socialType),
      earned : earned
    });
    setMyActivitys(myActivitys); 
    setEarned(0);
  }

  const socialTypeChange = (type) => {
    setSocialType(type);
  }

  const socialPlatChange = (platform) => {
    setSocialPlatform(platform);
  }

  const earnedIncrease = (platform) => {
    setEarned(earned + 10);
  }

  const earnedDecrease = (platform) => {
    setEarned(earned - 10);
  }

  return (
    <>
      <div className="min-h-full">
        <Modal
          hideBackdrop
          open={open}
          onClose={handleClose}
          aria-labelledby="child-modal-title"
          aria-describedby="child-modal-description"
        >
          <Box sx={{ ...style}}>
            <div className='grid grid-cols-2 my-5'>
              <div className='col-sapn-1 mx-3'>
                <h3 className='text-xl font-normal'>Create Activity</h3>
              </div>
              <div className='col-sapn-1 flex justify-end'>
                <Button onClick={handleClose}>
                  <FontAwesomeIcon icon={ faClose } />
                </Button>
              </div>
            </div>
            <div className='m-5 space-y-6'>
              <div className='w-full'>
                <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                  Description:
                </label>
                <div className="w-full relative mt-1 rounded-md shadow-sm">
                  <input
                    type="text"
                    name="description"
                    id="description"
                    className="block w-full h-12 rounded-md border-solid border-2 border-gray-300 pl-2 pr-12 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    value={ description }
                    onChange={ e => setDescription(e.target.value) }
                  />
                </div>
              </div>
              <div className='w-full'>
                <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                  Social Platform
                </label>
                <div className="w-full relative mt-1 rounded-md shadow-sm">
                  <select
                    id="socialPlatform"
                    name="socialType"
                    className="block w-full h-12 rounded-md border-solid border-2 border-gray-300 pl-2 pr-12 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    onChange={e => socialPlatChange(e.target.value)}
                  >
                    <option value={0}>Instagram</option>
                    <option value={1}>Facebook</option>
                    <option value={2}>Twitter</option>
                  </select>
                </div>
              </div>
              <div className='w-full'>
                <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                  Social Type
                </label>
                <div className="w-full relative mt-1 rounded-md shadow-sm">
                  <select
                    id="socialType"
                    name="socialType"
                    className="block w-full h-12 rounded-md border-solid border-2 border-gray-300 pl-2 pr-12 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    onChange={e => socialTypeChange(e.target.value)}
                  >
                    <option value={0}>Liked</option>
                    <option value={1}>Shared</option>
                    <option value={2}>Post</option>
                  </select>
                </div>
              </div>
              <div className='w-full'>
                <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                  Points Earned:
                </label>
                <div className="w-full flex flex-col h-12">
                  <div className='basis-1/2 h-12 flex flex-row'>
                    <Button variant="outlined"
                      style={{
                        borderTopRightRadius: "0px",
                        borderBottomRightRadius: "0px",
                        borderRight: "none"
                      }}
                      onClick={() => earnedDecrease()}>
                      <FontAwesomeIcon icon={faMinus} />
                    </Button>
                    <input 
                      type={'text'} 
                      value={earned} 
                      style={{
                        width: "100px",
                        border: "1px solid rgba(25, 118, 210, 0.5)",
                      }}
                      disabled
                      className="block h-12 border-solid border-2 border-gray-300 pl-2 pr-12 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      onChange={e => setEarned(e.target.value)}/>
                    <Button variant="outlined" 
                      style={{
                        borderTopLeftRadius: "0px",
                        borderBottomLeftRadius: "0px",
                        borderLeft: "none"
                      }}
                      onClick={() => earnedIncrease()}>
                      <FontAwesomeIcon icon={faPlus} />
                    </Button>
                  </div>
                </div>
              </div>
              <div className='grid grid-cols-2 my-5'>
                <div className='col-end-3 col-sapn-1 flex justify-end space-x-2'>
                  <Button variant="outlined" onClick={ () => {
                    handleClose()
                  }}>
                    Cancel
                  </Button>
                  <Button variant="outlined" onClick={ () => {
                    updateActivity();
                    handleClose();
                  } }>
                    Confirm
                  </Button>
                </div>
              </div>
            </div>
          </Box>
        </Modal>
        <main>
          <div className="mx-auto py-6 sm:px-6 lg:px-8">
            <div className="rounded-lg border shadow-2xl shadow-indigo-500/50">
              <div className="m-8 space-y-4">
                <div className="flex xl:flex-row lg:flex-row flex-col justify-center items-left space-y-3">
                  <div className="basis-1/4">
                    <h1 className='text-2xl font-semibold'>Your Activity</h1>
                  </div>
                  <div className="basis-1/2">
                    <h3 className='text-xl font-medium'>Total Earned: 0</h3>
                  </div>
                  <div className="flex basis-1/4 lg:justify-end">
                    <Button variant="contained" color="primary" onClick={handleOpen}>
                      Create Activity
                    </Button>
                  </div>
                </div>
                <div className="grid grid-cols-7">
                  <div className="col-start-1 col-span-1">
                    <h2 className='text-md font-semibold'>Date</h2>
                  </div>
                  <div className='col-span-4'>
                    <h2 className = 'text-md font-semibold'>Activity</h2>
                  </div>
                  <div className='col-span-1'>
                    <h2 className = 'text-md font-semibold'>Earned</h2>
                  </div>
                  <div className='col-end-8 col-span-1'>
                    <h2 className = 'text-md font-semibold'>Actions</h2>
                  </div>
                </div>
                <div className='space-y-2'>
                  {
                    myActivitys.map((myActivity, index) =>
                      <div className="h-16 grid grid-cols-7 rounded-lg border">
                        <div className="h-full col-start-1 col-span-1 flex items-center pl-3">
                          <p className='text-base font-medium'>{ myActivity.date}</p>
                        </div>
                        <div className='h-full col-span-3 flex items-center pl-3'>
                          <p className='text-base font-medium'>{ myActivity.activity}</p>
                        </div>
                        <div className='h-full col-span-1 flex items-center'>
                          {myActivity.socialPlatform === 0 ? <FontAwesomeIcon icon={faInstagram} /> : (myActivity.socialPlatform === 1 ? <FontAwesomeIcon icon={faFacebook}/> : <FontAwesomeIcon icon={faTwitter}/>)}
                          <span style={{marginLeft: "7px"}}>
                            {myActivity.socialType === 0 ? "Liked" : (myActivity.socialType === 1 ? "Shared" : "Post")}
                          </span>
                        </div>
                        <div className='h-full col-span-1 flex items-center pl-1'>
                          <p className='text-base font-semibold'>{ myActivity.earned > 0 ? "+" + myActivity.earned : myActivity.earned }</p>
                        </div>
                        <div className='h-full col-end-8 col-span-1 flex items-center'>
                          <Button>
                            <FontAwesomeIcon icon={faEdit} />
                          </Button>
                          <Button onClick={ () => {removeActivity(myActivity.id) } }>
                            <FontAwesomeIcon icon={faTrashAlt} />
                          </Button>
                        </div>
                      </div>
                    )
                  }
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  )
}
