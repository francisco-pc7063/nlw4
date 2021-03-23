import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { ChallengesContext } from "./ChallengesContext";

import { ChallengeInterface } from './ChallengesContext'

interface ChallengeAndControl extends ChallengeInterface {
    isActive: boolean
    hasFinished: boolean
}

interface CountdownContextData {
    challengeNControl: ChallengeAndControl
    time: {
        time: number
        minutes: number
        seconds: number
        startCountdown: () => void
        resetCountdown: () => void
    }
}

interface CountdownProviderProps {
    children: ReactNode
}

export const CountdownContext = createContext({} as CountdownContextData)

let countDownTimeout: NodeJS.Timeout

export function CountdownProvider({ children }: CountdownProviderProps) {
    const { challenge } = useContext(ChallengesContext)

    const [ time, setTime ] = useState(0.05 * 20)
    const [ isActive, setActive ] = useState(false)
    const [ hasFinished, setHasFinished ] = useState(false)

    const minutes = Math.floor(time / 60)
    const seconds = time % 60

    function startCountdown(): void {
        setActive(true)
    }
    function resetCountdown(): void {
        clearTimeout(countDownTimeout)
        setActive(false)
        setTime(0.05*20)
        setHasFinished(false)
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

    const countDownProviderData: CountdownContextData = {
        challengeNControl: { isActive, ...challenge, hasFinished },
        time: {
            time,
            minutes,
            seconds,
            startCountdown,
            resetCountdown
        }
    }

    return(
        <CountdownContext.Provider value={countDownProviderData}>
            {children}
        </CountdownContext.Provider>
    )
}