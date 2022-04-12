import * as React from 'react'
import { useTimelineTheme } from '../theme/useTimelineTheme'
import { Line } from '../../svg/components'

export const Axis = ({ y }: { y: number }) => {
  const theme = useTimelineTheme()
  return (
    <Line
      x1={0}
      y1={y}
      x2="100%"
      y2={y}
      style={{
        stroke: theme.lane.middleLineColor,
        strokeWidth: theme.lane.middleLineWidth,
      }}
    />
  )
}
