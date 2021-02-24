import { useState, useEffect } from 'react'
import styles from '../styles/components/Countdown.module.css'

export function CountDown() {
    const [ time, setTime ] = useState(25 * 60)
    const [ active, setActive ] = useState(false)

    const minutes = Math.floor(time / 60)
    const seconds = time % 60

    const minuteString = String(minutes).padStart(2, "0")
    const secondString = String(seconds).padStart(2, "0")

    function startCountDown(){
        setActive(true)
    }

    // Event Listener
    useEffect(() => {
        if(active && time > 0){
            setTimeout(() => {
                setTime(time - 1)
            }, 1000)
        }
    }, [ active, time ])

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

            <button type="button"
                className={styles.countDownButton}
                onClick={startCountDown}
            >Iniciar um ciclo</button>
        </div>
    )
}