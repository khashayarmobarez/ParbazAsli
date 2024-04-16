import React, { PureComponent } from 'react';
import { BarChart, Bar, LabelList, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// components
import SearchInput from '../../inputs/SearchInput'


const data = [
  {
    name: 'Page A',
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: 'Page B',
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: 'Page C',
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: 'Page D',
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: 'Page E',
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: 'Page F',
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: 'Page G',
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

// Custom bar shape function to make the top of the bar rounded
const RoundedBar = (props) => {
    const { fill, x, y, width, height } = props;
    const radius = 15; // Adjust the radius to control the roundness of the corners
    return (
        <>
        <g>
            <path d={`
            M${x},${y + radius}
            Q${x},${y},${x + radius},${y}
            L${x + width - radius},${y}
            Q${x + width},${y},${x + width},${y + radius}
            L${x + width},${y + height - radius}
            Q${x + width},${y + height},${x + width - radius},${y + height}
            L${x + radius},${y + height}
            Q${x},${y + height},${x},${y + height - radius}
            Z
            `} fill={fill}/>
            {/* Add a semi-transparent rectangle behind the bar */}
            <rect
            x={x}
            y={y}
            width={width}
            height={height}
            fill="rgba(0, 0, 0, 0.18)" // Semi-transparent black color
            />
        </g>
        </>
    );
  };


const DashboardPilotsQuantiy = () => {
    return (
        <div className='flex justify-center w-[90%] min-h-20 rounded-2xl px-5 py-7 my-4 gap-x-6' style={{backgroundColor:'var(--organs-coachData-bg)', boxShadow:'var(--organs-coachData-boxShadow)'}}>
            
            <div className=' flex flex-col w-[90%] items-center space-y-6'>

                        <SearchInput />

                        <div className='w-full flex justify-start text-xl' style={{color:'var(--yellow-text) '}}>
                            <p>تعداد خلبان‌ها</p>
                        </div>

                        <div className='w-full flex flex-col items-center justify-center'>

                            <ResponsiveContainer width="100%" height={300}>
                                <BarChart width={150} height={40} data={data}>
                                    <Bar dataKey="uv" fill='var(--yellow-text)' shape={<RoundedBar />} >
                                        <LabelList dataKey="uv" position="insideTop" style={{ fill: '#3B444B', fontWeight:'500' }}  />
                                    </Bar> 
                                </BarChart>
                            </ResponsiveContainer>

                            <div className='w-[100%] h-[6px] mt-[-0.7rem] z-10' style={{ backgroundColor: '#1b253B'}}></div>

                            <div className='w-full flex items-center justify-between px-2 md:px-10'>
                                {
                                    data.slice().reverse().map(data => <p key={data.name}>{data.name}</p>)
                                }
                            </div>

                        </div>



            </div>

        </div>
    );
};

export default DashboardPilotsQuantiy;