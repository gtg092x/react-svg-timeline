import React, { SVGAttributes } from 'react'

const m = (p) => p

type SvgProps = SVGAttributes<SVGElement>

export const Svg = React.forwardRef<SVGElement, SvgProps>((p, ref) => <svg ref={ref} {...m(p)} />)
export const G = React.forwardRef<SVGElement, SvgProps>((p, ref) => <g ref={ref} {...m(p)} />)
export const Text = React.forwardRef<SVGElement, SvgProps>((p, ref) => <text ref={ref} {...m(p)} />)
export const TSpan = React.forwardRef<SVGElement, SvgProps>((p, ref) => <tspan ref={ref} {...m(p)} />)
export const Line = React.forwardRef<SVGElement, SvgProps>((p, ref) => <line ref={ref} {...m(p)} />)
export const Circle = React.forwardRef<SVGElement, SvgProps>((p, ref) => <circle ref={ref} {...m(p)} />)
export const Rect = React.forwardRef<SVGElement, SvgProps>((p, ref) => <rect ref={ref} {...m(p)} />)
export const Defs = React.forwardRef<SVGElement, SvgProps>((p, ref) => <defs ref={ref} {...m(p)} />)
export const ClipPath = React.forwardRef<SVGElement, SvgProps>((p, ref) => <clipPath ref={ref} {...m(p)} />)
export const Path = React.forwardRef<SVGElement, SvgProps>((p, ref) => <path ref={ref} {...m(p)} />)
