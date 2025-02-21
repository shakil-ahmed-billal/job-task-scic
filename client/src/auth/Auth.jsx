import Header from '@/components/header/Header';
import { Outlet } from 'react-router-dom';

const Auth = () => {
    return (
        <div className="bg-[#f0f3f8]">
            <header><Header /></header>
            <div className='min-h-[calc(100vh-72px)]'>
                <Outlet />
            </div>
        </div>
    )
}

export default Auth