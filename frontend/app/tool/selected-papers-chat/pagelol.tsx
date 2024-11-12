// temporary
'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Checkbox } from "@/components/ui/checkbox"
import { MessageCircle, Upload, File } from "lucide-react"
import { ExpandableSidebar } from '@/components/tool-comp/common-comp/expandable-sidebar'

export default function ChatWithPDF() {
  const [chatMessages, setChatMessages] = useState([
    { role: 'system', content: 'Welcome to ChatWithPDF! How can I help you today?' },
  ])
  const [inputMessage, setInputMessage] = useState('')
  const [selectedPDFs, setSelectedPDFs] = useState<number[]>([])
  const [showSuggestedQuestions, setShowSuggestedQuestions] = useState(true)

  const suggestedQuestions = [
    "What are the key points of the first PDF?",
    "Can you summarize the second PDF?",
    "How do the PDFs relate to each other?",
  ]

  const pdfList = [
    { id: 1, title: "Introduction to Machine Learning", pages: 45 },
    { id: 2, title: "Advanced Data Structures", pages: 72 },
    { id: 3, title: "Web Development Best Practices", pages: 58 },
  ]

  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      setChatMessages([...chatMessages, { role: 'user', content: inputMessage }])
      setInputMessage('')
      setShowSuggestedQuestions(false)
      // Here you would typically send the message to your backend for processing
    }
  }

  const handleSuggestedQuestion = (question: string) => {
    setChatMessages([...chatMessages, { role: 'user', content: question }])
    setShowSuggestedQuestions(false)
    // Here you would typically send the question to your backend for processing
  }

  const handlePDFSelection = (pdfId: number) => {
    setSelectedPDFs(prev => 
      prev.includes(pdfId) 
        ? prev.filter(id => id !== pdfId) 
        : [...prev, pdfId]
    )
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <ExpandableSidebar />
      {/* Left Section - Chat Interface */}
      <div className="flex flex-col w-2/3 p-4 bg-white">
        <ScrollArea className="flex-grow mb-4 border rounded-lg p-4">
          {chatMessages.map((message, index) => (
            <div key={index} className={`mb-4 ${message.role === 'user' ? 'text-right' : 'text-left'}`}>
              <span className={`inline-block p-2 rounded-lg ${message.role === 'user' ? 'bg-blue-100' : 'bg-gray-100'}`}>
                {message.content}
              </span>
            </div>
          ))}
          {showSuggestedQuestions && (
            <div className="mt-4">
              <h3 className="mb-2 font-semibold">Suggested Questions:</h3>
              <div className="flex flex-wrap gap-2">
                {suggestedQuestions.map((question, index) => (
                  <Button key={index} variant="outline" onClick={() => handleSuggestedQuestion(question)}>
                    {question}
                  </Button>
                ))}
              </div>
            </div>
          )}
        </ScrollArea>
        <div className="flex gap-2">
          <Input
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Type your message here..."
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          />
          <Button onClick={handleSendMessage}>Send</Button>
        </div>
      </div>

      {/* Right Section - PDF List and Upload */}
      <div className="w-1/3 p-4 bg-gray-50">
        <Card className="mb-4">
          <CardHeader>
            <CardTitle>Upload PDF</CardTitle>
          </CardHeader>
          <CardContent>
            <Button className="w-full">
              <Upload className="mr-2 h-4 w-4" /> Upload PDF
            </Button>
          </CardContent>
        </Card>
        <h2 className="text-xl font-bold mb-4">Your PDFs</h2>
        <ScrollArea className="h-[calc(100vh-250px)]">
          {pdfList.map((pdf) => (
            <Card key={pdf.id} className="mb-4">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-lg">{pdf.title}</CardTitle>
                <Checkbox
                  id={`pdf-${pdf.id}`}
                  checked={selectedPDFs.includes(pdf.id)}
                  onCheckedChange={() => handlePDFSelection(pdf.id)}
                />
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-500">{pdf.pages} pages</p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  <File className="mr-2 h-4 w-4" /> View PDF
                </Button>
              </CardFooter>
            </Card>
          ))}
        </ScrollArea>
        {selectedPDFs.length > 0 && (
          <div className="mt-4">
            <Button className="w-full">
              Analyze Selected PDFs ({selectedPDFs.length})
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}