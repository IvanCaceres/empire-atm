import { FC } from 'react'
import Image from 'next/image'

const Spinner: FC = () => {
    return (
        <Image
            className="relative imperial-emblem"
            src="/imperial-emblem.webp"
            alt="Imperial Emblem"
            width={100}
            height={100}
            unoptimized
            priority
        />
    )
}

export default Spinner