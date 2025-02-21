
import { Outlet } from 'react-router-dom';
import Header from '../components/header/Header';

const MainPage = () => {
    return (
        <div className='bg-[#f0f3f8]'>
            <header>
                <Header />
            </header>
            <main className='min-h-screen'>
                <Outlet />
            </main>
            <footer>
                {/* <Footer/> */}
            </footer>
        </div>
    )
}

export default MainPage