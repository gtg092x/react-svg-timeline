import React, { CSSProperties } from 'react'
import { useTimelineTheme } from '../../theme/useTimelineTheme'
import { Text, TSpan } from '../../../svg/components'

const useTextStyle = (fill?: string): CSSProperties => {
  const theme = useTimelineTheme()
  return {
    fill: fill ?? theme.mouseCursor.labelColor,
    textAnchor: 'middle',
    dominantBaseline: 'middle',
    fontFamily: theme.base.fontFamilyCaption,
    cursor: 'default',
  }
}

interface Props {
  x: number
  overline: string
  label: string
  y: number | string
  cursor: string
  fill?: string
}

export const CursorLabel = ({ x, y, overline, label, cursor, fill }: Props) => {
  const style = useTextStyle(fill)
  return (
    <Text style={style} x={x} y={y} cursor={cursor}>
      <TSpan x={x} cursor={cursor}>
        {overline}
      </TSpan>
      <TSpan x={x} dy={18} cursor={cursor}>
        {label}
      </TSpan>
    </Text>
  )
}
