"use client"

import * as React from "react"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Heart, Star, Sun, Moon, Cloud, Flower2, Zap, Music, Smile, Coffee, Sparkles, 
  Flame, Snowflake, Lightbulb, Rainbow, Bird, Fish, Rocket, Diamond, Crown, 
  type LucideIcon, Volume2, VolumeX } from "lucide-react"
import { toast } from "sonner"
import Link from "next/link"
import { useRouter } from "next/navigation"
import NavMenu from "@/components/NavMenu"
import confetti from "canvas-confetti"

type MemoryCard = {
  id: number
  icon: LucideIcon
  isMatched: boolean
  color: string
  isSpecial?: boolean  // For special cards in higher difficulties
}

type Difficulty = "easy" | "medium" | "hard" | "expert" | "master"

const iconConfigs = [
  { icon: Heart, color: "text-rose-400" },
  { icon: Star, color: "text-amber-400" },
  { icon: Sun, color: "text-yellow-400" },
  { icon: Moon, color: "text-purple-400" },
  { icon: Cloud, color: "text-sky-400" },
  { icon: Flower2, color: "text-emerald-400" },
  { icon: Zap, color: "text-orange-400" },
  { icon: Music, color: "text-pink-400" },
  { icon: Smile, color: "text-green-400" },
  { icon: Coffee, color: "text-brown-400" },
  { icon: Sparkles, color: "text-yellow-400" },
  { icon: Flame, color: "text-red-400" },
  { icon: Snowflake, color: "text-blue-400" },
  { icon: Lightbulb, color: "text-yellow-500" },
  { icon: Rainbow, color: "text-purple-500" },
  { icon: Bird, color: "text-sky-500" },
  { icon: Fish, color: "text-cyan-400" },
  { icon: Rocket, color: "text-indigo-400" },
  { icon: Diamond, color: "text-violet-400" },
  { icon: Crown, color: "text-amber-500" }
]

const createCards = (difficulty: Difficulty) => {
  const pairCount = 
    difficulty === "easy" ? 6 : 
    difficulty === "medium" ? 8 : 
    difficulty === "hard" ? 10 :
    difficulty === "expert" ? 12 :
    15 // master level

  // Shuffle the icon configs first
  const shuffledConfigs = [...iconConfigs].sort(() => Math.random() - 0.5)
  const selectedIcons = shuffledConfigs.slice(0, pairCount)

  const cards: MemoryCard[] = []

  selectedIcons.forEach(({ icon, color }, index) => {
    if (difficulty === "expert" || difficulty === "master") {
      // Add special effects for higher difficulties
      const isSpecial = Math.random() > 0.7 // 30% chance for special cards
      const alternateColor = `text-${['rose', 'amber', 'emerald', 'purple', 'sky'][Math.floor(Math.random() * 5)]}-400`
      
      cards.push(
        { 
          id: index * 2, 
          icon, 
          color, 
          isMatched: false,
          isSpecial 
        },
        { 
          id: index * 2 + 1, 
          icon, 
          color: alternateColor, 
          isMatched: false,
          isSpecial 
        }
      )
    } else {
      cards.push(
        { id: index * 2, icon, color, isMatched: false },
        { id: index * 2 + 1, icon, color, isMatched: false }
      )
    }
  })

  return cards.sort(() => Math.random() - 0.5)
}

const matchMessages = ["Great match!", "You're on fire!", "Perfect pair!", "Awesome memory!", "Fantastic job!"]

// Sound paths configuration
const SOUND_PATHS = {
  flip: '/sounds/card-flip.mp3',
  match: '/sounds/match.mp3',
  victory: '/sounds/victory.mp3',
  bgm: '/sounds/background-music.mp3'
}

// BGM instance
const bgmSound = new Audio(SOUND_PATHS.bgm)
bgmSound.loop = true
bgmSound.volume = 0.2

