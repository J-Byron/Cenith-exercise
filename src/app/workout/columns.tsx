"use client";

import { ColumnDef } from "@tanstack/react-table";

export type Workout = {
  id?: string;
  exerciseName: string;
  time: string;
  exerciseType: "Cardio" | "Resistance" | "Stability" | "Body Weight";
  dateCompleted: string;
};

export const columns: ColumnDef<Workout>[] = [
  {
    accessorKey: "exerciseName",
    header: "Exercise Name",
  },
  {
    accessorKey: "time",
    header: "Time",
  },
  {
    accessorKey: "exerciseType",
    header: "Exercise Type",
  },
  {
    accessorKey: "dateCompleted",
    header: "Date Completed",
  },
];
