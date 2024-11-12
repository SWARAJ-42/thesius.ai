import { Button } from "@/components/ui/button"
import { MessageSquare } from "lucide-react"

interface Paper {
  title: string
  tldr: string
  year: number
  author: string
}

export default function RelavantPapers() {
  // This would typically come from a prop or API call
  const papers: Paper[] = [
    {
      title: "Attention Is All You Need",
      tldr: "Introduces the Transformer model, revolutionizing NLP tasks.",
      year: 2017,
      author: "Vaswani et al."
    },
    {
      title: "BERT: Pre-training of Deep Bidirectional Transformers for Language Understanding",
      tldr: "Presents BERT, a powerful language model for various NLP tasks.",
      year: 2018,
      author: "Devlin et al."
    },
    {
      title: "GPT-3: Language Models are Few-Shot Learners",
      tldr: "Demonstrates the capabilities of large language models in few-shot learning scenarios.",
      year: 2020,
      author: "Brown et al."
    }
  ]

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6">Papers which are similar to this paper and have PDF for chatting</h2>
      <ul className="space-y-4">
        {papers.map((paper, index) => (
          <li key={index} className="flex items-center justify-between p-4 bg-card rounded-lg shadow">
            <div className="flex-grow mr-4">
              <h3 className="font-semibold">{paper.title}</h3>
              <p className="text-sm text-muted-foreground">{paper.tldr}</p>
              <div className="text-sm mt-1">
                <span className="mr-4">Year: {paper.year}</span>
                <span>Author: {paper.author}</span>
              </div>
            </div>
            <Button size="sm" className="whitespace-nowrap">
              <MessageSquare className="mr-2 h-4 w-4" />
              Chat
            </Button>
          </li>
        ))}
      </ul>
    </div>
  )
}