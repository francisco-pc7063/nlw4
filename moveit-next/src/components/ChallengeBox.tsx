import { useContext } from 'react'
import { ChallengesContext } from '../contexts/ChallengesContext'
import styles from '../styles/components/ChallengeBox.module.css'

export function ChallengeBox() {
    const { challenge } = useContext(ChallengesContext)
    const { activeChallenge } = challenge

    return(
        <div className={styles.challengeBoxContainer}>
            { activeChallenge ? 
                <div className={styles.challengeActive}>
                    <header>Ganhe 400xp</header>

                    <main>
                        <img src={`icons/${activeChallenge.type}.svg`}/>
                        <strong>Novo Desafio</strong>
                        <p>{ activeChallenge.description }</p>
                    </main>

                    <footer>
                        <button
                            type="button"
                            className={styles.challengeFailedButton}
                            onClick={challenge.resetChallenge}
                        >Falhei</button>
                        <button
                            type="button"
                            className={styles.challengeSucceededButton}
                        >Completei</button>
                    </footer>
                </div> 
            :
                <div className={styles.challengeNotActive}>
                    <strong>Finalize um ciclo para receber um desafio</strong>
                    <p>
                        <img src="icons/level-up.svg" alt="Level Up"/>
                        Avance de level completando desafios 
                </p>
            </div> }
        </div>
    )
}