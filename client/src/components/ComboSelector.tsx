import { Combo } from '@/types/types'
import { Label } from '@radix-ui/react-dropdown-menu'

// src/components/ExerciseProgram/components/ComboSelector.tsx
interface ComboSelectorProps {
  savedCombos: Combo[]
  onSelect: (combo: Combo) => void
}

export const ComboSelector: React.FC<ComboSelectorProps> = ({ savedCombos, onSelect }) => {
  return (
    <div className="space-y-1">
      <Label>Load Saved Combo</Label>
      <select
        id="savedCombos"
        className="w-full p-2 border rounded-md"
        onChange={(e) => {
          const combo = savedCombos.find((c) => c.id === e.target.value)
          if (combo) onSelect(combo)
        }}
      >
        <option value="">Select a saved combo</option>
        {savedCombos.map((combo) => (
          <option key={combo.id} value={combo.id}>
            {combo.name}
          </option>
        ))}
      </select>
    </div>
  )
}
