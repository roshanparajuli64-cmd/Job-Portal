import {
  createContext,
  useContext,
  useState,
} from "react";

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Navbar from "./components/Navbar";
import PostJob from "./pages/PostJob";

import "./App.css";

/*
  ============================================================
  JOB CONTEXT
  ============================================================

  This context stores jobs that are created by the employer.

  If your team already has a JobContext / JobsContext,
  DO NOT create another one.

  Instead, use your team's existing context in PostJob.jsx.
*/

const JobContext = createContext(null);

export const useJobs = () => {
  const context = useContext(JobContext);

  if (!context) {
    throw new Error(
      "useJobs must be used inside JobProvider"
    );
  }

  return context;
};

function JobProvider({ children }) {
  /*
    Keep the initial jobs empty here if your team's existing
    job data is already provided by another context.

    If your project already has initial jobs, use those jobs
    instead of creating another job array.
  */

  const [jobs, setJobs] = useState([]);

  const addJob = (newJob) => {
    setJobs((previousJobs) => [
      ...previousJobs,
      newJob,
    ]);
  };

  const updateJob = (jobId, updatedJob) => {
    setJobs((previousJobs) =>
      previousJobs.map((job) =>
        String(job.id) === String(jobId)
          ? {
              ...job,
              ...updatedJob,
            }
          : job
      )
    );
  };

  const deleteJob = (jobId) => {
    setJobs((previousJobs) =>
      previousJobs.filter(
        (job) => String(job.id) !== String(jobId)
      )
    );
  };

  const value = {
    jobs,
    addJob,
    updateJob,
    deleteJob,
  };

  return (
    <JobContext.Provider value={value}>
      {children}
    </JobContext.Provider>
  );
}

/*
  ============================================================
  PAGE IMPORTS
  ============================================================

  These are examples of the existing team pages.

  Keep your team's existing imports if their filenames differ.
*/

import Home from "./pages/Home";
import Jobs from "./pages/Jobs";
import JobDetails from "./pages/JobDetails";
import Apply from "./pages/Apply";
import Applications from "./pages/Applications";
import Saved from "./pages/Saved";

function App() {
  return (
    <JobProvider>
      <BrowserRouter>
        <Navbar />

        <Routes>
          {/* Existing Home route */}
          <Route path="/" element={<Home />} />

          {/* Existing Jobs route */}
          <Route path="/jobs" element={<Jobs />} />

          {/* Existing Job Details route */}
          <Route
            path="/jobs/:id"
            element={<JobDetails />}
          />

          {/* Existing Application route */}
          <Route
            path="/apply/:id"
            element={<Apply />}
          />

          {/* Existing Applications route */}
          <Route
            path="/applications"
            element={<Applications />}
          />

          {/* Existing Saved Jobs route */}
          <Route
            path="/saved"
            element={<Saved />}
          />

          {/* Your Post Job route */}
          <Route
            path="/post-job"
            element={<PostJob />}
          />
        </Routes>
      </BrowserRouter>
    </JobProvider>
  );
}

export default App;