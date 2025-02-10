import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 space-y-8 bg-gradient-to-br from-purple-950 via-indigo-950 to-slate-950 text-indigo-200">
      <h1 className="text-4xl md:text-6xl font-bold text-center bg-gradient-to-r from-purple-300 via-pink-300 to-indigo-300 text-transparent bg-clip-text animate-pulse-slow">
        Memory Match Game
      </h1>
      <p className="text-xl text-center max-w-md">
        Test your memory and have fun with our colorful card matching game!
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <Link href="/game">
          <Button size="lg" className="w-full sm:w-auto bg-indigo-700 hover:bg-indigo-600 text-white">
            Start Game
          </Button>
        </Link>
        <Link href="/how-to-play">
          <Button
            size="lg"
            variant="outline"
            className="w-full sm:w-auto bg-transparent border-indigo-700 text-indigo-200 hover:bg-indigo-900/50"
          >
            How to Play
          </Button>
        </Link>
      </div>
      <p className="text-sm text-indigo-400 mt-8">Developed by Joseph Liban M.</p>
    </div>
  )
}

