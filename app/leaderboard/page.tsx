"use client"

import * as React from "react"
import NavMenu from "@/components/NavMenu"
import { motion } from "framer-motion"
import { Cog } from "lucide-react"

export default function LeaderboardPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gradient-to-br from-purple-950 via-indigo-950 to-slate-950">
      <NavMenu />
      
      {/* Background animations */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute top-1/3 right-1/3 w-72 h-72 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/2 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <motion.div 
        className="text-center space-y-6 mt-16"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-300 via-pink-300 to-indigo-300 text-transparent bg-clip-text">
          Leaderboard
        </h1>
        <div className="max-w-2xl mx-auto p-8 rounded-xl bg-indigo-950/50 backdrop-blur-sm border border-indigo-800/50">
          <div className="flex items-center justify-center mb-6">
            <Cog className="w-12 h-12 text-indigo-400 animate-spin" />
          </div>
          <h2 className="text-2xl font-semibold text-indigo-200 mb-4">
            I am working on it! 🚧
          </h2>
          <p className="text-indigo-300 mb-6">
            The leaderboard feature is currently under construction. Check back soon for:
          </p>
          <div className="space-y-4 text-indigo-200">
            <ul className="list-disc list-inside space-y-2 text-left">
              <li>Global rankings</li>
              <li>High scores for each difficulty</li>
              <li>Personal best tracking</li>
              <li>Daily challenges</li>
              <li>Achievement badges</li>
            </ul>
          </div>
        </div>
      </motion.div>
    </div>
  )
} 
