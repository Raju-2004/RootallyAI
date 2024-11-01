import { Card, CardContent } from '@/components/ui/card'
import { Exercise, SelectedExercise } from '@/types/types'
import { useExerciseProgram } from './hooks/useExerciseProgram'
import { ProgramHeader } from './ProgramHeader'
import { ProgramSettings } from './ProgramSettings'
import SelectedExercisesList from './ExerciseList'
import { useState } from 'react'
import SaveOptions from './SaveOptions'
import ExerciseCategoriesDropdown from './CategoriesDropdown'

const ExerciseProgram = () => {
  const [isSavingProgram, setIsSavingProgram] = useState(false)
  const [isSavingCombo, setIsSavingCombo] = useState(false)

  const {
    selectedExercises,
    setSelectedExercises,
    programName,
    setProgramName,
    selectedDays,
    setSelectedDays,
    sessionsPerDay,
    setSessionsPerDay,
    therapistNotes,
    setTherapistNotes,
    exercises,
    savedCombos,
    draggedIndex,
    setDraggedIndex,
    categories,
    description,
    setDescription,
    saveAsCombo,
    saveAsProgram,
  } = useExerciseProgram()

  const handleAddExercise = (exercise: Exercise) => {
    const newExercise: SelectedExercise = {
      exerciseId: exercise.id,
      sets: exercise.defaultSets,
      reps: exercise.defaultReps,
      holdTime: exercise.defaultHoldTime,
      side: exercise.requiresSide ? 'right' : null,
      order: selectedExercises.length + 1,
      notes: '',
    }
    setSelectedExercises([...selectedExercises, newExercise])
  }

  const handleClear = () => {
    setSelectedExercises([])
    setProgramName('')
    setDescription('')
    setSelectedDays([])
    setSessionsPerDay(1)
    setTherapistNotes('')
  }

  const handleSaveProgram = async () => {
    setIsSavingProgram(true)
    try {
      await saveAsProgram()
      await new Promise((resolve) => setTimeout(resolve, 1000))
      handleClear()
    } finally {
      setIsSavingProgram(false)
    }
  }

  const handleSaveCombo = async () => {
    setIsSavingCombo(true)
    try {
      await saveAsCombo()
      await new Promise((resolve) => setTimeout(resolve, 1000))
      handleClear()
    } finally {
      setIsSavingCombo(false)
    }
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <ProgramHeader
        programName={programName}
        setProgramName={setProgramName}
        description={description}
        setDescription={setDescription}
        savedCombos={savedCombos}
        onLoadCombo={(combo) => {
          setSelectedExercises(combo.exercises)
          setProgramName(combo.name)
          setDescription(combo.description)
        }}
        onClear={handleClear}
      />

      <CardContent className="space-y-6">
        {/* Exercise Categories Dropdown */}
        <ExerciseCategoriesDropdown categories={categories} exercises={exercises} onAddExercise={handleAddExercise} />

        {/* Selected Exercises List */}
        <SelectedExercisesList
          selectedExercises={selectedExercises}
          setSelectedExercises={setSelectedExercises}
          exercises={exercises}
          draggedIndex={draggedIndex}
          setDraggedIndex={setDraggedIndex}
        />

        {/* Program settings include days , sessions , notes */}
        <ProgramSettings
          selectedDays={selectedDays}
          setSelectedDays={setSelectedDays}
          sessionsPerDay={sessionsPerDay}
          setSessionsPerDay={setSessionsPerDay}
          therapistNotes={therapistNotes}
          setTherapistNotes={setTherapistNotes}
        />

        {/* Save Options */}
        <SaveOptions
          onSaveProgram={handleSaveProgram}
          onSaveCombo={handleSaveCombo}
          isSavingProgram={isSavingProgram}
          isSavingCombo={isSavingCombo}
        />
      </CardContent>
    </Card>
  )
}

export default ExerciseProgram
