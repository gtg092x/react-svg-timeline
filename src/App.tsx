import * as React from 'react'
import { useTheme } from '@mui/material'

import { Timeline, createTimelineTheme } from './timeline'

export const App = () => {
  const materialTheme = useTheme()
  const theme = createTimelineTheme(materialTheme.palette.mode, materialTheme)

  const laneId = 'demo-lane'
  const laneId2 = 'demo-lane2'
  const lanes = [
    {
      laneId,
      label: 'Demo Lane',
    },
    {
      laneId: laneId2,
      label: 'Demo Lane2',
    },
  ]
  const events = [
    {
      eventId: 'event-1',
      laneId: laneId,
      startTimeMillis: 1399845600000,
    },
    {
      eventId: 'event-21',
      laneId: laneId2,
      startTimeMillis: 1399845600000,
    },
    {
      eventId: 'event-2',
      laneId,
      startTimeMillis: 1167606000000,
      endTimeMillis: 1230698892000,
    },
  ]
  const dateFormat = (ms: number) => new Date(ms).toLocaleString()
  return <Timeline width={600} height={300} events={events} lanes={lanes} dateFormat={dateFormat} theme={theme} />
}
