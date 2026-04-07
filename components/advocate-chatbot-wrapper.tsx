'use client'

import { useState, useEffect } from 'react'
import AdvocateChatbot from './advocate-chatbot'

export default function AdvocateChatbotWrapper() {
  const [isEnabled, setIsEnabled] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function checkSettings() {
      try {
        const response = await fetch('/api/settings/public')
        if (response.ok) {
          const data = await response.json()
          setIsEnabled(data.advocateChatEnabled)
        }
      } catch (error) {
        console.error('Failed to check chatbot settings:', error)
        setIsEnabled(true) // Default to enabled if check fails
      } finally {
        setIsLoading(false)
      }
    }
    checkSettings()
  }, [])

  if (isLoading || !isEnabled) {
    return null
  }

  return <AdvocateChatbot />
}
