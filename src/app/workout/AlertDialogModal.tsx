import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";

import React, { useState } from "react";
import { Workout } from "./columns";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { randomBytes } from "crypto";

interface AlertDialogModalProps {
  handleAddWorkout: (newWorkout: Workout) => Promise<void>;
}

export function AlertDialogModal({ handleAddWorkout }: AlertDialogModalProps) {
  const today = format(new Date(), "MM/dd/yyyy");
  const [date, setDate] = useState<string | any>(today);

  const [formData, setFormData] = useState<Workout>({
    exerciseName: "",
    time: "",
    exerciseType: "Cardio",
    dateCompleted: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    const uuid = randomBytes(20).toString("hex");
    const newWorkout = {
      ...formData,
      dateCompleted: format(date, "MM/dd/yyyy"),
      id: uuid,
    };

    handleAddWorkout(newWorkout);
    setFormData({
      exerciseName: "",
      time: "",
      exerciseType: "Cardio",
      dateCompleted: "",
    });
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline">Record Workout</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Record Workout</AlertDialogTitle>
        </AlertDialogHeader>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <div className="flex flex-row space-x-4">
            <Input
              placeholder="Exercise Name"
              type="text"
              id="exerciseName"
              name="exerciseName"
              value={formData.exerciseName}
              onChange={handleChange}
            />
            <Input
              placeholder="Time"
              type="text"
              id="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-row space-x-4">
            <div className="flex-1">
              <select
                id="exerciseType"
                name="exerciseType"
                value={formData.exerciseType}
                onChange={handleChange}
                className="p-2 border rounded-md w-full"
              >
                <option value="Cardio">Cardio</option>
                <option value="Resistance">Resistance</option>
                <option value="Stability">Stability</option>
                <option value="Body Weight">Body Weight</option>
              </select>
            </div>
            <div className="flex-1">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "justify-start text-left font-normal w-full",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? (
                      format(date, "MM/dd/yyyy")
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction asChild>
              <Button type="submit">Submit</Button>
            </AlertDialogAction>
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
}
