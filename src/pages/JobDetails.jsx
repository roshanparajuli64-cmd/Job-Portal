import { Link, useParams } from "react-router-dom";
import { jobs } from "../data/jobs";

function JobDetails() {
  const { id } = useParams();

  const job = jobs.find((job) => job.id === Number(id));

  if (!job) {
    return (
      <div className="empty-state">
        <h2>Job Not Found</h2>
        <p>The job you are looking for does not exist.</p>

        <Link to="/jobs" className="details-button">
          Back to Jobs
        </Link>
      </div>
    );
  }

  return (
    <div className="job-details">
      <div className="details-header">
        <h1>{job.title}</h1>
        <h2>{job.company}</h2>

        <p>📍 {job.location}</p>
        <p>💼 {job.jobType}</p>
        <p>💰 {job.salary}</p>
      </div>

      <div className="details-section">
        <h2>Job Description</h2>
        <p>{job.description}</p>
      </div>

      <div className="details-section">
        <h2>Experience</h2>
        <p>{job.experience}</p>
      </div>

      <div className="details-section">
        <h2>Category</h2>
        <p>{job.category}</p>
      </div>

      <div className="details-section">
        <h2>Requirements</h2>

        <ul>
          {job.requirements.map((requirement, index) => (
            <li key={index}>{requirement}</li>
          ))}
        </ul>
      </div>

      <div className="details-actions">
        <Link to={`/apply/${job.id}`} className="apply-button">
          Apply Now
        </Link>

        <Link to="/jobs" className="back-button">
          Back to Jobs
        </Link>
      </div>
    </div>
  );
}

export default JobDetails;