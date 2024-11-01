// Updated interfaces to match backend schema
export interface Category {
  id: string
  name: string
  description: string
}

export interface Exercise {
  id: string
  categoryId: string
  name: string
  description: string
  defaultSets: number
  defaultReps: number
  defaultHoldTime: number
  requiresSide: boolean
}

export interface SelectedExercise {
  exerciseId: string
  sets: number
  reps: number
  holdTime: number
  side: 'left' | 'right' | 'both' | null
  order: number
  notes: string
}

export interface Program {
  id: string
  name: string
  description: string
  exercises: SelectedExercise[]
  frequency: {
    daysPerWeek: string[]
    sessionsPerDay: number
  }
  therapistNotes: string
  createdAt: string
}

export interface Combo {
  id: string
  name: string
  description: string
  exercises: SelectedExercise[]
  createdAt: string
}
