import Head from 'next/head'

import styles from '../styles/pages/LandingPage.module.css'

export default function LandingPage() {
    console.log("LandingPage!")

    return (
        <div className={styles.LandingPageContainer}>
            <div className={styles.backgroundLogoContainer}>
                <img src="/background-logo.svg" />
            </div>
            <div className={styles.loginContainer}>
                <header>
                    <img src="/full-logo.svg" alt="move.it"/>
                </header>

                <main>
                    <p>Bem-vindo</p>
                    <div>
                        <img src="/icons/github.svg" alt="Github"/>
                        <p>Faça login com seu Github para começar</p>
                    </div>
                </main>
                <footer>
                    <input
                        type="text"
                        autoFocus
                        placeholder="Digite o seu username"
                    />
                    <button>
                        <img src="/icons/submit.svg" alt="Submit"/>
                    </button>
                </footer>
            </div>
        </div>
    )
}