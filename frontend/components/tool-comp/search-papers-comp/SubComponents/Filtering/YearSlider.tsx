import React from 'react'
import * as Slider from '@radix-ui/react-slider'

interface YearSliderProps {
  min: number
  max: number
  value: number
  onChange: (value: number) => void
}

export default function YearSlider({ min, max, value, onChange }: YearSliderProps) {
  return (
    <div className="space-y-2">
      <Slider.Root
        className="relative flex items-center select-none touch-none w-full h-5"
        defaultValue={[value]}
        min={min}
        max={max}
        step={1}
        onValueChange={(values) => onChange(values[0])}
        aria-label="Year"
      >
        <Slider.Track className="bg-gray-200 relative grow rounded-full h-2">
          <Slider.Range className="absolute bg-blue-500 rounded-full h-full" />
        </Slider.Track>
        <Slider.Thumb
          className="block w-5 h-5 bg-white shadow-md rounded-full hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </Slider.Root>
      <div className="flex justify-between text-sm text-gray-500">
        <span>{min}</span>
        <span>{value}</span>
        <span>{max}</span>
      </div>
    </div>
  )
}

