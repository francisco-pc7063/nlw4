import Head from 'next/head'
import { GetServerSideProps } from 'next'

import { CountDown } from '../../components/Countdown'
import { ExperienceBar } from '../../components/ExperienceBar'
import { Profile } from '../../components/Profile'
import { CompletedChallenges } from '../../components/CompletedChallenges'
import { ChallengeBox } from '../../components/ChallengeBox'

import { ChallengesProvider } from '../../contexts/ChallengesContext'
import { CountdownProvider } from '../../contexts/CountdownContext'

import styles from '../../styles/pages/Home.module.css'


export interface ChallengeProviderInterface {
    level: number
    currentExperience: number
    challengesCompleted: number
}

export interface ProfileProps {
    userName: string
    avatarUrl: string
}

export interface HomeProps extends ChallengeProviderInterface, ProfileProps {

}


export default function Home(props: HomeProps) {
    return (
        <ChallengesProvider
            level={props.level}
            currentExperience={props.currentExperience}
            challengesCompleted={props.challengesCompleted}
        >
            <div className={styles.container}>
                <Head>
                    <title>Inicio | move.it </title>
                </Head>

                <ExperienceBar />
                <CountdownProvider>
                    <section>
                        <div>
                            <Profile userName={props.userName} avatarUrl={props.avatarUrl}/>
                            <CompletedChallenges />
                            <CountDown />
                        </div>
                        <div>
                            <ChallengeBox />
                        </div>  
                    </section>
                </CountdownProvider>
            </div>
        </ChallengesProvider>
    )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    let { level, currentExperience, challengesCompleted, userData } = ctx.req.cookies
    const { userName, avatarUrl } = JSON.parse(userData)

    level = (level === '0') ? '1' : level

    return {
        props: {
            userName,
            avatarUrl,
            level: Number(level || 1),
            currentExperience: Number(currentExperience || 0),
            challengesCompleted: Number(challengesCompleted || 0)
        }
    }
    
}