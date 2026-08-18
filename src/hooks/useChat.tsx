import { useCallback, useEffect, useRef, useState } from 'react'

import { buildChatPrompt } from '@/data/aiPrompt'
import type { SimulationRecord } from '@/data/simulation'
import { useSimulationStorage } from '@/hooks/useSimulationStorage'
import { getChatResponse } from '@/services/aiService'

export interface ChatMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: number
}

const CHAT_STORAGE_KEY = 'simulation-chat'

interface ChatStorage {
  [simulationId: string]: ChatMessage[]
}

const loadChatFromStorage = (simulationId: string): ChatMessage[] => {
  try {
    const storage = localStorage.getItem(CHAT_STORAGE_KEY)
    if (!storage) return []
    const parsed = JSON.parse(storage) as ChatStorage
    return parsed[simulationId] ?? []
  } catch {
    return []
  }
}

const saveChatToStorage = (simulationId: string, messages: ChatMessage[]) => {
  try {
    const storage = localStorage.getItem(CHAT_STORAGE_KEY)
    const parsed: ChatStorage = storage ? JSON.parse(storage) : {}
    parsed[simulationId] = messages
    localStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify(parsed))
  } catch {
  }
}

export const useChat = (simulationId: string) => {
  const isRequestPending = useRef(false)
  const { getFormData } = useSimulationStorage()

  const [messages, setMessages] = useState<ChatMessage[]>(() =>
    loadChatFromStorage(simulationId),
  )
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setMessages(loadChatFromStorage(simulationId))
  }, [simulationId])

  useEffect(() => {
    saveChatToStorage(simulationId, messages)
  }, [simulationId, messages])

  const sendMessage = useCallback(
    async (content: string) => {
      const simulation = getFormData(simulationId) as SimulationRecord | null

      if (!simulation) {
        setError('Simulação não encontrada.')
        return
      }

      if (isRequestPending.current) {
        return
      }

      const userMessage: ChatMessage = {
        id: crypto.randomUUID(),
        role: 'user',
        content,
        timestamp: Date.now(),
      }

      const historyForPrompt = messages.map(({ role, content }) => ({
        role,
        content,
      }))

      setMessages((prev) => [...prev, userMessage])
      setIsLoading(true)
      setError(null)
      isRequestPending.current = true

      try {
        const prompt = buildChatPrompt(simulation, content, historyForPrompt)
        const response = await getChatResponse(prompt)

        const assistantMessage: ChatMessage = {
          id: crypto.randomUUID(),
          role: 'assistant',
          content: response,
          timestamp: Date.now(),
        }

        setMessages((prev) => [...prev, assistantMessage])
      } catch {
        setError('Erro ao enviar a pergunta. Tente novamente.')
      } finally {
        setIsLoading(false)
        isRequestPending.current = false
      }
    },
    [simulationId, messages, getFormData],
  )

  const clearError = useCallback(() => {
    setError(null)
  }, [])

  return { messages, isLoading, error, sendMessage, clearError }
}
