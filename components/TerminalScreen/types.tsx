import { GetUserQuery } from "@/API";

export type Step = 'home' | 'login' | 'welcome' | 'transfer'
export type User = NonNullable<GetUserQuery['getUser']> | {
    username: string;
    id: string;
}

export interface ScreenBaseProps {
    changeStepHandler: (step: Step, user?: User) => void
    user?: User
    balance?: number
}