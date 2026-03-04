import { useState, useEffect } from "react";
import TextInputWithLabel from "../../shared/TextInputWithLabel.jsx";
import styles from "./WorkoutListItem.module.css";
import Button from "../../shared/Button.jsx";

function WorkoutListItem({ workout, onUpdateWorkout, onDeleteWorkout }) {
  const [isEditing, setIsEditing] = useState(false);
  const [workingWorkout, setWorkingWorkout] = useState({
    exercise: workout.exercise,
    sets: workout.sets,
    reps: workout.reps,
    weight: workout.weight,
  });

  useEffect(() => {
    setWorkingWorkout({
      exercise: workout.exercise,
      sets: workout.sets,
      reps: workout.reps,
      weight: workout.weight,
    });
  }, [workout]);

  function handleCancel() {
    setWorkingWorkout({
      exercise: workout.exercise,
      sets: workout.sets,
      reps: workout.reps,
      weight: workout.weight,
    });
    setIsEditing(false);
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setWorkingWorkout((prev) => ({ ...prev, [name]: value }));
  }

  function handleUpdate(event) {
    if (!isEditing) return;
    event.preventDefault();
    onUpdateWorkout({
      ...workout,
      exercise: workingWorkout.exercise,
      sets: Number(workingWorkout.sets),
      reps: Number(workingWorkout.reps),
      weight: Number(workingWorkout.weight),
    });
    setIsEditing(false);
  }

  return (
    <li className={styles.item}>
      <form>
        {isEditing ? (
          <>
            <TextInputWithLabel
              value={workingWorkout.exercise}
              onChange={handleChange}
              name="exercise"
              elementId="editExercise"
              labeltext="Exercise"
            />
            <TextInputWithLabel
              value={workingWorkout.sets}
              onChange={handleChange}
              name="sets"
              elementId="editSets"
              labeltext="Sets"
              type="number"
              min="1"
            />
            <TextInputWithLabel
              value={workingWorkout.reps}
              onChange={handleChange}
              name="reps"
              elementId="editReps"
              labeltext="Reps"
              type="number"
              min="1"
            />
            <TextInputWithLabel
              value={workingWorkout.weight}
              onChange={handleChange}
              name="weight"
              elementId="editWeight"
              labeltext="Weight (lbs)"
              type="number"
              min="0"
            />
            <Button onClick={handleCancel}>Cancel</Button>
            <Button onClick={handleUpdate}>Update</Button>
            <Button onClick={() => onDeleteWorkout(workout.id)}>Delete</Button>
          </>
        ) : (
          <div className={styles.details} onClick={() => setIsEditing(true)}>
            <strong>{workout.exercise}</strong>
            <span>Sets: {workout.sets}</span>
            <span>Reps: {workout.reps}</span>
            <span>Weight: {workout.weight} lbs</span>
          </div>
        )}
      </form>
    </li>
  );
}

export default WorkoutListItem;
