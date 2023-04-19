import {PropsWithChildren,FC} from 'react'
import clsx from 'clsx'

interface TypographyProps {
    Element?: 'p'
    variant?: TypographyVariants
    className?: string
    onClick?: () => void
}

type TypographyVariants = 'machine' | "p"

type VariantsDict = {
    [key in TypographyVariants]?: string
}

const VariantStyles: VariantsDict = {
    'machine': "text-black font-['Consolas'] text-[1.5rem] text-[rgb(var(--machine-text-rgb))] font-bold machine-text"
}

const Typography: FC<PropsWithChildren<TypographyProps>> = ({Element = "p", variant = "p", children, className, onClick}) => {
    return (
        <Element className={clsx(VariantStyles[variant], className)} onClick={onClick}>
            {children}
        </Element>
    )
}

export default Typography