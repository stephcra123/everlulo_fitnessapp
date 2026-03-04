import WorkoutForm from "../features/WorkoutForm.jsx";

function AddExercisePage({ addWorkout, isSaving }) {
  return (
    <>
      <h2>Add Exercise</h2>
      <WorkoutForm onAddWorkout={addWorkout} isSaving={isSaving} />
    </>
  );
}

export default AddExercisePage;
