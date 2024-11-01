import { Label } from '@radix-ui/react-dropdown-menu'
import { Button } from './ui/button'
import { CardContent } from './ui/card'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea'

interface ProgramSettingsProps {
  selectedDays: string[]
  setSelectedDays: (days: string[]) => void
  sessionsPerDay: number
  setSessionsPerDay: (sessions: number) => void
  therapistNotes: string
  setTherapistNotes: (notes: string) => void
}

export const ProgramSettings: React.FC<ProgramSettingsProps> = ({
  selectedDays,
  setSelectedDays,
  sessionsPerDay,
  setSessionsPerDay,
  therapistNotes,
  setTherapistNotes,
}) => {
  const DAYS = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN']

  return (
    <CardContent className="space-y-6">
      {/* Days selection */}
      <div>
        <Label className="mb-2 block">Days of Week</Label>
        <div className="flex gap-2 flex-wrap">
          {DAYS.map((day) => (
            <Button
              key={day}
              variant={selectedDays.includes(day) ? 'default' : 'outline'}
              onClick={() => {
                setSelectedDays(
                  selectedDays.includes(day) ? selectedDays.filter((d) => d !== day) : [...selectedDays, day]
                )
              }}
            >
              {day}
            </Button>
          ))}
        </div>
      </div>

      {/* No of Sessions */}
      <div>
        <h3 className="font-medium mb-2">Sessions per Day</h3>
        <Input
          id="sessions"
          type="number"
          min="1"
          value={sessionsPerDay}
          onChange={(e) => setSessionsPerDay(parseInt(e.target.value) || 1)}
          className="w-32"
        />
      </div>

      {/* notes */}
      <div>
        <h3 className="font-medium mb-2">Therapist Notes</h3>
        <Textarea
          id="notes"
          value={therapistNotes}
          onChange={(e) => setTherapistNotes(e.target.value)}
          placeholder="Add notes about the exercise program..."
          rows={4}
        />
      </div>
    </CardContent>
  )
}
