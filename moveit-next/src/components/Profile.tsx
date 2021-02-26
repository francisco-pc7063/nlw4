import { useContext } from 'react'
import { ChallengesContext } from '../contexts/ChallengesContext'
import styles from '../styles/components/Profile.module.css'

export function Profile () {
    const { level } = useContext(ChallengesContext)

    return (
        <div className={styles.profileContainer}>
            <img src="https://github.com/francisco-pc7063.png" alt="Francisco Pena"/>
            <div>
                <strong>Francisco Pena</strong>
                <p>
                    <img src="icons/level.svg" alt="level"/>
                    Level: {level.level}
                </p>
            </div>
        </div>
    )
}