'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

interface TypingTextProps {
  texts: string[]
  className?: string
  typingSpeed?: number
  deletingSpeed?: number
  pauseDuration?: number
}

export default function TypingText({
  texts,
  className = '',
  typingSpeed = 80,
  deletingSpeed = 40,
  pauseDuration = 2000
}: TypingTextProps) {
  const [displayText, setDisplayText] = useState('')
  const [textIndex, setTextIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    const currentText = texts[textIndex]
    
    if (isPaused) {
      const pauseTimer = setTimeout(() => {
        setIsPaused(false)
        setIsDeleting(true)
      }, pauseDuration)
      return () => clearTimeout(pauseTimer)
    }
    
    if (isDeleting) {
      if (displayText === '') {
        setIsDeleting(false)
        setTextIndex((prev) => (prev + 1) % texts.length)
      } else {
        const timer = setTimeout(() => {
          setDisplayText(displayText.slice(0, -1))
        }, deletingSpeed)
        return () => clearTimeout(timer)
      }
    } else {
      if (displayText === currentText) {
        setIsPaused(true)
      } else {
        const timer = setTimeout(() => {
          setDisplayText(currentText.slice(0, displayText.length + 1))
        }, typingSpeed)
        return () => clearTimeout(timer)
      }
    }
  }, [displayText, isDeleting, isPaused, textIndex, texts, typingSpeed, deletingSpeed, pauseDuration])

  return (
    <span className={className}>
      {displayText}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.5, repeat: Infinity, repeatType: 'reverse' }}
        className="inline-block w-[2px] h-[1em] bg-current ml-1 align-middle"
      />
    </span>
  )
}
