import React, { createContext, useContext, useEffect, useState } from "react";

const JobContext = createContext();

export function JobProvider({ children }) {
  // -----------------------------
  // Saved Jobs
  // -----------------------------
  const [savedJobs, setSavedJobs] = useState(() => {
    try {
      const saved = localStorage.getItem("jobPortalSavedJobs");
      return saved ? JSON.parse(saved) : [];
    } catch (error) {
      console.error("Could not load saved jobs:", error);
      return [];
    }
  });

  // -----------------------------
  // Applications
  // -----------------------------
  const [applications, setApplications] = useState(() => {
    try {
      const saved = localStorage.getItem("jobPortalApplications");
      return saved ? JSON.parse(saved) : [];
    } catch (error) {
      console.error("Could not load applications:", error);
      return [];
    }
  });

  // Save applications whenever they change
  useEffect(() => {
    localStorage.setItem(
      "jobPortalApplications",
      JSON.stringify(applications)
    );
  }, [applications]);

  // Save saved jobs whenever they change
  useEffect(() => {
    localStorage.setItem(
      "jobPortalSavedJobs",
      JSON.stringify(savedJobs)
    );
  }, [savedJobs]);

  // -----------------------------
  // Save / Remove Job
  // -----------------------------
  const toggleSaveJob = (job) => {
    setSavedJobs((currentJobs) => {
      const alreadySaved = currentJobs.some(
        (savedJob) => String(savedJob.id) === String(job.id)
      );

      if (alreadySaved) {
        return currentJobs.filter(
          (savedJob) => String(savedJob.id) !== String(job.id)
        );
      }

      return [...currentJobs, job];
    });
  };

  // -----------------------------
  // Check if job is saved
  // -----------------------------
  const isJobSaved = (jobId) => {
    return savedJobs.some(
      (job) => String(job.id) === String(jobId)
    );
  };

  // -----------------------------
  // Add Application
  // -----------------------------
  const addApplication = (application) => {
    setApplications((currentApplications) => [
      ...currentApplications,
      application,
    ]);
  };

  // -----------------------------
  // Remove Application
  // -----------------------------
  const removeApplication = (applicationId) => {
    setApplications((currentApplications) =>
      currentApplications.filter(
        (application) => application.id !== applicationId
      )
    );
  };

  return (
    <JobContext.Provider
      value={{
        savedJobs,
        toggleSaveJob,
        isJobSaved,

        applications,
        addApplication,
        removeApplication,
      }}
    >
      {children}
    </JobContext.Provider>
  );
}

export function useJobContext() {
  const context = useContext(JobContext);

  if (!context) {
    throw new Error(
      "useJobContext must be used inside JobProvider"
    );
  }

  return context;
}

export default JobContext;