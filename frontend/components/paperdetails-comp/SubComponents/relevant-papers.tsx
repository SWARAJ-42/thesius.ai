import { Button } from "@/components/ui/button"
import { RelatedPapersLink } from "@/lib/paperdetails/schema"
import { MessageSquare } from "lucide-react"
import Link from "next/link"

interface Paper {
  title: string
  tldr: string
  year: number
  author: string
}

interface RelatedPapersLinkProps {
  results: RelatedPapersLink[]
}

export default function RelavantPapers({results} : RelatedPapersLinkProps) {
  const relatedPdfs: RelatedPapersLink[] = results
  return (
    <div className="container mx-auto p-4 max-w-3xl">
      <h2 className="text-2xl font-bold mb-6">Papers from the web which are similar to this paper for chat: </h2>
      <ul className="space-y-4">
        {relatedPdfs.map((paper, index) => (
          <>
            <li key={index} className="p-4 bg-card rounded-lg shadow">
              <div className="flex-grow mr-4">
                <h3 className="font-semibold">{paper.title}</h3>
                <p className="text-sm text-muted-foreground overflow-y-scroll max-h-16 p-2 bg-gray-100 rounded-xl my-3">{paper.description}</p>
              </div>
              <Link href={`${paper.url}`} className="whitespace-nowrap font-semibold bg-black p-2 rounded-md text-white text-sm">
                {/* <MessageSquare className="mr-2 h-4 w-4" /> */}
                Download
              </Link>
              <Link href={`${paper.url}`} className="whitespace-nowrap font-semibold bg-black mx-2 p-2 rounded-md text-white text-sm">
                {/* <MessageSquare className="mr-2 h-4 w-4" /> */}
                Chat with the paper
              </Link>
            </li>
          </>
        ))}
      </ul>
    </div>
  )
}