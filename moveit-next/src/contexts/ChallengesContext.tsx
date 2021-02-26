import { createContext, useState, ReactNode, Dispatch, SetStateAction, useEffect } from 'react'

import challenges from '../../challenges.json'

interface challenge {
    type: string
    description: string
    amount: number
}

export interface ChallengeInterface {
    activeChallenge: challenge,
    challengesCompleted: number,
    startNewChallenge: () => void,
    resetChallenge: () => void,
    completeChallenge: () => void
}

interface ChallengesContextData {
    level: { level: number, levelUp: () => void },
    experience: { currentExperience: number, levelExperience: (lvl?: number) => number },
    challenge: ChallengeInterface
}

interface ChallengesProviderProps {
    children: ReactNode
}


export const ChallengesContext = createContext({} as ChallengesContextData) 

export function ChallengesProvider({ children }: ChallengesProviderProps){
    const [ level, setLevel ] = useState(1)
    const [ currentExperience, setCurrentExperience ] = useState(0)
    const [ challengesCompleted, setChallengesCompleted ] = useState(0)
    const [ activeChallenge, setActiveChallenge ]: [challenge | null, Dispatch<SetStateAction<challenge | null>>] = useState(null)

    //componentDidMount
    useEffect(() => {
        Notification.requestPermission()
    }, [])

    const levelExperience = (lvl?: number): number => {
        const lvlCalc = lvl || level + 1
        if(lvlCalc === 1) return 0
        return Math.pow((lvlCalc ) * 4, 2)
    }


    function levelUp(): void {
        setLevel(level + 1)
    }

    function startNewChallenge(): void {
        const randomChallengeIndex = Math.floor(Math.random() * challenges.length)
        const challenge = challenges[randomChallengeIndex]

        if(Notification.permission === 'granted'){
            new Audio("/notification.mp3").play()

            new Notification("Novo desafio: ", {
                icon: "/favicon.png",
                body: `Valendo ${challenge.amount} xp!`
            })
        }
        setActiveChallenge(challenge)
    }

    function resetChallenge(): void {
        setActiveChallenge(null)
    }

    function completeChallenge(): void {
        if(!activeChallenge) return

        const { amount } = activeChallenge
        let finalExperience = currentExperience + amount

        let nextLevelExperience = levelExperience()
        if(finalExperience >= nextLevelExperience){
            finalExperience = finalExperience - nextLevelExperience
            levelUp()
        }
        setCurrentExperience(finalExperience)
        setActiveChallenge(null)
        setChallengesCompleted(challengesCompleted + 1)
    }

    const challengesContextData:ChallengesContextData = {
        level: { level, levelUp },
        experience: { currentExperience, levelExperience },
        challenge: { activeChallenge, challengesCompleted, startNewChallenge, resetChallenge, completeChallenge }
    }

    return(
        <ChallengesContext.Provider value={challengesContextData}>
            { children }
        </ChallengesContext.Provider>
    )
}