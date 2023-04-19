"use client"
import {FC, useState} from 'react'
import Welcome from './screens/Welcome'
import LoginRegister from './screens/LoginRegister'

type Step = 'home' | 'login'

const TerminalScreen: FC = ({}) => {
    const [step, setStep] = useState<Step>('home')

    const changeStepHandler = (step: Step) => {
        console.log('setting step', step)
        setStep(step)
    }

    const screenProps = {
        changeStepHandler
    }

    return (
        <div className="absolute top-[12%] left-[32%] z-[1] w-[368px] overflow-hidden">
            {step === 'home' ? <Welcome {...screenProps} /> : step === 'login' ? <LoginRegister {...screenProps} /> :undefined}            
        </div>
    )
}

export default TerminalScreen