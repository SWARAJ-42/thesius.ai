'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Search, ChevronRight } from 'lucide-react'

interface PaperCheckBox {
  id: string
  title: string
  authors: string
  year: number
}

const samplePapers: PaperCheckBox[] = [
  { id: '1', title: 'Attention Is All You Need', authors: 'Vaswani et al.', year: 2017 },
  { id: '2', title: 'BERT: Pre-training of Deep Bidirectional Transformers for Language Understanding', authors: 'Devlin et al.', year: 2018 },
  { id: '3', title: 'GPT-3: Language Models are Few-Shot Learners', authors: 'Brown et al.', year: 2020 },
  { id: '4', title: 'Deep Residual Learning for Image Recognition', authors: 'He et al.', year: 2016 },
  { id: '5', title: 'Generative Adversarial Networks', authors: 'Goodfellow et al.', year: 2014 },
]

export default function DiveDeeper() {
  const [papers, setPapers] = useState<PaperCheckBox[]>(samplePapers)
  const [selectedPapers, setSelectedPapers] = useState<string[]>([])
  const [searchTerm, setSearchTerm] = useState('')

  const filteredPapers = papers.filter(paper => 
    paper.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    paper.authors.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleSelectPaper = (paperId: string) => {
    setSelectedPapers(prev => 
      prev.includes(paperId) ? prev.filter(id => id !== paperId) : [...prev, paperId]
    )
  }

  const handleProceed = () => {
    console.log('Selected papers:', selectedPapers)
    // Here you would typically navigate to a chat interface or perform some action with the selected papers
  }

  return (
    <div className="max-w-4xl mx-auto p-4 bg-gray-200 min-h-full space-y-6 rounded-xl">
      <h1 className="text-lg font-bold">Select the papers from the results for further to chat with them</h1>
      <div className="relative">
        <Input
          type="text"
          placeholder="Search papers..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
      </div>
      <ul className="space-y-4">
        {filteredPapers.map(paper => (
          <li key={paper.id} className="flex items-center space-x-4 p-2 bg-white rounded-lg shadow">
            <Checkbox
              id={`paper-${paper.id}`}
              checked={selectedPapers.includes(paper.id)}
              onCheckedChange={() => handleSelectPaper(paper.id)}
            />
            <label htmlFor={`paper-${paper.id}`} className="flex-grow cursor-pointer">
              <h2 className="text-sm font-semibold">{paper.title}</h2>
              <p className="text-sm text-gray-600">{paper.authors} ({paper.year})</p>
            </label>
          </li>
        ))}
      </ul>
      {filteredPapers.length === 0 && (
        <p className="text-center text-gray-500">No papers found matching your search.</p>
      )}
      <div className="flex justify-end">
        <Button
          onClick={handleProceed}
          disabled={selectedPapers.length === 0}
          className="absolute bottom-10 flex items-center space-x-2"
        >
          <span>Chat with selected papers</span>
          <ChevronRight size={20} />
        </Button>
      </div>
    </div>
  )
}