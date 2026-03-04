import { useState, useEffect, useCallback } from "react";
import { useLocation, Routes, Route } from "react-router";
import Dashboard from "./pages/Dashboard.jsx";
import Header from "./shared/Header.jsx";
import About from "./pages/About.jsx";
import NotFound from "./pages/NotFound.jsx";
import "./App.css";
import styles from "./App.module.css";
import AddExercisePage from "./pages/AddExercisePage.jsx";
import ErrorMessage from "./shared/ErrorMessages.jsx";

const url = `https://api.airtable.com/v0/${import.meta.env.VITE_BASE_ID}/${import.meta.env.VITE_TABLE_NAME}`;
const token = `Bearer ${import.meta.env.VITE_PAT}`;

function App() {
  const [workoutList, setWorkoutList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [sortField, setSortField] = useState("Date");
  const [sortDirection, setSortDirection] = useState("desc");
  const [queryString, setQueryString] = useState("");
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/") {
      document.title = "Workout Tracker";
    } else if (location.pathname === "/about") {
      document.title = "About";
    } else if (location.pathname === "/add-exercise") {
      document.title = "Add Exercise";
    } else {
      document.title = "Not Found";
    }
  }, [location.pathname]);

  const encodeUrl = useCallback(() => {
    let sortQuery = `sort[0][field]=${sortField}&sort[0][direction]=${sortDirection}`;
    let searchQuery = "";
    if (queryString) {
      searchQuery = `&filterByFormula=SEARCH("${queryString}", {Exercise})`;
    }
    return encodeURI(`${url}?${sortQuery}${searchQuery}`);
  }, [sortField, sortDirection, queryString]);

  useEffect(() => {
    const fetchWorkouts = async () => {
      setIsLoading(true);
      const options = { method: "GET", headers: { Authorization: token } };
      try {
        const resp = await fetch(encodeUrl(), options);
        if (!resp.ok) {
          throw new Error(resp.message);
        }
        const data = await resp.json();
        setWorkoutList(
          data.records.map((record) => ({
            id: record.id,
            exercise: record.fields.Exercise,
            sets: record.fields.Sets,
            reps: record.fields.Reps,
            weight: record.fields.Weight,
            date: record.fields.Date,
          })),
        );
      } catch (error) {
        setErrorMessage(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchWorkouts();
  }, [sortDirection, sortField, queryString]);

  const updateWorkout = async (editedWorkout) => {
    const originalWorkout = workoutList.find((w) => w.id === editedWorkout.id);
    setWorkoutList(
      workoutList.map((workout) =>
        workout.id === editedWorkout.id
          ? { ...workout, ...editedWorkout }
          : workout,
      ),
    );
    const payload = {
      records: [
        {
          id: editedWorkout.id,
          fields: {
            Exercise: editedWorkout.exercise,
            Sets: editedWorkout.sets,
            Reps: editedWorkout.reps,
            Weight: editedWorkout.weight,
          },
        },
      ],
    };
    const options = {
      method: "PATCH",
      headers: { Authorization: token, "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    };
    try {
      const resp = await fetch(encodeUrl(), options);
      if (!resp.ok) {
        throw new Error("Failed to update workout");
      }
    } catch (error) {
      setWorkoutList(
        workoutList.map((workout) =>
          workout.id === originalWorkout.id ? originalWorkout : workout,
        ),
      );
      setErrorMessage(error.message);
    }
  };

  const deleteWorkout = async (workoutId) => {
    setWorkoutList(workoutList.filter((workout) => workout.id !== workoutId));
    const options = {
      method: "DELETE",
      headers: { Authorization: token },
    };
    try {
      const resp = await fetch(`${url}/${workoutId}`, options);
      if (!resp.ok) {
        throw new Error("Failed to delete workout");
      }
    } catch (error) {
      setErrorMessage(error.message);
    }
  };
  const addWorkout = async (newWorkout) => {
    const payload = {
      records: [
        {
          fields: {
            Exercise: newWorkout.exercise,
            Sets: newWorkout.sets,
            Reps: newWorkout.reps,
            Weight: newWorkout.weight,
            Date: new Date().toISOString().split("T")[0],
          },
        },
      ],
    };
    const options = {
      method: "POST",
      headers: { Authorization: token, "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    };
    try {
      setIsSaving(true);
      const resp = await fetch(encodeUrl(), options);
      if (!resp.ok) {
        throw new Error("Failed to add workout");
      }
      const { records } = await resp.json();
      setWorkoutList([
        ...workoutList,
        {
          id: records[0].id,
          exercise: records[0].fields.Exercise,
          sets: records[0].fields.Sets,
          reps: records[0].fields.Reps,
          weight: records[0].fields.Weight,
          date: records[0].fields.Date,
        },
      ]);
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setIsSaving(false);
    }
  };

  const workoutState = { workoutList, isLoading, errorMessage, isSaving };

  return (
    <div className={styles.app}>
      <Header title="Workout Tracker" />
      <Routes>
        <Route
          path="/"
          element={
            <Dashboard
              workoutState={workoutState}
              addWorkout={addWorkout}
              updateWorkout={updateWorkout}
              deleteWorkout={deleteWorkout}
              sortDirection={sortDirection}
              setSortDirection={setSortDirection}
              sortField={sortField}
              setSortField={setSortField}
              queryString={queryString}
              setQueryString={setQueryString}
            />
          }
        />
        <Route path="/about" element={<About />} />
        <Route
          path="/add-exercise"
          element={
            <AddExercisePage addWorkout={addWorkout} isSaving={isSaving} />
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
      {errorMessage && (
        <ErrorMessage onDismiss={() => setErrorMessage("")}>
          {errorMessage}
        </ErrorMessage>
      )}
    </div>
  );
}
export default App;
