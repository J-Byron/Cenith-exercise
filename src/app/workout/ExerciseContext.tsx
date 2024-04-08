import React, { useContext, useState } from "react";
import { Workout } from "./columns";

interface ExerciseProviderProps {
  children: React.ReactNode;
}

export interface ExerciseContextType {
  exercises: Workout[];
  addWorkout: (exercise: Workout) => void;
  updateExercise: (id: string, updatedExercise: Workout) => void;
}

export const ExerciseContext = React.createContext<
  ExerciseContextType | undefined
>(undefined);

export const ExerciseProvider: React.FC<ExerciseProviderProps> = ({
  children,
}) => {
  const [exercises, setExercises] = useState<Workout[]>([]);

  const addWorkout = (exercise: Workout) => {
    setExercises((prevExercises) => [...prevExercises, exercise]);
  };

  const updateExercise = (id: string, updatedExercise: Workout) => {
    setExercises((prevExercises) =>
      prevExercises.map((exercise) =>
        exercise.id === id ? { ...exercise, ...updatedExercise } : exercise
      )
    );
  };

  return (
    <ExerciseContext.Provider value={{ exercises, addWorkout, updateExercise }}>
      {children}
    </ExerciseContext.Provider>
  );
};

export const useExerciseContext = () => {
  const context = useContext(ExerciseContext);
  if (!context) {
    throw new Error(
      "useExerciseContext must be used within an ExerciseProvider"
    );
  }
  return context;
};
