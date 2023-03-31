document.getElementById("export-form").addEventListener("submit", (event) => {
  event.preventDefault();

  const workoutData = [];

  const days = document.querySelectorAll(".day");
  days.forEach((day) => {
    const dayName = day.querySelector(".day-name").textContent;

    const exercises = [];
    const exerciseElements = day.querySelectorAll(".exercise");
    exerciseElements.forEach((exercise) => {
      const exerciseName = exercise.querySelector(".exercise-name").value;
      const exerciseReps = exercise.querySelector(".exercise-reps").value;
      const exerciseSeries = exercise.querySelector(".exercise-series").value;

      if (exerciseName && exerciseReps && exerciseSeries) {
        exercises.push({
          name: exerciseName,
          reps: exerciseReps,
          series: exerciseSeries,
        });
      }
    });

    if (exercises.length > 0) {
      workoutData.push({
        dayName,
        exercises,
      });
    }
  });

  if (workoutData.length === 0) {
    alert("Dados de treino não fornecidos");
  } else {
    const workoutDataInput = document.getElementById("workout-data-input");
    workoutDataInput.value = JSON.stringify(workoutData);
    event.target.submit();
  }
});
