import React from 'react'
import { CardHeader } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@radix-ui/react-label'
import { ComboSelector } from './ComboSelector'
import { Combo } from '@/types/types'

interface ProgramHeaderProps {
  programName: string
  setProgramName: (name: string) => void
  description: string
  setDescription: (desc: string) => void
  savedCombos: Combo[]
  onLoadCombo: (combo: Combo) => void
  onClear: () => void
}

export const ProgramHeader: React.FC<ProgramHeaderProps> = ({
  programName,
  setProgramName,
  description,
  setDescription,
  savedCombos,
  onLoadCombo,
  onClear,
}) => {
  return (
    <CardHeader className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="space-y-1">
          <Label htmlFor="program">Program Name</Label>
          <Input id="program" value={programName} onChange={(e) => setProgramName(e.target.value)} className="w-64" />
        </div>
        <div className="space-y-1">
          <Label htmlFor="description">Description</Label>
          <Input
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-64"
          />
        </div>
        <Button onClick={onClear}>Clear All</Button>
      </div>

      <ComboSelector savedCombos={savedCombos} onSelect={onLoadCombo} />
    </CardHeader>
  )
}
