import { useContext } from 'react'
import { ChallengesContext } from '../contexts/ChallengesContext'

import styles from '../styles/components/Profile.module.css'

import { ProfileProps } from '../pages/Home'

export function Profile(props: ProfileProps) {
    const { level } = useContext(ChallengesContext)

    return (
        <div className={styles.profileContainer}>
            <img src={props.avatarUrl} alt="Francisco Pena"/>
            <div>
                <strong>{props.userName}</strong>
                <p>
                    <img src="icons/level.svg" alt="level"/>
                    Level: {level.level}
                </p>
            </div>
        </div>
    )
}