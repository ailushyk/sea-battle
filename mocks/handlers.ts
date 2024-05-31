import { http, HttpResponse } from 'msw'
import { v4 } from 'uuid'

import { getApiUrl } from '@/services/api-service'

export const handlers = [
  // Intercept "GET https://example.com/user" requests...
  http.get('http://localhost:3000/api/user', () => {
    // ...and respond to them using this JSON response.
    return HttpResponse.json({
      id: 'c7b3d8e0-5e0b-4b0f-8b3a-3b9f4b3d3b3d',
      firstName: 'John',
      lastName: 'Maverick',
    })
  }),

  // http.post(getApiUrl('/adapters/game'), () => {
  http.post('http://localhost:3000/api/game', () => {
    return HttpResponse.json({
      id: v4(),
      players: [],
      rows: 10, // 10x10 grid, 100 cells, 5 ships
      cols: 10, // In the future, we can have different grid sizes
      status: 'setting-up',
      timestamp: Date.now(),
    })
  }),

  http.get(getApiUrl('/adapters/game/:id'), ({ params }) => {
    console.log('params', params)
    return HttpResponse.json({
      id: 'c7b3d8e0-5e0b-4b0f-8b3a-3b9f4b3d3b3d',
      name: 'Game 1',
    })
  }),
]
