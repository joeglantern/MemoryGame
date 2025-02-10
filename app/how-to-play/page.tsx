"use client"

import * as React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function HowToPlay() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 space-y-8 bg-gradient-to-br from-purple-950 via-indigo-950 to-slate-950 text-indigo-200">
      <h1 className="text-4xl font-bold text-center bg-gradient-to-r from-purple-300 via-pink-300 to-indigo-300 text-transparent bg-clip-text">
        How to Play
      </h1>
      <div className="max-w-2xl text-center space-y-4">
        <p>1. Choose a difficulty level: Easy, Medium, or Hard.</p>
        <p>2. Click on cards to flip them over and reveal their icons.</p>
        <p>3. Try to match pairs of identical icons.</p>
        <p>4. If two flipped cards match, they'll stay face-up.</p>
        <p>5. If they don't match, they'll flip back over.</p>
        <p>6. Remember the positions of the icons to make matches more quickly.</p>
        <p>7. The game ends when all pairs are matched.</p>
        <p>8. Try to complete the game in the shortest time possible!</p>
      </div>
      <Link href="/game">
        <Button size="lg" className="bg-indigo-700 hover:bg-indigo-600 text-white">
          Start Game
        </Button>
      </Link>
      <Link href="/">
        <Button variant="link" className="text-indigo-300 hover:text-indigo-100">
          Back to Home
        </Button>
      </Link>
    </div>
  )
}

