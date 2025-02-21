
import Header from '../components/header/Header'
import Footer from '../components/footer/Footer'
import { Outlet } from 'react-router-dom';

const MainPage = () => {
    return (
        <div className='bg-[#f0f3f8]'>
            <header>
                <Header/>
            </header>
            <main className='min-h-screen'>
                <Outlet/>
            </main>
            <footer>
                <Footer/>
            </footer>
        </div>
    )
}

export default MainPage