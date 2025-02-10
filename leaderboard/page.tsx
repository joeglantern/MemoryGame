"use client"

import { useState, useEffect } from "react"
import NavMenu from "@/components/NavMenu"
import { motion } from "framer-motion"

type LeaderboardEntry = {
  name: string
  score: number
  difficulty: string
}

export default function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([])

  useEffect(() => {
    // In a real application, you would fetch this data from a backend
    const mockLeaderboard: LeaderboardEntry[] = [
      { name: "Alice", score: 120, difficulty: "Hard" },
      { name: "Bob", score: 100, difficulty: "Medium" },
      { name: "Charlie", score: 90, difficulty: "Easy" },
      { name: "David", score: 85, difficulty: "Hard" },
      { name: "Eve", score: 80, difficulty: "Medium" },
    ]
    setLeaderboard(mockLeaderboard)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-950 via-indigo-950 to-slate-950 text-indigo-200">
      <NavMenu />
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-purple-300 via-pink-300 to-indigo-300 text-transparent bg-clip-text">
          Leaderboard
        </h1>
        <motion.div
          className="bg-indigo-900/50 backdrop-blur-sm rounded-lg shadow-lg overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <table className="w-full">
            <thead>
              <tr className="bg-indigo-800/50">
                <th className="px-6 py-3 text-left">Rank</th>
                <th className="px-6 py-3 text-left">Name</th>
                <th className="px-6 py-3 text-left">Score</th>
                <th className="px-6 py-3 text-left">Difficulty</th>
              </tr>
            </thead>
            <tbody>
              {leaderboard.map((entry, index) => (
                <motion.tr
                  key={index}
                  className="border-b border-indigo-800/30"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <td className="px-6 py-4">{index + 1}</td>
                  <td className="px-6 py-4">{entry.name}</td>
                  <td className="px-6 py-4">{entry.score}</td>
                  <td className="px-6 py-4">{entry.difficulty}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      </div>
    </div>
  )
}

