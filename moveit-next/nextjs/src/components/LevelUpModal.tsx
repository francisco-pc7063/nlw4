import { useContext } from 'react'
import { ChallengesContext } from '../contexts/ChallengesContext'
import styles from '../styles/components/LevelUpModal.module.css'

export function LevelUpModal(){
    const { level } = useContext(ChallengesContext)

    function closeModal() {
        level.setIsLevelUpModalOpen(false)
    }

    return(
        <div className={styles.overlay}>
            <div className={styles.container}>
                <header>{ level.level }</header>

                <strong>Parabens</strong>
                <p>Voce alcancou um novo level</p>

                <button type="button" onClick={ closeModal }>
                    <img src="/icons/close.svg" alt="Fechar"/>
                </button>
            </div>
        </div>
    )
}