import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Exercise } from '@/types/types'

interface Category {
  id: string | number
  name: string
}

interface ExerciseCategoriesDropdownProps {
  categories: Category[]
  exercises: Exercise[]
  onAddExercise: (exercise: Exercise) => void
}

const ExerciseCategoriesDropdown = ({ categories, exercises, onAddExercise }: ExerciseCategoriesDropdownProps) => {
  return (
    <div className="flex flex-wrap gap-4">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">Add Exercise</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {categories.map((category) => (
            <DropdownMenuSub key={category.id}>
              <DropdownMenuSubTrigger>{category.name}</DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent>
                  {exercises
                    .filter((exercise) => exercise.categoryId === category.id)
                    .map((exercise) => (
                      <DropdownMenuItem key={exercise.id} onClick={() => onAddExercise(exercise)}>
                        {exercise.name}
                      </DropdownMenuItem>
                    ))}
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

export default ExerciseCategoriesDropdown
