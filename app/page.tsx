import Image from 'next/image'
import { Inter } from 'next/font/google'
import TerminalScreen from '@/components/TerminalScreen/TerminalScreen'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <div className="relative flex place-items-center after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px]">
        <TerminalScreen />
        <Image
          className="relative"
          src="/bg.webp"
          alt="Imperial Crest"
          unoptimized
          width={1024}
          height={1024}
          priority
        />
      </div>
    </main>
  )
}
