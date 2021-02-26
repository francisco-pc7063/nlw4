import { useState, useEffect, useContext } from 'react'

import { CountdownContext } from '../contexts/CountdownContext'

import styles from '../styles/components/Countdown.module.css'


export function CountDown() {
    const { challengeNControl, time } = useContext(CountdownContext)
    const { hasFinished, isActive } = challengeNControl
    const { resetCountdown, startCountdown, minutes, seconds } = time

    const minuteString = String(minutes).padStart(2, "0")
    const secondString = String(seconds).padStart(2, "0")

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
                    onClick={resetCountdown}
                >Abandonar Ciclo</button>
                ) : (
                    <button type="button"
                    className={styles.countDownButton}
                    onClick={startCountdown}
                >Iniciar um Ciclo</button>
                ) 
                
            ) }

            
            
            
        </div>
    )
}