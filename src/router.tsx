import { createBrowserRouter } from 'react-router-dom'

import { RootLayout } from './components/layout/RootLayout'
// import { SimulationFormPage } from './pages/SimulationFormPage'
// import { SimulationResultsPage } from './pages/SimulationResultsPage'

export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        path: '/',
        // element: <SimulationFormPage />,
        element: <div>Opa</div>
      },
      {
        path: '/resultado/:id',
        // element: <SimulationResultsPage />,
        element: <div>Opa1</div>
      },
      {
        path: '/historico',
        element: <h1>Histórico de Simulações</h1>,
      },
    ],
  },
])