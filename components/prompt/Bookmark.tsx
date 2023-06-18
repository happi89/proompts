'use client'
import { BookmarkMinus, BookmarkPlus, Check } from "lucide-react";
import { useEffect, useState } from "react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";
import { useToast } from "../ui/use-toast";

interface Props { id: string, saved: string[], userId: string }


function BookmarkButton({ id, saved, userId }: Props) {
  const [bookmarked, setBookmarked] = useState(false)
  const [showCheck, setShowCheck] = useState(false)
  const { toast } = useToast()

  const bookmarkPrompt = async () => {
    try {
      await fetch(`/api/prompt/${ id }`, {
        method: "POST"
      })

      setBookmarked(true);
      setShowCheck(true);
      toast({
        title: 'Prompt Saved Successfully!'
      })
    } catch (error) {
      toast({
        title: "Prompt Could not be Save :(",
        variant: 'destructive'
      })
    }
  }

  useEffect(() => {
    if (showCheck) {
      const timeout = setTimeout(() => setShowCheck(false), 2000);
      return () => clearTimeout(timeout);
    }
  }, [showCheck]);

  useEffect(() => {
    setBookmarked(saved.includes(userId))
  }, [])


  return (

    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger onClick={bookmarkPrompt} className='flex items-center self-start justify-center p-1 mb-2 transition-all border rounded-md flex-end hover:bg-muted focus:outline-none'>
          {showCheck ? (
            <Check className="w-4 h-4" />
          ) : bookmarked ? (
            <BookmarkMinus className="w-4 h-4" />
          ) : (
            <BookmarkPlus className="w-4 h-4" />
          )}
        </TooltipTrigger>
        <TooltipContent>
          Save
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>

  )
}

export default BookmarkButton
