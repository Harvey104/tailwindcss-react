import React from "react";

const TableComponent = () => {
    
  return (
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
  );
};

export default TableComponent;
