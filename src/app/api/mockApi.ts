import { ExerciseContextType } from "../workout/ExerciseContext";
import { Workout } from "../workout/columns";

const mockRequest = (data?: Workout | Workout[]) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(data);
    }, 1000);
  });
};

export class ExerciseAPI {
  public exerciseContext: ExerciseContextType;

  constructor(exerciseContext: ExerciseContextType) {
    this.exerciseContext = exerciseContext;
  }

  async getData(): Promise<Workout[]> {
    const { exercises: e } = this.exerciseContext;
    const data = await mockRequest(e);
    const exercises: Workout[] = data as Workout[];

    return exercises;
  }

  async addWorkout(newWorkout: Workout): Promise<Workout> {
    const { addWorkout } = this.exerciseContext;
    const data = await mockRequest(newWorkout);
    addWorkout(newWorkout);
    const exercise: Workout = data as Workout;
    return exercise;
  }
}
