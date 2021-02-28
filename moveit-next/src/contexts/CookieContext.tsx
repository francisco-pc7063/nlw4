import { createContext, ReactNode } from 'react'
import Cookies from 'js-cookie'
import axios, { AxiosResponse } from 'axios'

interface CookieProviderProps {
    children: ReactNode
}

interface UserDataApi {
    avatar_url: string
}

interface UserCookieData {
    userName: string
    avatarUrl: string
}

class CookieContextData {
    async setUser(userName: string): Promise<{ error: true, message: any } | { error: false, avatarUrl: string }>{
        try {
            const response: AxiosResponse<UserDataApi> = await axios.get(`https://api.github.com/users/${userName}`)
            const {
                avatar_url
            } = response.data
            console.log(response.data)
            Cookies.set('userData', { userName, avatarUrl: avatar_url })
            return { error: false, avatarUrl: avatar_url }
        } catch(err) {
            console.log(err)
            return { error: true, message: err }
        }
    }

    getUser(){
        const data = Cookies.get('userData')
        console.log(data)
    }

    cleanUserCookie(){
        Cookies.remove('userData')
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