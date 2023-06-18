'use client'
import { Check, Copy } from "lucide-react";
import { useEffect, useState } from "react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";


function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)
  const copy = () => {
    setCopied(true);
    navigator.clipboard.writeText(text)
  }

  useEffect(() => {
    const timeout = setTimeout(() => setCopied(false), 2000)

    return () => {
      clearTimeout(timeout)
    }
  }, [copied])


  return (

    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger onClick={copy} className='flex items-center self-start justify-center p-1 mb-2 transition-all border rounded-md flex-end hover:bg-muted focus:outline-none'>
          {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
        </TooltipTrigger>
        <TooltipContent>
          Copy
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>

  )
}

export default CopyButton
