import React from 'react'
import { ScaleBand } from 'd3-scale'
import { TimelineLane } from '../model'
import { Axis } from './Axis'
import { useTimelineTheme } from '../theme/useTimelineTheme'
import { G, Text } from '../../svg/components'

export interface AxesProps<LID extends string> {
  lanes: ReadonlyArray<TimelineLane<LID>>
  yScale: ScaleBand<LID>
}

export const Axes = <LID extends string>({ lanes, yScale }: AxesProps<LID>) => {
  const theme = useTimelineTheme()
  const fontSize = 0.8 * yScale.bandwidth()

  return (
    <>
      {lanes.map((lane: TimelineLane<LID>) => {
        const labelXOffset = 10
        const labelYOffset = -0.5 * yScale.bandwidth()
        const y = yScale(lane.laneId)!
        return (
          <G key={`axis-${lane.laneId}`}>
            <Axis y={y} />
            <Text
              style={{
                fontSize: theme.lane.labelFontSize,
                fontFamily: theme.base.fontFamily,
                fontWeight: 600,
                opacity: 0.4,
              }}
              fontSize={fontSize}
              x={labelXOffset}
              y={y + labelYOffset}
              fill={lane.color || theme.lane.labelColor}
            >
              {lane.label}
            </Text>
          </G>
        )
      })}
    </>
  )
}
