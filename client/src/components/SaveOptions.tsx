import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'

interface SaveOptionsProps {
  onSaveProgram: () => Promise<void>
  onSaveCombo: () => Promise<void>
  isSavingProgram: boolean
  isSavingCombo: boolean
}

const SaveOptions = ({ onSaveProgram, onSaveCombo, isSavingProgram, isSavingCombo }: SaveOptionsProps) => {
  return (
    <div className="flex justify-end gap-4">
      <Button variant="outline" onClick={onSaveProgram} disabled={isSavingProgram}>
        {isSavingProgram ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Saving Program...
          </>
        ) : (
          'Add as Exercise Program'
        )}
      </Button>
      <Button onClick={onSaveCombo} disabled={isSavingCombo}>
        {isSavingCombo ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Saving Combo...
          </>
        ) : (
          'Save as Combo'
        )}
      </Button>
    </div>
  )
}

export default SaveOptions
