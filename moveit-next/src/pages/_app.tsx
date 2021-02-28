import { CookieProvider } from '../contexts/CookieContext'
import '../styles/global.css'


function MyApp({ Component, pageProps }) {
    return (
        <CookieProvider>
            <Component {...pageProps} />
        </CookieProvider>
    )
}

export default MyApp