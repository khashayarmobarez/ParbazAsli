import React from 'react';

const AddUsedEquipment = () => {
    return (
        <>
            {/* line and circle of adding flight level */}
            <div className='flex flex-col justify-center items-center w-[90%] gap-y-3'>

                <div className='flex items-center justify-center w-full'>
                    <div className='rounded-full w-3 h-3' style={{background:'var(--soft-white)'}}></div>

                    <div className='rounded-full w-[25%] h-[2px]' style={{background:'var(--soft-white)'}}></div>

                    <div className='rounded-full w-3 h-3' style={{background:'var(--soft-white)'}}></div>

                    <div className='rounded-full w-[25%] h-[2px]' style={{background:'var(--soft-white)'}}></div>

                    <div className='rounded-full w-3 h-3' style={{background:'var(--soft-white)'}}></div>

                    <div className='rounded-full w-[25%] h-[2px]' style={{background:'var(--soft-white)'}}></div>

                    <div className='rounded-full w-3 h-3' style={{background:'var(--yellow-text)'}}></div>
                </div>

                <div className='flex items-center justify-between w-[97%]'>

                    <p className='' style={{color:'var(--soft-white)'}}>وسیله پرواز</p>

                    <p className='' style={{color:'var(--soft-white)'}}>شرایط پرواز</p>

                    <p className='' style={{color:'var(--soft-white)'}}>Takeoff</p>

                    <p className='' style={{color:'var(--yellow-text)'}}>Landing</p>

                </div>

            </div>
        </>
    );
};

export default AddUsedEquipment;