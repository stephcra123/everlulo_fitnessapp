import WorkoutListItem from "./WorkoutListItem.jsx";
import styles from "./WorkoutList.module.css";

function WorkoutList({
  workoutList,
  onUpdateWorkout,
  onDeleteWorkout,
  isLoading,
}) {
  return (
    <>
      {isLoading ? (
        <p>Workout list loading...</p>
      ) : workoutList.length === 0 ? (
        <p>Add Exercises to start your first workout!</p>
      ) : (
        <ul className={styles.list}>
          {workoutList.map((workout) => (
            <WorkoutListItem
              key={workout.id}
              workout={workout}
              onUpdateWorkout={onUpdateWorkout}
              onDeleteWorkout={onDeleteWorkout}
            />
          ))}
        </ul>
      )}
    </>
  );
}

export default WorkoutList;
