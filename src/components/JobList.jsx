import JobCard from "./JobCard";

function JobList({ jobs }) {
  if (jobs.length === 0) {
    return (
      <div className="empty-state">
        <h2>No Jobs Found</h2>
        <p>Try changing your search or filters.</p>
      </div>
    );
  }

  return (
    <div className="job-grid">
      {jobs.map((job) => (
        <JobCard key={job.id} job={job} />
      ))}
    </div>
  );
}

export default JobList;