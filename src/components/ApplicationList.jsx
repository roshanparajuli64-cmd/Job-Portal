import React from "react";
import { useNavigate } from "react-router-dom";

export default function ApplicationList({
  applications,
  onRemove,
}) {
  const navigate = useNavigate();

  return (
    <div className="application-list">
      {applications.map((application) => (
        <div
          className="application-card"
          key={application.id}
        >
          <div className="application-card-header">
            <div>
              <h3>
                {application.jobTitle}
              </h3>

              <p>
                {application.company}
              </p>

              <p>
                {application.location}
              </p>
            </div>

            <span className="status-badge">
              {application.status}
            </span>
          </div>

          <div className="application-details">
            <div>
              <strong>Applicant</strong>
              <p>
                {application.applicant?.fullName}
              </p>
            </div>

            <div>
              <strong>Email</strong>
              <p>
                {application.applicant?.email}
              </p>
            </div>

            <div>
              <strong>Phone</strong>
              <p>
                {application.applicant?.phone}
              </p>
            </div>

            <div>
              <strong>Applied</strong>
              <p>
                {application.appliedAt}
              </p>
            </div>
          </div>

          <div className="application-cover-letter">
            <strong>Cover Letter</strong>

            <p>
              {application.applicant?.coverLetter}
            </p>
          </div>

          {application.applicant?.resume && (
            <div className="application-resume">
              <strong>Resume:</strong>{" "}

              <a
                href={application.applicant.resume}
                target="_blank"
                rel="noreferrer"
              >
                View Resume
              </a>
            </div>
          )}

          <div className="application-actions">
            <button
              type="button"
              onClick={() => {
                navigate(
                  `/jobs/${application.jobId}`
                );
              }}
            >
              View Job
            </button>

            <button
              type="button"
              onClick={() => onRemove(application.id)}
            >
              Remove Application
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}