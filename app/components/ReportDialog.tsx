"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Flag } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

export type ReportReason =
  | "spam"
  | "harassment"
  | "hate_speech"
  | "violence"
  | "inappropriate"
  | "misinformation"
  | "copyright"
  | "other"

interface ReportDialogProps {
  isOpen: boolean
  onClose: () => void
  onReport: (reason: ReportReason, details?: string) => void
  postId: string
}

export function ReportDialog({ isOpen, onClose, onReport, postId }: ReportDialogProps) {
  const [reason, setReason] = useState<ReportReason | null>(null)
  const [details, setDetails] = useState("")
  const { toast } = useToast()

  const handleSubmit = () => {
    if (!reason) {
      toast({
        title: "Please select a reason",
        description: "You must select a reason for reporting this content",
        variant: "destructive",
      })
      return
    }

    onReport(reason, details)
    toast({
      title: "Report submitted",
      description: "Thank you for helping keep our community safe",
    })
    resetForm()
    onClose()
  }

  const resetForm = () => {
    setReason(null)
    setDetails("")
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-[320px] p-4 gap-3">
        <DialogHeader className="pb-1 pt-1">
          <DialogTitle className="text-base flex items-center">
            <Flag className="h-4 w-4 mr-2 text-destructive" />
            Report Content
          </DialogTitle>
        </DialogHeader>

        <div className="text-xs text-muted-foreground mb-1">Please select a reason for reporting this content:</div>

        <RadioGroup value={reason || ""} onValueChange={(value) => setReason(value as ReportReason)} className="gap-1">
          <div className="flex items-center space-x-1.5 p-1 rounded-md hover:bg-muted/50">
            <RadioGroupItem value="spam" id="spam" className="h-3 w-3" />
            <Label htmlFor="spam" className="text-[11px] cursor-pointer">
              Spam or excessive posting
            </Label>
          </div>

          <div className="flex items-center space-x-1.5 p-1 rounded-md hover:bg-muted/50">
            <RadioGroupItem value="harassment" id="harassment" className="h-3 w-3" />
            <Label htmlFor="harassment" className="text-[11px] cursor-pointer">
              Harassment or bullying
            </Label>
          </div>

          <div className="flex items-center space-x-1.5 p-1 rounded-md hover:bg-muted/50">
            <RadioGroupItem value="hate_speech" id="hate_speech" className="h-3 w-3" />
            <Label htmlFor="hate_speech" className="text-[11px] cursor-pointer">
              Hate speech or discrimination
            </Label>
          </div>

          <div className="flex items-center space-x-1.5 p-1 rounded-md hover:bg-muted/50">
            <RadioGroupItem value="violence" id="violence" className="h-3 w-3" />
            <Label htmlFor="violence" className="text-[11px] cursor-pointer">
              Violence or threatening content
            </Label>
          </div>

          <div className="flex items-center space-x-1.5 p-1 rounded-md hover:bg-muted/50">
            <RadioGroupItem value="inappropriate" id="inappropriate" className="h-3 w-3" />
            <Label htmlFor="inappropriate" className="text-[11px] cursor-pointer">
              Inappropriate or sensitive content
            </Label>
          </div>

          <div className="flex items-center space-x-1.5 p-1 rounded-md hover:bg-muted/50">
            <RadioGroupItem value="misinformation" id="misinformation" className="h-3 w-3" />
            <Label htmlFor="misinformation" className="text-[11px] cursor-pointer">
              False information or misleading
            </Label>
          </div>

          <div className="flex items-center space-x-1.5 p-1 rounded-md hover:bg-muted/50">
            <RadioGroupItem value="copyright" id="copyright" className="h-3 w-3" />
            <Label htmlFor="copyright" className="text-[11px] cursor-pointer">
              Copyright or intellectual property violation
            </Label>
          </div>

          <div className="flex items-center space-x-1.5 p-1 rounded-md hover:bg-muted/50">
            <RadioGroupItem value="other" id="other" className="h-3 w-3" />
            <Label htmlFor="other" className="text-[11px] cursor-pointer">
              Other
            </Label>
          </div>
        </RadioGroup>

        <div className="space-y-1">
          <Label htmlFor="details" className="text-xs">
            Additional details (optional):
          </Label>
          <Textarea
            id="details"
            placeholder="Please provide any additional information..."
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            className="h-16 text-xs resize-none"
          />
        </div>

        <DialogFooter className="pt-1">
          <Button variant="outline" onClick={onClose} className="h-7 text-xs px-2">
            Cancel
          </Button>
          <Button onClick={handleSubmit} className="h-7 text-xs px-2" disabled={!reason}>
            Submit Report
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
