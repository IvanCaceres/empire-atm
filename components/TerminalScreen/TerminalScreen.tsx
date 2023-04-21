"use client"
import { FC, useEffect, useState } from 'react'
import Welcome from './screens/Welcome'
import LoginRegister from './screens/LoginRegister'
import { ScreenBaseProps, Step, User } from './types'
import Home from './screens/Home'
import Transfer from './screens/Transfer'

const TerminalScreen: FC = ({ }) => {
    const [step, setStep] = useState<Step>('home')
    const [user, setUser] = useState<User | undefined>(undefined)
    const [balance, setBalance] = useState(0)

    const changeStepHandler = (step: Step, user?: User) => {
        setStep(step)

        if (user) {
            setUser(user)
            if ('balance' in user) {
                setBalance(user['balance'] || 0)
            }
        }
    }

    const screenProps = {
        changeStepHandler,
        user,
        balance
    }

    return (
        <div className="absolute top-[12%] left-[32%] z-[1] w-[368px] h-[210px] overflow-hidden">
            {step === 'home' ? <Home {...screenProps} /> : step === 'login' ? <LoginRegister {...screenProps} /> : step === 'welcome' ? <Welcome {...screenProps} /> : step === 'transfer' ? <Transfer {...screenProps} /> : undefined}
        </div>
    )
}

export default TerminalScreen