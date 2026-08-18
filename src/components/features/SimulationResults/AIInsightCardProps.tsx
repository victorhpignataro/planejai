import 'react-loading-skeleton/dist/skeleton.css'

import { Send } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import Skeleton from 'react-loading-skeleton'

import { useChat, type ChatMessage } from '@/hooks/useChat'
import { useInsight } from '@/hooks/useInsight'

import { Button } from '../../shared/Button'
import { Divider } from '../../shared/Divider'
import { Content } from '../Insights/Content'
import { Error as InsightError } from '../Insights/Error'

interface AIInsightCardProps {
  simulationId: string
}

function ChatLoading() {
  return (
    <div className="flex items-start gap-3">
      <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-base">
        ✨
      </div>
      <div className="flex-1 rounded-2xl rounded-tl-none bg-muted p-4">
        <Skeleton
          count={3}
          baseColor="var(--color-skeleton-base)"
          highlightColor="var(--color-skeleton-highlight)"
          className="mb-2"
        />
      </div>
    </div>
  )
}

function ChatBubble({ message }: { message: ChatMessage }) {
  const isUser = message.role === 'user'

  return (
    <div
      className={`flex items-start gap-3 ${isUser ? 'flex-row-reverse' : ''}`}
    >
      <div
        className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full text-base ${
          isUser
            ? 'bg-primary text-primary-foreground'
            : 'bg-primary/10 text-primary'
        }`}
      >
        {isUser ? '👤' : '✨'}
      </div>
      <div
        className={`max-w-[80%] whitespace-pre-wrap rounded-2xl p-4 text-sm leading-relaxed ${
          isUser
            ? 'bg-primary text-primary-foreground rounded-tr-none'
            : 'bg-muted text-foreground rounded-tl-none'
        }`}
      >
        {message.content}
      </div>
    </div>
  )
}

export function AIInsightsCard({ simulationId }: AIInsightCardProps) {
  const { insight, isLoading, error, fetchInsight } = useInsight(simulationId)
  const {
    messages: chatMessages,
    isLoading: isChatLoading,
    error: chatError,
    sendMessage,
    clearError: clearChatError,
  } = useChat(simulationId)

  const [inputValue, setInputValue] = useState('')
  const chatContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight
    }
  }, [chatMessages, isChatLoading])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const trimmed = inputValue.trim()
    if (!trimmed || isChatLoading) return
    sendMessage(trimmed)
    setInputValue('')
  }

  return (
    <div className="bg-card order-2 flex flex-col rounded-2xl p-6 shadow-[4px_4px_18px_0px_rgba(0,0,0,0.2)] lg:order-1 lg:col-span-2">
      <div className="mb-3 flex items-center gap-1.5">
        <span>✨</span>
        <span className="text-primary text-xs font-semibold tracking-widest uppercase">
          Insight Financeiro Personalizado
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-6">
        <div className="lg:scrollbar-thin lg:max-h-93 lg:overflow-y-auto lg:pr-2 lg:[scrollbar-color:var(--border)_transparent]">
          {isLoading && (
            <div className="flex">
              <Skeleton
                count={10.5}
                baseColor="var(--color-skeleton-base)"
                highlightColor="var(--color-skeleton-highlight)"
                className="mb-3 flex rounded-lg"
                containerClassName="flex-1"
                inline
              />
            </div>
          )}
          {!isLoading && error && (
            <InsightError
              simulationId={simulationId}
              message={error}
              onRetry={() => {
                fetchInsight(simulationId)
              }}
            />
          )}
          {!isLoading && insight && !error && <Content insight={insight} />}
        </div>

        <Divider />

        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-1.5">
            <span>💬</span>
            <span className="text-primary text-xs font-semibold tracking-widest uppercase">
              Conversar com o Educador Financeiro
            </span>
          </div>

          {chatMessages.length > 0 && (
            <div
              ref={chatContainerRef}
              className="scrollbar-thin flex max-h-80 flex-col gap-4 overflow-y-auto rounded-xl bg-background/50 p-4 lg:[scrollbar-color:var(--border)_transparent]"
            >
              {chatMessages.map((msg) => (
                <ChatBubble key={msg.id} message={msg} />
              ))}
              {isChatLoading && <ChatLoading />}
            </div>
          )}

          {chatMessages.length === 0 && isChatLoading && (
            <div className="flex max-h-80 flex-col gap-4 overflow-y-auto rounded-xl bg-background/50 p-4">
              <ChatLoading />
            </div>
          )}

          {chatMessages.length === 0 && !isChatLoading && (
            <p className="text-muted-foreground text-sm">
              Tire suas dúvidas sobre sua simulação. Pergunte sobre formas de
              economizar, investimentos ou como ajustar sua meta.
            </p>
          )}

          {chatError && (
            <div className="flex items-center justify-between rounded-lg bg-red-50 p-3 dark:bg-red-900/20">
              <p className="text-sm text-red-600 dark:text-red-400">
                ⚠️ {chatError}
              </p>
              <button
                onClick={clearChatError}
                className="text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 text-xs font-medium"
              >
                Fechar
              </button>
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex gap-3">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Digite sua pergunta..."
              disabled={isChatLoading}
              className="text-foreground placeholder:text-muted-foreground w-full rounded-2xl bg-input p-4 text-sm outline-none shadow-[4px_4px_18px_0px_rgba(0,0,0,0.2)] disabled:opacity-60"
            />
            <Button
              type="submit"
              variant="primary"
              size="fit"
              className="h-auto px-5"
              disabled={isChatLoading || !inputValue.trim()}
            >
              <Send size={18} />
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}
