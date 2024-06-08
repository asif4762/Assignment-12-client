import Sidebar from '../Components/DashBoard/SideBar/Sidebar';
import { Outlet } from 'react-router-dom';

const DashBorad = () => {
    return (
        <div className='relative min-h-screen md:flex'>
            <Sidebar/>
            <div className='flex-1 md:ml-64'>
                <div className='p-5'>
                    <Outlet/>
                </div>
            </div>
        </div>
    );
};

export default DashBorad;