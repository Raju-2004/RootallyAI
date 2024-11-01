import React from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Menu, MoreVertical, Copy, Trash } from 'lucide-react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Label } from '@radix-ui/react-label'
import { Exercise, SelectedExercise } from '@/types/types'

interface SelectedExercisesListProps {
  selectedExercises: SelectedExercise[]
  setSelectedExercises: React.Dispatch<React.SetStateAction<SelectedExercise[]>>
  exercises: Exercise[]
  draggedIndex: number | null
  setDraggedIndex: React.Dispatch<React.SetStateAction<number | null>>
}

const SelectedExercisesList: React.FC<SelectedExercisesListProps> = ({
  selectedExercises,
  setSelectedExercises,
  exercises,
  draggedIndex,
  setDraggedIndex,
}) => {
  
  const handleDuplicate = (exercise: SelectedExercise, index: number) => {
    if (exercise.side === 'left' || exercise.side === 'right') {
      const newExercise: SelectedExercise = {
        ...exercise,
        side: exercise.side === 'left' ? 'right' : 'left',
        order: index + 2,
      }
      const newExercises = [...selectedExercises]
      newExercises.splice(index + 1, 0, newExercise)
      // Update order for subsequent exercises
      for (let i = index + 2; i < newExercises.length; i++) {
        newExercises[i].order = i + 1
      }
      setSelectedExercises(newExercises)
    }
  }

  const handleRemove = (index: number) => {
    const newExercises = selectedExercises.filter((_, i) => i !== index)
    // Update order for remaining exercises
    newExercises.forEach((exercise, i) => {
      exercise.order = i + 1
    })
    setSelectedExercises(newExercises)
  }

  const handleDragStart = (index: number) => {
    setDraggedIndex(index)
  }

  const handleDrop = (e: React.DragEvent, targetIndex: number) => {
    e.preventDefault()
    if (draggedIndex === null) return

    const newExercises = [...selectedExercises]
    const [draggedExercise] = newExercises.splice(draggedIndex, 1)
    newExercises.splice(targetIndex, 0, draggedExercise)
    // Update order after drag and drop
    newExercises.forEach((exercise, i) => {
      exercise.order = i + 1
    })
    setSelectedExercises(newExercises)
    setDraggedIndex(null)
  }

  return (
    <div className="space-y-4 max-h-[400px] overflow-y-auto">
      {selectedExercises.map((exercise, index) => {
        const exerciseDetails = exercises.find((e) => e.id === exercise.exerciseId)
        return (
          <div
            key={`${exercise.exerciseId}-${exercise.order}`}
            draggable
            onDragStart={() => handleDragStart(index)}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => handleDrop(e, index)}
            className="bg-gray-50 p-4 rounded-lg border border-gray-200"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Menu className="cursor-move text-gray-400" />
                <h3 className="font-medium">{exerciseDetails?.name}</h3>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {exerciseDetails?.requiresSide && exercise.side !== 'both' && (
                    <DropdownMenuItem onClick={() => handleDuplicate(exercise, index)}>
                      <Copy className="h-4 w-4 mr-2" />
                      Duplicate for other side
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem onClick={() => handleRemove(index)}>
                    <Trash className="h-4 w-4 mr-2" />
                    Remove
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <div className="grid grid-cols-4 gap-4">
              <div>
                <Label>Sets</Label>
                <Input
                  type="number"
                  value={exercise.sets}
                  onChange={(e) => {
                    const newExercises = [...selectedExercises]
                    newExercises[index].sets = parseInt(e.target.value) || 0
                    setSelectedExercises(newExercises)
                  }}
                />
              </div>
              <div>
                <Label>Reps</Label>
                <Input
                  type="number"
                  value={exercise.reps}
                  onChange={(e) => {
                    const newExercises = [...selectedExercises]
                    newExercises[index].reps = parseInt(e.target.value) || 0
                    setSelectedExercises(newExercises)
                  }}
                />
              </div>
              <div>
                <Label>Hold (s)</Label>
                <Input
                  type="number"
                  value={exercise.holdTime}
                  onChange={(e) => {
                    const newExercises = [...selectedExercises]
                    newExercises[index].holdTime = parseInt(e.target.value) || 0
                    setSelectedExercises(newExercises)
                  }}
                />
              </div>
              {exerciseDetails?.requiresSide && (
                <div>
                  <Label>Side</Label>
                  <select
                    value={exercise.side || 'both'}
                    onChange={(e) => {
                      const newExercises = [...selectedExercises]
                      newExercises[index].side = e.target.value as 'left' | 'right' | 'both'
                      setSelectedExercises(newExercises)
                    }}
                    className="w-full h-10 border rounded-md px-3"
                  >
                    <option value="left">Left</option>
                    <option value="right">Right</option>
                    <option value="both">Both</option>
                  </select>
                </div>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default SelectedExercisesList
