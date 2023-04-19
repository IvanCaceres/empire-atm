export type Step = 'home' | 'login'

export interface ScreenBaseProps {
    changeStepHandler: (step: Step) => void
}