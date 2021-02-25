import { useState, useEffect, useContext } from 'react'

import { ChallengesContext } from '../contexts/ChallengesContext'

import styles from '../styles/components/Countdown.module.css'


let countDownTimeout: NodeJS.Timeout

export function CountDown() {
    const { challenge } = useContext(ChallengesContext)

    const [ time, setTime ] = useState(0.05 * 60)
    const [ isActive, setActive ] = useState(false)
    const [ hasFinished, setHasFinished ] = useState(false)

    const minutes = Math.floor(time / 60)
    const seconds = time % 60

    const minuteString = String(minutes).padStart(2, "0")
    const secondString = String(seconds).padStart(2, "0")

    function startCountDown(){
        setActive(true)
    }
    function resetCountDown(){
        clearTimeout(countDownTimeout)
        setActive(false)
        setTime(0.05*60)
    }


    // Event Listener
    useEffect(() => {
        if(isActive && time > 0){
            countDownTimeout = setTimeout(() => {
                setTime(time - 1)
            }, 1000)
        }
        else if(isActive && time === 0) {
            setActive(false)
            setHasFinished(true)
            challenge.startNewChallenge()
        }
    }, [ isActive, time ])

    return(
        <div>
            <div className={styles.countdownContainer}>
                <div>
                    <span>{minuteString[0]}</span>
                    <span>{minuteString[1]}</span>
                </div>
                <span>:</span>
                <div>
                    <span>{secondString[0]}</span>
                    <span>{secondString[1]}</span>
                </div>
            </div>

            { hasFinished ? (
                <button
                disabled
                className={`${styles.countDownButton}`}
            >
                <p>Ciclo Encerrado</p>
                <div>
                    <img src="icons/ok-green.svg"/>
                </div>
            </button>
            ) : (
                isActive ? (
                <button type="button"
                    className={`${styles.countDownButton} ${styles.countDownButtonActive}`}
                    onClick={resetCountDown}
                >Abandonar Ciclo</button>
                ) : (
                    <button type="button"
                    className={styles.countDownButton}
                    onClick={startCountDown}
                >Iniciar um Ciclo</button>
                ) 
                
            ) }

            
            
            
        </div>
    )
}