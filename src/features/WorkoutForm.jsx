import { useRef, useState } from "react";
import TextInputWithLabel from "../shared/TextInputWithLabel.jsx";
import styled from "styled-components";
import Button from "../shared/Button.jsx";

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 0.5rem;
  width: fit-content;
`;

const initialWorkoutState = {
  exercise: "",
  sets: "",
  reps: "",
  weight: "",
};

function WorkoutForm({ onAddWorkout, isSaving }) {
  const exerciseInput = useRef("");
  const [workingWorkout, setWorkingWorkout] = useState(initialWorkoutState);

  function handleChange(e) {
    const { name, value } = e.target;
    setWorkingWorkout((prev) => ({ ...prev, [name]: value }));
  }

  function handleAddWorkout(event) {
    event.preventDefault();
    onAddWorkout({
      exercise: workingWorkout.exercise,
      sets: Number(workingWorkout.sets),
      reps: Number(workingWorkout.reps),
      weight:
        workingWorkout.weight === "" ? null : Number(workingWorkout.weight),
    });
    setWorkingWorkout(initialWorkoutState);
    exerciseInput.current.focus();
  }

  const isFormEmpty =
    workingWorkout.exercise.trim() === "" ||
    workingWorkout.sets === "" ||
    workingWorkout.reps === "";

  return (
    <StyledForm onSubmit={handleAddWorkout}>
      <TextInputWithLabel
        ref={exerciseInput}
        onChange={handleChange}
        value={workingWorkout.exercise}
        name="exercise"
        elementId="workoutExercise"
        labeltext="Exercise"
      />
      <TextInputWithLabel
        onChange={handleChange}
        value={workingWorkout.sets}
        name="sets"
        elementId="workoutSets"
        labeltext="Sets"
        type="number"
        min="1"
      />
      <TextInputWithLabel
        onChange={handleChange}
        value={workingWorkout.reps}
        name="reps"
        elementId="workoutReps"
        labeltext="Reps"
        type="number"
        min="1"
      />
      <TextInputWithLabel
        onChange={handleChange}
        value={workingWorkout.weight}
        name="weight"
        elementId="workoutWeight"
        labeltext="Weight (lbs)"
        type="number"
        min="0"
      />
      <Button
        type="submit"
        disabled={isFormEmpty}
        title={isFormEmpty ? "Fill out the form to add a workout" : ""}
      >
        {isSaving ? "Saving..." : "Add Workout"}
      </Button>
      {isFormEmpty && (
        <p style={{ fontSize: "0.8rem", color: "#c0392b", marginTop: "0" }}>
          Exercise, Sets, and Reps are required.
        </p>
      )}
    </StyledForm>
  );
}

export default WorkoutForm;
