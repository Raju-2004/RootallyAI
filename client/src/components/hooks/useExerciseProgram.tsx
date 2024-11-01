// hooks/useExerciseProgram.ts
import { useState, useEffect } from 'react'
import axios from 'axios'
import { Category, Combo, Exercise, Program, SelectedExercise } from '@/types/types'

export const useExerciseProgram = () => {
  const [categories, setCategories] = useState<Category[]>([])
  const [exercises, setExercises] = useState<Exercise[]>([])
  const [selectedExercises, setSelectedExercises] = useState<SelectedExercise[]>([])
  const [savedCombos, setSavedCombos] = useState<Combo[]>([])
  const [programName, setProgramName] = useState('')
  const [description, setDescription] = useState('')
  const [selectedDays, setSelectedDays] = useState<string[]>([])
  const [sessionsPerDay, setSessionsPerDay] = useState(1)
  const [therapistNotes, setTherapistNotes] = useState('')
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null)

  useEffect(() => {
    fetchCategories()
    fetchExercises()
    fetchSavedCombos()
  }, [])

  // Updated API calls to match backend endpoints
  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/categories')
      setCategories(response.data)
    } catch (error) {
      console.error('Error fetching categories:', error)
    }
  }

  const fetchExercises = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/exercises')
      setExercises(response.data)
    } catch (error) {
      console.error('Error fetching exercises:', error)
    }
  }

  const fetchSavedCombos = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/combos')
      setSavedCombos(response.data)
    } catch (error) {
      console.error('Error fetching combos:', error)
    }
  }

  const saveAsCombo = async () => {
    const comboData: Partial<Combo> = {
      name: programName,
      description,
      exercises: selectedExercises,
    }

    try {
      await axios.post('http://localhost:3000/api/combos', comboData)
      fetchSavedCombos() // Refresh combos list
    } catch (error) {
      console.error('Error saving combo:', error)
    }
  }

  const saveAsProgram = async () => {
    const programData: Partial<Program> = {
      name: programName,
      description,
      exercises: selectedExercises,
      frequency: {
        daysPerWeek: selectedDays,
        sessionsPerDay,
      },
      therapistNotes,
    }

    try {
      await axios.post('http://localhost:3000/api/programs', programData)
    } catch (error) {
      console.error('Error saving program:', error)
    }
  }

  return {
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
    setCategories,
    description,
    setDescription,
    saveAsCombo,
    saveAsProgram,
  }
}
