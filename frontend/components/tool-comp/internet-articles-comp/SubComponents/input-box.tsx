'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { PlusCircle, Send, Upload } from "lucide-react"

export function InputBox() {
  const [input, setInput] = useState('')
  const [isExpanded, setIsExpanded] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value)
    if (e.target.value.length > 0 && !isExpanded) {
      setIsExpanded(true)
    } else if (e.target.value.length === 0 && isExpanded) {
      setIsExpanded(false)
    }
  }

  const handleSubmit = () => {
    console.log('Submitted:', input)
    setInput('')
    setIsExpanded(false)
  }

  return (
    // <div className="fixed bottom-0 left-0 right-0 bg-none p-4">
    <div className="w-full p-4">
      <div className="p-2 max-w-2xl mx-auto relative bg-purple-600/80 rounded-md shadow-2xl">
        <Textarea
          value={input}
          onChange={handleInputChange}
          placeholder="Enter your problem statement..."
          className={`mx-auto border-b-2 pr-24 transition-all duration-200 ease-in-out text-md ${
            isExpanded ? 'h-32' : 'h-12'
          }`}
        />
        <div className="flex space-x-2 p-2">
          <div className='w-[80%] flex justify-start'>
            <Button className='mr-2 bg-black text-white' size="icon" variant="ghost">
              <Upload className="h-4 w-4" />
              <span className="sr-only">Upload file</span>
            </Button>
            <Button className="bg-black text-white w-fit" variant="ghost">
              <PlusCircle className="h-4 w-4 mr-1" />
              <span >New chat</span>
            </Button>
          </div>
          <div className='w-[20%] flex justify-end'>
            <Button size="icon" onClick={handleSubmit} disabled={input.trim().length === 0}>
              <Send className="h-4 w-4" />
              <span className="sr-only">Get plan of action</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}