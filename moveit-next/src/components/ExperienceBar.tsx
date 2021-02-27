import { useContext } from 'react'
import { ChallengesContext } from '../contexts/ChallengesContext'

import styles from '../styles/components/ExperienceBar.module.css'

export function ExperienceBar () {
    const { experience, level } = useContext(ChallengesContext)

    const nextLevelExperience = experience.levelExperience()
    const actualLevelExperience = experience.levelExperience(level.level)

    
    const percent = Math.round((experience.currentExperience * 100) / nextLevelExperience)
    

    return(
        <header className={styles.experienceBar}>
            <span>{ actualLevelExperience } xp</span>
                <div>
                    <div style={{ width: `${percent}%` }}/>     
                    <span className={styles.currentExperience} style={{ left: `${percent}%` }} >{actualLevelExperience + experience.currentExperience} xp</span>   
                </div>
            <span>{ nextLevelExperience } xp</span>
        </header>
    )
}