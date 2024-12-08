import { Skeleton } from "@/components/ui/skeleton"
import { Sparkles, Brain, Search } from 'lucide-react'

export default function PaperDetailSkeleton() {
  return (
      <div className="w-full mx-auto">
        <Skeleton className="h-[300px] w-full m-2" />
        <div className="flex">
          <Skeleton className="w-3/4 h-[600px] m-2"/>
          <Skeleton className="w-1/4 h-[600px] m-2 mr-0"/>
        </div>
      </div>
  )
}

