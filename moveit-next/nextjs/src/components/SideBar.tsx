import router from 'next/router'
import { useEffect, useState } from 'react'

import styles from '../styles/components/SideBar.module.css'

export function SideBar() {
    const [ home, setHome ] = useState('')
    const [ leaderboard, setLeaderboard ] = useState('')

    useEffect(() => {
        switch(router.pathname){
            case '/Home':
                setHome('-selected')
            break;
            case '/Leaderboard':
                setLeaderboard('-selected')
            break;
        }
    }, [])

    function selectRoute(newRoute: string) {
        if(newRoute == router.pathname) return
        else router.push(newRoute)
    }

    return (
        <div className={styles.sideBarContainer}>
            <div className={styles.logo}>
                <img src="favicon.svg" alt="Logo"/>
            </div>
            <div className={styles.menuOptions}>
                <div className={styles.selected}>
                    <button
                        onClick={() => selectRoute("Home")}
                    >
                        <img src={`/icons/home${home}.svg`} alt="HomePage (selected)"/>
                    </button>
                </div>
                <div className={styles.selected}>
                    <button 
                        onClick={() => selectRoute("Leaderboard")}
                    >
                        <img src={`/icons/leaderboard${leaderboard}.svg`} alt="Leaderboard"/>
                    </button>
                </div>
            </div>
        </div>
    )
}