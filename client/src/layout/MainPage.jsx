
import Header from '../components/header/Header'
import Home from '../pages/home/Home'
import Footer from '../components/footer/Footer'

const MainPage = () => {
    return (
        <>
            <header>
                <Header/>
            </header>
            <main className='min-h-screen'>
                <Home/>
            </main>
            <footer>
                <Footer/>
            </footer>
        </>
    )
}

export default MainPage