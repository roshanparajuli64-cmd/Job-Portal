import React from "react";
import { useJobContext } from "../context/JobContext";
import ApplicationList from "../components/ApplicationList";
import EmptyState from "../components/EmptyState";

export default function Applications() {
  const {
    applications,
    removeApplication,
  } = useJobContext();

  return (
    <main className="applications-page">
      <div className="applications-container">
        <div className="page-header">
          <h1>My Applications</h1>

          <p>
            View and manage the jobs you have applied for.
          </p>
        </div>

        {applications.length === 0 ? (
          <EmptyState
            title="No Applications Yet"
            message="You have not applied for any jobs yet. Find a job and submit your first application."
            buttonText="Browse Jobs"
            buttonLink="/jobs"
          />
        ) : (
          <>
            <div className="application-count">
              {applications.length}{" "}
              {applications.length === 1
                ? "Application"
                : "Applications"}
            </div>

            <ApplicationList
              applications={applications}
              onRemove={removeApplication}
            />
          </>
        )}
      </div>
    </main>
  );
}