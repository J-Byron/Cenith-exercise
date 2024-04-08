"use client";
import { Workout } from "./workout/columns";
import { DataTable } from "./workout/data-table";
import { AlertDialogModal } from "./workout/AlertDialogModal";
import { useState } from "react";

const mockRequest = (data?: Workout | Workout[] | string) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(data);
    }, 500);
  });
};

export default function Home() {
  const [mockData, setMockData] = useState<Workout[]>([]);
  const [data, setData] = useState<Workout[]>([]);

  const handleAddWorkout = async (newExercise: Workout) => {
    const exercise = (await mockRequest(newExercise)) as Workout;
    setData([...data, exercise]);
  };

  const handleDeleteWorkout = async (id?: string) => {
    (await mockRequest(id)) as Workout;
    const newData = data.filter((workout: Workout) => id !== workout.id);
    setData([...newData]);
  };

  return (
    <div className="container mx-auto py-10">
      <div className="mb-4">
        <AlertDialogModal handleAddWorkout={handleAddWorkout} />
      </div>
      <div className="mb-4">
        <DataTable handleDeleteWorkout={handleDeleteWorkout} data={data} />
      </div>
    </div>
  );
}
