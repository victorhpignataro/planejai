import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { HistoryCard } from '@/components/features/History/Card'
import type { SimulationRecord } from '@/data/simulation'
import { useSimulationStorage } from '@/hooks/useSimulationStorage'

export function SimulationHistoryPage() {
  const { getAllFormData } = useSimulationStorage()
  const navigate = useNavigate()

  const [simulationData, setSimulationData] =
    useState<SimulationRecord[]>(getAllFormData())

  return (
    <main className="mx-6 my-10 lg:mx-25">
      <h1 className="text-foreground text-3xl font-semibold sm:text-4xl">
        Histórico de simulações
      </h1>
      <p className="text-muted-foreground mt-2 text-sm">
        Acompanhe o histórico de seus planos financeiros.
      </p>
      <div className="mt-6 grid grid-cols-1 gap-6">
        {simulationData.map((simulation: SimulationRecord) => (
          <HistoryCard
            key={simulation.id}
            data={simulation}
            onDeleteSimulation={() => {
              setSimulationData(getAllFormData())
            }}
            onViewDetails={() => {
              navigate(`/resultado/${simulation.id}`)
            }}
          />
        ))}
      </div>
    </main>
  )
}
