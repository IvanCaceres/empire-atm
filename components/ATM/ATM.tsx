"use client"
import { FC, useState } from "react"
import Image from 'next/image'
import TerminalScreen from "../TerminalScreen/TerminalScreen"

const ATM: FC = () => {
    const [loaded, setLoaded] = useState(false)
    return (
        <div className="relative flex place-items-center">
            <Image
                className="relative"
                src="/bg.webp"
                alt="Imperial Crest"
                unoptimized
                width={1024}
                height={1024}
                priority
                onLoad={() => { setLoaded(true) }}
            />
            {loaded && <TerminalScreen />}
        </div>
    )
}

export default ATM