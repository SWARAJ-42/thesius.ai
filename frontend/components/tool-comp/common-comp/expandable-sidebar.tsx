"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ChevronRight, ChevronLeft, Home, Settings, Users, HelpCircle, Menu } from "lucide-react"

export function ExpandableSidebar() {
  const [isExpanded, setIsExpanded] = useState(false)
  const [isCompletelyHidden, setIsCompletelyHidden] = useState(false)

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded)
  }

  const toggleFullSidebar = () => {
    setIsCompletelyHidden(!isCompletelyHidden)
  }

  return (
    <>
      <div
        className={`fixed sm:relative z-10 left-0 top-0 m-[1vh] h-[98vh] bg-green-300/50 backdrop-blur-lg transition-all duration-300 ease-in-out rounded-lg shadow-lg ${
          isCompletelyHidden ? '-translate-x-full' : isExpanded ? 'w-64' : 'w-16'
        }`}
      >
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between p-4">
            {isExpanded && <span className="text-lg font-semibold">Menu</span>}
            <Button variant="ghost" size="icon" onClick={toggleSidebar} className="ml-auto">
              {isExpanded ? <ChevronRight className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </Button>
          </div>

          <ScrollArea className="flex-grow">
            <nav className="space-y-2 p-2">
              <SidebarItem icon={<Home className="h-4 w-4" />} text="Home" isExpanded={isExpanded} />
              <SidebarItem icon={<Users className="h-4 w-4" />} text="Users" isExpanded={isExpanded} />
              <SidebarItem icon={<Settings className="h-4 w-4" />} text="Settings" isExpanded={isExpanded} />
              <SidebarItem icon={<HelpCircle className="h-4 w-4" />} text="Help" isExpanded={isExpanded} />
            </nav>
          </ScrollArea>
        </div>
      </div>

      <Button
        variant="ghost"
        size="icon"
        onClick={toggleFullSidebar}
        className={`sm:hidden z-10 fixed top-1/2 -translate-y-1/2 transition-all duration-300 ease-in-out p-2 m-2 rounded-full ${
          isCompletelyHidden ? 'left-0' : isExpanded ? 'left-64' : 'left-16'
        }`}
      >
        {isCompletelyHidden ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
      </Button>
    </>
  )
}

function SidebarItem({
  icon,
  text,
  isExpanded,
}: {
  icon: React.ReactNode
  text: string
  isExpanded: boolean
}) {
  return (
    <Button
      variant="ghost"
      className={`w-full ${isExpanded ? 'px-4 justify-start' : 'px-2 justify-center'}`}
    >
      {icon}
      {isExpanded && <span className="ml-2">{text}</span>}
    </Button>
  )
}
