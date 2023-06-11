'use client'
import { Check, Copy } from "lucide-react";
import { useEffect, useState } from "react";


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
    <button onClick={copy} className='flex items-center self-start justify-center p-1 mb-2 transition-all border rounded-md flex-end hover:bg-muted focus:outline-none'>
      {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
    </button>
  )
}

export default CopyButton
