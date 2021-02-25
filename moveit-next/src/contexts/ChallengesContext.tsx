import { createContext, useState, ReactNode, Dispatch, SetStateAction } from 'react'

import challenges from '../../challenges.json'

interface challenge {
    type: string
    description: string
    amount: number
}

interface ChallengesContextData {
    level: { level: number, levelUp: () => void },
    experience: { currentExperience: number, levelExperience: (lvl?: number) => number },
    challenge: { activeChallenge: challenge, challengesCompleted: number, startNewChallenge: () => void, resetChallenge: () => void }
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

        setActiveChallenge(challenge)
    }

    function resetChallenge(): void {
        setActiveChallenge(null)
    }

    const challengesContextData:ChallengesContextData = {
        level: { level, levelUp },
        experience: { currentExperience, levelExperience },
        challenge: { activeChallenge, challengesCompleted, startNewChallenge, resetChallenge }
    }

    return(
        <ChallengesContext.Provider value={challengesContextData}>
            { children }
        </ChallengesContext.Provider>
    )
}