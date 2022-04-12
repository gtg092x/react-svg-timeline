import React, { CSSProperties } from 'react'
import { useTimelineTheme } from '../../../theme/useTimelineTheme'
import { G, Rect } from '../../../../svg/components'

const useTrimRangeStyle = (): CSSProperties => {
  const theme = useTimelineTheme().trimmer
  return {
    fill: theme.trimRangeOutsideColor,
    opacity: theme.trimRangeOutsideOpacity,
  }
}

interface Props {
  startX: number
  endX: number
  height: number
  width: number
}

export function TrimRange({ startX, endX, height, width }: Props) {
  const trimRangeStyle = useTrimRangeStyle()
  const [y1, y2] = [0, height]
  return (
    <G>
      {startX > 0 && <Rect style={trimRangeStyle} x={0} y={y1} width={startX} height={y2} />}
      {width - endX > 0 && <Rect style={trimRangeStyle} x={endX} y={y1} width={width - endX} height={y2} />}
    </G>
  )
}
