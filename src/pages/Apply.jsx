import React from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import ApplicationForm from "../components/ApplicationForm";

export default function Apply() {
  const { id } = useParams();

  const location = useLocation();
  const navigate = useNavigate();

  /*
    The existing JobCard can pass the complete job through
    React Router state:

    navigate(`/apply/${job.id}`, {
      state: { job }
    });

    This means we reuse the existing job object instead
    of creating another jobs.js file.
  */

  const job = location.state?.job;

  if (!job) {
    return (
      <div className="empty-page">
        <h1>Job Not Found</h1>

        <p>
          We could not find the job you are trying to apply for.
        </p>

        <p>
          Job ID: {id}
        </p>

        <button
          onClick={() => navigate("/jobs")}
        >
          Back to Jobs
        </button>
      </div>
    );
  }

  const handleSubmitted = () => {
    // Give the user the choice to view applications.
    // The application has already been saved to Context/localStorage.
  };

  return (
    <main className="apply-page">
      <div className="apply-container">
        <button
          className="back-button"
          onClick={() => navigate(-1)}
        >
          ← Back
        </button>

        <ApplicationForm
          job={job}
          onSubmitted={handleSubmitted}
        />

        <button
          className="applications-link"
          onClick={() => navigate("/applications")}
        >
          View My Applications
        </button>
      </div>
    </main>
  );
}