import * as React from 'react'
import { ZoomScale } from '../../shared/ZoomScale'
import { Cursor } from '../../model'
import { CursorLabel } from './CursorLabel'
import { useTimelineTheme } from '../../theme/useTimelineTheme'
import { InteractionMode } from './model'
import { G, Line, Rect } from '../../../svg/components'

const useCursorStyle = () => {
  const theme = useTimelineTheme().mouseCursor
  return {
    stroke: theme.lineColor,
    strokeWidth: theme.lineWidth,
  }
}

const useZoomRangeStyle = () => {
  const theme = useTimelineTheme().mouseCursor
  return {
    fill: theme.zoomRangeColor,
    opacity: theme.zoomRangeOpacity,
  }
}

interface Props {
  mousePosition: number
  cursorLabel: string
  cursor: Cursor
  interactionMode: InteractionMode
  zoomRangeStart: number
  zoomRangeEnd: number
  zoomScale: ZoomScale
  isZoomInPossible: boolean
}

export const MouseCursor = ({
  mousePosition,
  cursorLabel,
  cursor,
  interactionMode,
  zoomRangeStart,
  zoomRangeEnd,
  zoomScale,
  isZoomInPossible,
}: Props) => {
  if (isNaN(mousePosition)) {
    return <G />
  } else {
    const cursorComponent = () => {
      switch (interactionMode.type) {
        case 'animation in progress': {
          return <G />
        }
        case 'panning':
          return <PanningCursor mousePosition={mousePosition} />
        case 'rubber band': {
          const [start, end] =
            interactionMode.variant === 'anchored'
              ? [interactionMode.anchorX, undefined]
              : [interactionMode.anchorX, interactionMode.currentX]
          return <RubberBandCursor start={start} end={end} />
        }
        default:
          return (
            <ZoomCursor
              mousePosition={mousePosition}
              cursor={cursor}
              cursorLabel={cursorLabel}
              zoomScale={zoomScale}
              isZoomInPossible={isZoomInPossible}
              zoomRangeStart={zoomRangeStart}
              zoomRangeEnd={zoomRangeEnd}
            />
          )
      }
    }

    return (
      <G>
        {/* covering complete area prevents flickering cursor and asserts that mouse events are caught */}
        <Rect x={0} y={0} width={'100%'} height={'100%'} fill={'transparent'} />
        {cursorComponent()}
      </G>
    )
  }
}

/* ·················································································································· */

/*  Zoom
/* ·················································································································· */

interface ZoomCursorProps {
  mousePosition: number
  cursor: Cursor
  cursorLabel: string
  zoomScale: ZoomScale
  isZoomInPossible: boolean
  zoomRangeStart: number
  zoomRangeEnd: number
}

const ZoomCursor = ({
  mousePosition,
  cursor,
  cursorLabel,
  zoomScale,
  isZoomInPossible,
  zoomRangeStart,
  zoomRangeEnd,
}: ZoomCursorProps) => {
  const cursorStyle = useCursorStyle()
  const zoomRangeStyle = useZoomRangeStyle()
  return (
    <G>
      <Rect
        visibility={isZoomInPossible ? 'visible' : 'hidden'}
        style={zoomRangeStyle}
        x={zoomRangeStart}
        y={0}
        width={zoomRangeEnd - zoomRangeStart}
        height="100%"
        cursor={cursor}
      />
      <Line style={cursorStyle} x1={mousePosition} y1="0%" x2={mousePosition} y2="5%" cursor={cursor} />
      <CursorLabel
        x={mousePosition}
        y={isZoomInPossible ? '11%' : '15%'}
        cursor={cursor}
        overline={cursorLabel}
        label={isZoomInPossible ? zoomScale : ''}
      />
      <Line style={cursorStyle} x1={mousePosition} y1="23%" x2={mousePosition} y2="100%" cursor={cursor} />
    </G>
  )
}

/* ·················································································································· */

/*  Panning
/* ·················································································································· */

interface PanningProps {
  mousePosition: number
}

const PanningCursor = ({ mousePosition }: PanningProps) => {
  const cursorStyle = useCursorStyle()
  return (
    <G>
      <Line style={cursorStyle} x1={mousePosition} y1={'0%'} x2={mousePosition} y2={'100%'} cursor={'grab'} />
    </G>
  )
}

/* ·················································································································· */

/*  RubberBand
/* ·················································································································· */

interface RubberBandProps {
  start: number
  end?: number
}

const RubberBandCursor = ({ start, end }: RubberBandProps) => {
  const cursorStyle = useCursorStyle()
  const zoomRangeStyle = useZoomRangeStyle()

  const [y1, y2] = ['0%', '100%']
  return (
    <G>
      <Line style={cursorStyle} x1={start} y1={y1} x2={start} y2={y2} />
      {end && (
        <G>
          <Line style={cursorStyle} x1={end} y1={y1} x2={end} y2={y2} />
          <Rect style={zoomRangeStyle} x={Math.min(start, end)} y={y1} width={Math.abs(end - start)} height={y2} />
        </G>
      )}
    </G>
  )
}
