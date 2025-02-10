"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Github, Instagram, Phone, Mail, MessageSquare } from "lucide-react"
import NavMenu from "@/components/NavMenu"

export default function ContactPage() {
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
        className="relative z-10 max-w-4xl w-full mx-auto mt-16 p-8 rounded-2xl bg-indigo-950/50 backdrop-blur-sm border border-indigo-800/50"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="relative w-48 h-48 rounded-full overflow-hidden border-4 border-indigo-400/50">
            <Image
              src="/images/joe.jpg"
              alt="Joseph Liban"
              fill
              className="object-cover"
              priority
            />
          </div>
          
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-300 via-pink-300 to-indigo-300 text-transparent bg-clip-text mb-4">
              Joseph Liban M.
            </h1>
            <p className="text-xl text-indigo-200 mb-6">
              Full Stack Developer
            </p>
            <p className="text-indigo-300 mb-6">
              Looking for a custom web app, mobile app, or website? Let's work together to bring your vision to life!
            </p>
            
            <div className="flex flex-wrap justify-center md:justify-start gap-4">
              <Link 
                href="https://github.com/joeglantern/MemoryGame" 
                target="_blank"
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-900/50 hover:bg-indigo-800/50 text-indigo-200 transition-colors"
              >
                <Github className="w-5 h-5" />
                <span>GitHub</span>
              </Link>
              <Link 
                href="https://www.instagram.com/joe_.glantern/" 
                target="_blank"
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-pink-900/50 hover:bg-pink-800/50 text-pink-200 transition-colors"
              >
                <Instagram className="w-5 h-5" />
                <span>Instagram</span>
              </Link>
              <Link 
                href="https://www.tiktok.com/@joe_lib_an" 
                target="_blank"
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-900/50 hover:bg-slate-800/50 text-slate-200 transition-colors"
              >
                <MessageSquare className="w-5 h-5" />
                <span>TikTok</span>
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div 
            className="p-6 rounded-xl bg-indigo-900/30 border border-indigo-800/30"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <h2 className="text-2xl font-semibold text-indigo-200 mb-4">Contact Details</h2>
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-indigo-300">
                <Phone className="w-5 h-5" />
                <div>
                  <p>+254 734 414 914</p>
                  <p>+254 758 009 278</p>
                </div>
              </div>
              <div className="flex items-center gap-3 text-indigo-300">
                <Mail className="w-5 h-5" />
                <p>Contact me for email</p>
              </div>
            </div>
          </motion.div>

          <motion.div 
            className="p-6 rounded-xl bg-indigo-900/30 border border-indigo-800/30"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <h2 className="text-2xl font-semibold text-indigo-200 mb-4">Services</h2>
            <ul className="list-disc list-inside space-y-2 text-indigo-300">
              <li>Custom Web Applications</li>
              <li>Mobile App Development</li>
              <li>Responsive Websites</li>
              <li>E-commerce Solutions</li>
              <li>UI/UX Design</li>
            </ul>
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
} 