export default function MemoryGame() {
  const [difficulty, setDifficulty] = useState<Difficulty>("easy")
  const [cards, setCards] = useState<MemoryCard[]>(createCards(difficulty))
  const [flippedIndexes, setFlippedIndexes] = useState<number[]>([])
  const [matches, setMatches] = useState(0)
  const [isChecking, setIsChecking] = useState(false)
  const [timer, setTimer] = useState(0)
  const [isGameActive, setIsGameActive] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isSoundOn, setIsSoundOn] = useState(true)
  const [isBgmPlaying, setIsBgmPlaying] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const loadGame = async () => {
      await new Promise((resolve) => setTimeout(resolve, 1500)) // Simulating load time
      setIsLoading(false)
    }
    loadGame()
  }, [])

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isGameActive) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer + 1)
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isGameActive])

  // Enhanced sound control functions
  const playSound = async (soundType: 'flip' | 'match' | 'victory') => {
    if (isSoundOn) {
      try {
        const sound = new Audio(SOUND_PATHS[soundType])
        sound.volume = soundType === 'flip' ? 0.4 : 0.5
        await sound.play()
      } catch (error) {
        console.error(`Error playing ${soundType} sound:`, error)
      }
    }
  }

  const toggleSound = async () => {
    setIsSoundOn(!isSoundOn)
    try {
      if (!isSoundOn) {
        await bgmSound.play()
        setIsBgmPlaying(true)
      } else {
        bgmSound.pause()
        setIsBgmPlaying(false)
      }
    } catch (error) {
      console.error('Error toggling sound:', error)
    }
  }

  // Start background music when game starts
  useEffect(() => {
    const startBgm = async () => {
      if (isGameActive && isSoundOn && !isBgmPlaying) {
        try {
          await bgmSound.play()
          setIsBgmPlaying(true)
        } catch (error) {
          console.error('Error playing background music:', error)
        }
      }
    }
    startBgm()
    return () => {
      bgmSound.pause()
      setIsBgmPlaying(false)
    }
  }, [isGameActive, isSoundOn])

  const handleCardClick = (clickedIndex: number) => {
    if (!isGameActive) {
      setIsGameActive(true)
    }
    if (
      isChecking ||
      cards[clickedIndex].isMatched ||
      flippedIndexes.includes(clickedIndex) ||
      flippedIndexes.length === 2
    )
      return

    playSound('flip')
    const newFlipped = [...flippedIndexes, clickedIndex]
    setFlippedIndexes(newFlipped)

    if (newFlipped.length === 2) {
      setIsChecking(true)
      const [firstIndex, secondIndex] = newFlipped
      const firstCard = cards[firstIndex]
      const secondCard = cards[secondIndex]

      if (firstCard.icon === secondCard.icon) {
        // Play match sound first, before any state updates
        playSound('match')
        
        setTimeout(async () => {
          setCards(
            cards.map((card, index) =>
              index === firstIndex || index === secondIndex ? { ...card, isMatched: true } : card,
            ),
          )
          setFlippedIndexes([])
          setMatches((m) => m + 1)
          setIsChecking(false)
          
          // Celebration animation
          confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
          })

          // Show match message
          toast(matchMessages[Math.floor(Math.random() * matchMessages.length)], {
            icon: <Sparkles className="w-5 h-5 text-yellow-400" />,
            className: "bg-indigo-900 text-indigo-100 border-indigo-700",
          })

          if (matches === cards.length / 2 - 1) {
            setIsGameActive(false)
            playSound('victory')
            toast("🎉 Congratulations! You've found all the matches! 🎈", {
              description: `Time: ${formatTime(timer)}`,
              className: "bg-purple-900 text-purple-100 border-purple-700",
            })
          }
        }, 500)
      } else {
        setTimeout(() => {
          setFlippedIndexes([])
          setIsChecking(false)
        }, 1000)
      }
    }
  }

  const resetGame = () => {
    setIsLoading(true)
    setTimeout(() => {
      setCards(createCards(difficulty))
      setFlippedIndexes([])
      setMatches(0)
      setIsChecking(false)
      setTimer(0)
      setIsGameActive(false)
      setIsLoading(false)
    }, 1000)
  }

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`
  }

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-purple-950 via-indigo-950 to-slate-950">
        <div className="w-16 h-16 border-4 border-indigo-400 border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-indigo-200">Loading game...</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 space-y-8 bg-gradient-to-br from-purple-950 via-indigo-950 to-slate-950 overflow-hidden">
      <NavMenu />

      {/* Sound toggle button */}
      <Button
        variant="ghost"
        size="icon"
        onClick={toggleSound}
        className="fixed top-20 right-4 z-50 text-indigo-200 hover:text-indigo-100"
      >
        {isSoundOn ? (
          <Volume2 className="w-6 h-6" />
        ) : (
          <VolumeX className="w-6 h-6" />
        )}
      </Button>

      {/* Background animations */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute top-1/3 right-1/3 w-72 h-72 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/2 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="text-center space-y-4 mt-16">
        <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-300 via-pink-300 to-indigo-300 text-transparent bg-clip-text">
          Memory Match Game
        </h1>
        <div className="flex flex-wrap justify-center items-center gap-4">
          <p className="text-indigo-200">
            Matches: {matches} / {cards.length / 2}
          </p>
          <p className="text-indigo-200">Time: {formatTime(timer)}</p>
          <Select
            value={difficulty}
            onValueChange={(value: Difficulty) => {
              setDifficulty(value)
              resetGame()
            }}
          >
            <SelectTrigger className="w-[120px] bg-indigo-950 border-indigo-700 text-indigo-200">
              <SelectValue placeholder="Difficulty" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="easy">Easy (6 pairs)</SelectItem>
              <SelectItem value="medium">Medium (8 pairs)</SelectItem>
              <SelectItem value="hard">Hard (10 pairs)</SelectItem>
              <SelectItem value="expert">Expert (12 pairs)</SelectItem>
              <SelectItem value="master">Master (15 pairs)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <motion.div
        className={`grid gap-2 sm:gap-4 p-2 sm:p-6 rounded-xl bg-indigo-950/50 backdrop-blur-sm ${
          difficulty === "easy"
            ? "grid-cols-3 sm:grid-cols-4"
            : difficulty === "medium"
              ? "grid-cols-4"
              : difficulty === "hard"
                ? "grid-cols-4 sm:grid-cols-5"
                : difficulty === "expert"
                  ? "grid-cols-4 sm:grid-cols-6"
                  : "grid-cols-5 sm:grid-cols-6"
        }`}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {cards.map((card, index) => (
          <motion.div
            key={card.id}
            initial={{ rotateY: 0 }}
            animate={{
              rotateY: card.isMatched || flippedIndexes.includes(index) ? 180 : 0,
            }}
            transition={{ duration: 0.3 }}
            className="perspective-1000"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Card
              className={`relative w-[70px] h-[70px] sm:w-20 sm:h-20 md:w-24 md:h-24 cursor-pointer transform-style-preserve-3d transition-transform duration-300 ${
                card.isMatched
                  ? "bg-indigo-900/50 border-indigo-400/50"
                  : flippedIndexes.includes(index)
                    ? "bg-indigo-800/50 border-indigo-500/50"
                    : "bg-indigo-950 border-indigo-800 hover:border-indigo-600 hover:bg-indigo-900/80"
              } ${card.isSpecial ? 'ring-2 ring-yellow-400/50' : ''}`}
              onClick={() => handleCardClick(index)}
              style={{
                transform: card.isMatched || flippedIndexes.includes(index) ? 'rotateY(180deg)' : 'rotateY(0deg)'
              }}
            >
              {/* Front face (shown when not flipped) */}
              <div 
                className={`absolute inset-0 flex items-center justify-center backface-hidden bg-indigo-950 ${
                  card.isSpecial ? 'bg-gradient-to-br from-indigo-950 to-purple-900' : ''
                }`}
                style={{
                  transform: 'rotateY(0deg)',
                  opacity: card.isMatched || flippedIndexes.includes(index) ? 0 : 1
                }}
              >
                <div className={`w-8 h-8 rounded-full bg-indigo-800/50 ${
                  card.isSpecial ? 'animate-pulse-slow' : ''
                }`}></div>
              </div>
              
              {/* Back face (shown when flipped) */}
              <div
                className={`absolute inset-0 flex items-center justify-center backface-hidden ${
                  card.isSpecial ? 'bg-gradient-to-br from-indigo-950 to-purple-900' : 'bg-indigo-950'
                } ${card.color}`}
                style={{
                  transform: 'rotateY(180deg)',
                  opacity: card.isMatched || flippedIndexes.includes(index) ? 1 : 0
                }}
              >
                {React.createElement(card.icon, { 
                  className: `w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 ${
                    card.isSpecial ? 'animate-pulse-slow drop-shadow-lg' : ''
                  }`,
                  style: { transform: 'rotateY(180deg)' }
                })}
              </div>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      <div className="flex flex-wrap justify-center gap-4">
        <Button
          onClick={resetGame}
          variant="outline"
          size="lg"
          className="bg-indigo-950 border-indigo-700 hover:bg-indigo-900 hover:border-indigo-500 text-indigo-200 hover:text-indigo-100"
        >
          New Game
        </Button>
        <Link href="/">
          <Button
            variant="outline"
            size="lg"
            className="bg-indigo-950 border-indigo-700 hover:bg-indigo-900 hover:border-indigo-500 text-indigo-200 hover:text-indigo-100"
          >
            Quit
          </Button>
        </Link>
      </div>

      <p className="text-sm text-indigo-400 mt-8">Developed by Joseph Liban M.</p>
    </div>
  )
}

