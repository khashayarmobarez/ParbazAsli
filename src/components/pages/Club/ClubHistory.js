import React from 'react';

// styles
import gradients from '../../../styles/gradients/Gradient.module.css'

// assets
import clipboard from '../../../assets/icons/clipboard.svg'

// mui
import AutoStoriesOutlinedIcon from '@mui/icons-material/AutoStoriesOutlined';

// component
import SearchInput from '../../inputs/SearchInput';

const ClubHistory = () => {
    return (
        <div className='w-full flex flex-col items-center'>
            <div className='w-[90%] flex flex-col mt-24 gap-y-10'>

                <SearchInput />

                {/* the below part should be mapped when data is recieved from server */}
                {/* classesInput */}
                <div className='w-full flex flex-col gap-y-6'>
                    <div className={`${gradients.container} flex w-full justify-between items-center h-12 pr-3 rounded-2xl`}>
                        <span>
                            <AutoStoriesOutlinedIcon />
                        </span>
                        <p>مقدماتی</p>
                        <p>ساعت</p>
                        <button className={`${gradients.clipboardButtonBackgroundGradient} w-14 h-full flex items-center justify-center rounded-l-xl`}>
                            <img src={clipboard} alt='icon' />
                        </button>
                    </div>

                    <div className={`${gradients.container} flex w-full justify-between items-center h-12 pr-3 rounded-2xl`}>
                        <span>
                            <AutoStoriesOutlinedIcon />
                        </span>
                        <p>مقدماتی</p>
                        <p>ساعت</p>
                        <button className={`${gradients.clipboardButtonBackgroundGradient} w-14 h-full flex items-center justify-center rounded-l-xl`}>
                            <img src={clipboard} alt='icon' />
                        </button>
                    </div>
                </div>

            </div>

        </div>
    );
};

export default ClubHistory;