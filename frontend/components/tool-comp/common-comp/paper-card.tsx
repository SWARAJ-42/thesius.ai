"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { ExternalLink, TrendingUp, ChevronDown, ChevronUp, BookOpen } from "lucide-react"

export function PaperCard() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle className="text-xl font-bold">
          Construction of the Literature Graph in Semantic Scholar
        </CardTitle>
        <div className="flex flex-wrap gap-2 mt-2">
          <Badge variant="secondary">Computer Science</Badge>
          <Badge variant="secondary">Mathematics</Badge>
        </div>
      </CardHeader>
      <CardContent className="grid gap-4">
        <p className="text-sm text-muted-foreground">
          We describe a deployed scalable system for organizing published scientific literature into a heterogeneous graph to facilitate algorithmic manipulation and discovery.
        </p>
        <Collapsible open={isOpen} onOpenChange={setIsOpen}>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" className="flex w-full justify-between p-0">
              <span className="font-semibold">TLDR</span>
              {isOpen ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-2">
            <Card className="bg-secondary/10">
              <CardContent className="p-3">
                <p className="text-sm text-muted-foreground">
                  This paper reduces literature graph construction into familiar NLP tasks, point out research challenges due to differences from standard formulations of these tasks, and report empirical results for each task.
                </p>
              </CardContent>
            </Card>
          </CollapsibleContent>
        </Collapsible>
        <div className="grid grid-cols-2 gap-4">
          <Card className="bg-primary/5">
            <CardContent className="p-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <TrendingUp size={16} className="text-primary" />
                <span className="text-sm font-semibold">Citations:</span>
                <span className="text-lg font-bold text-primary">453</span>
              </div>
              <Badge variant="secondary" className="text-xs">
                90 influential
              </Badge>
            </CardContent>
          </Card>
          <Card className="bg-green-100">
            <CardContent className="p-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <BookOpen size={16} className="text-green-600" />
                <span className="text-sm font-semibold">Open Access</span>
              </div>
              <a
                href="https://www.aclweb.org/anthology/2020.acl-main.447.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-sm text-blue-600 hover:underline"
              >
                View PDF <ExternalLink size={14} />
              </a>
            </CardContent>
          </Card>
        </div>
      </CardContent>
    </Card>
  )
}