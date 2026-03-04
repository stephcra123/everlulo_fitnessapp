import WorkoutList from "../features/WorkoutList/WorkoutList";
import WorkoutFilters from "../features/WorkoutFilters";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Button from "../shared/Button.jsx";

function Dashboard({
  workoutState,
  updateWorkout,
  deleteWorkout,
  sortDirection,
  setSortDirection,
  sortField,
  setSortField,
  queryString,
  setQueryString,
}) {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const uniqueDates = [
    ...new Set(workoutState.workoutList.map((workout) => workout.date)),
  ].sort((a, b) => new Date(b) - new Date(a));

  const totalPages = uniqueDates.length;
  const currentPage = parseInt(searchParams.get("page") || "1", 10);
  const currentDate = uniqueDates[currentPage - 1];
  const currentWorkouts = workoutState.workoutList.filter(
    (workout) => workout.date === currentDate,
  );

  const handleNextPage = () => {
    if (currentPage > 1) {
      setSearchParams({ page: currentPage - 1 });
    }
  };

  const handlePreviousPage = () => {
    if (currentPage < totalPages) {
      setSearchParams({ page: currentPage + 1 });
    }
  };

  useEffect(() => {
    if (totalPages > 0) {
      if (
        !Number.isInteger(currentPage) ||
        currentPage < 1 ||
        currentPage > totalPages
      ) {
        navigate("/");
      }
    }
  }, [currentPage, totalPages, navigate]);

  return (
    <>
      <div className="paginationControls">
        <Button
          onClick={handlePreviousPage}
          disabled={currentPage === totalPages}
        >
          Previous
        </Button>
        <h2>
          {currentDate
            ? new Date(currentDate).toLocaleDateString("en-US", {
                weekday: "long",
                month: "long",
                day: "numeric",
              })
            : "No workouts logged"}
        </h2>
        <Button onClick={handleNextPage} disabled={currentPage === 1}>
          Next
        </Button>
      </div>
      <WorkoutList
        onUpdateWorkout={updateWorkout}
        workoutList={currentWorkouts}
        onDeleteWorkout={deleteWorkout}
        isLoading={workoutState.isLoading}
      />
      <hr />
      <WorkoutFilters
        sortDirection={sortDirection}
        setSortDirection={setSortDirection}
        sortField={sortField}
        setSortField={setSortField}
        queryString={queryString}
        setQueryString={setQueryString}
      />
    </>
  );
}

export default Dashboard;
