import { createContext, ReactNode } from 'react'
import Cookies from 'js-cookie'
import axios, { AxiosResponse } from 'axios'

interface CookieProviderProps {
    children: ReactNode
}

interface UserDataApi {
    avatar_url: string
    name: string
}

interface UserCookieData {
    userLogin: string
    userName: string
    avatarUrl: string
}

class CookieContextData {
    async setUser(userLogin: string): Promise<{ error: true, message: any } | { error: false, avatarUrl: string }>{
        try {
            const response: AxiosResponse<UserDataApi> = await axios.get(`https://api.github.com/users/${userLogin}`)
            const {
                name,
                avatar_url
            } = response.data
            console.log(response.data)
            Cookies.set('userLogin', userLogin )
            Cookies.set('userName', name )
            Cookies.set('avatarUrl', avatar_url)
            return { error: false, avatarUrl: avatar_url }
        } catch(err) {
            console.log(err)
            return { error: true, message: err }
        }
    }

    getUserData(){
        let data: UserCookieData = {
            userLogin: Cookies.get('userLogin'),
            userName: Cookies.get('userName'),
            avatarUrl: Cookies.get('avatarUrl')
        }
        return data
    }

    cleanUserCookie(){
        Cookies.remove('userName')
        Cookies.remove('avatarUrl')
        Cookies.remove('level')
        Cookies.remove('currentExperience')
        Cookies.remove('challengesCompleted')
    }
}

export const CookieContext = createContext({} as CookieContextData) 

export function CookieProvider({ children }: CookieProviderProps){
    
    const CookieProviderData = new CookieContextData()

    return(
        <CookieContext.Provider value={CookieProviderData}>
            { children }
        </CookieContext.Provider>
    )
}