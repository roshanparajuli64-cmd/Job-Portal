import React from "react";
import { useNavigate } from "react-router-dom";
import { useJobContext } from "../context/JobContext";
import EmptyState from "../components/EmptyState";

export default function SavedJobs() {
  const {
    savedJobs,
    toggleSaveJob,
  } = useJobContext();

  const navigate = useNavigate();

  return (
    <main className="saved-jobs-page">
      <div className="saved-jobs-container">
        <div className="page-header">
          <h1>Saved Jobs</h1>

          <p>
            Jobs you bookmark will appear here.
          </p>
        </div>

        {savedJobs.length === 0 ? (
          <EmptyState
            title="No Saved Jobs"
            message="You haven't saved any jobs yet. Browse available jobs and bookmark the ones you like."
            buttonText="Find Jobs"
            buttonLink="/jobs"
          />
        ) : (
          <div className="saved-jobs-list">
            {savedJobs.map((job) => (
              <div
                className="saved-job-card"
                key={job.id}
              >
                <div className="saved-job-info">
                  <h2>
                    {job.title ||
                      job.jobTitle ||
                      job.name ||
                      "Job Position"}
                  </h2>

                  <p className="saved-job-company">
                    {job.company ||
                      job.companyName ||
                      "Company"}
                  </p>

                  <p className="saved-job-location">
                    📍{" "}
                    {job.location ||
                      "Location not specified"}
                  </p>

                  {job.description && (
                    <p className="saved-job-description">
                      {job.description.length > 180
                        ? `${job.description.substring(
                            0,
                            180
                          )}...`
                        : job.description}
                    </p>
                  )}

                  {job.salary && (
                    <p>
                      <strong>
                        Salary:
                      </strong>{" "}
                      {job.salary}
                    </p>
                  )}
                </div>

                <div className="saved-job-actions">
                  <button
                    type="button"
                    onClick={() =>
                      navigate(
                        `/jobs/${job.id}`
                      )
                    }
                  >
                    View Job
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      navigate(
                        `/apply/${job.id}`,
                        {
                          state: {
                            job: job,
                          },
                        }
                      )
                    }
                  >
                    Apply
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      toggleSaveJob(job)
                    }
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}