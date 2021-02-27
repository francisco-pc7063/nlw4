import { createContext, useState, ReactNode, Dispatch, SetStateAction, useEffect } from 'react'
import Cookies from 'js-cookie'

import { HomeProps } from '../pages/index'

import challenges from '../../challenges.json'
import { LevelUpModal } from '../components/LevelUpModal'

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
    level: { level: number, levelUp: () => void, isLevelUpModalOpen: boolean, setIsLevelUpModalOpen: (newValue: boolean) => void },
    experience: { currentExperience: number, levelExperience: (lvl?: number) => number },
    challenge: ChallengeInterface
}

interface ChallengesProviderProps extends HomeProps {
    children: ReactNode
}


export const ChallengesContext = createContext({} as ChallengesContextData) 

export function ChallengesProvider({ children, ...props }: ChallengesProviderProps){
    console.log("CHALLENGES PROVIDER", props)

    const [ level, setLevel ] = useState(props.level ?? 1)
    const [ currentExperience, setCurrentExperience ] = useState(props.currentExperience ?? 0)
    const [ challengesCompleted, setChallengesCompleted ] = useState(props.challengesCompleted ?? 0)
    const [ activeChallenge, setActiveChallenge ]: [challenge | null, Dispatch<SetStateAction<challenge | null>>] = useState(null)
    const [ isLevelUpModalOpen, setIsLevelUpModalOpen ] = useState(false)

    //ComponentDidMount
    useEffect(() => {
        Notification.requestPermission()
    }, [])

    useEffect(() => {
        Cookies.set('challengesCompleted', String(challengesCompleted))
        Cookies.set('level', String(level))
        Cookies.set('currentExperience', String(currentExperience))

        console.log("useEffect("+ level, currentExperience, challengesCompleted +")")
    }, [ level, challengesCompleted, currentExperience ])


    const levelExperience = (lvl?: number): number => {
        const lvlCalc = lvl || level + 1
        if(lvlCalc === 1) return 0
        return Math.pow((lvlCalc ) * 4, 2)
    }


    function levelUp(): void {
        setLevel(level + 1)
        setIsLevelUpModalOpen(true)
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
        level: { level, levelUp, isLevelUpModalOpen, setIsLevelUpModalOpen },
        experience: { currentExperience, levelExperience },
        challenge: { activeChallenge, challengesCompleted, startNewChallenge, resetChallenge, completeChallenge }
    }

    return(
        <ChallengesContext.Provider value={challengesContextData}>
            { children }
            { isLevelUpModalOpen && <LevelUpModal /> }
        </ChallengesContext.Provider>
    )
}