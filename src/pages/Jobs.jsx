import { useState } from "react";
import { jobs } from "../data/jobs";
import SearchInput from "../components/SearchInput";
import JobFilter from "../components/JobFilter";
import JobList from "../components/JobList";

function Jobs() {
  const [searchText, setSearchText] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedJobType, setSelectedJobType] = useState("");
  const [selectedExperience, setSelectedExperience] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const filteredJobs = jobs.filter((job) => {
    const search = searchText.toLowerCase();

    const matchesSearch =
      job.title.toLowerCase().includes(search) ||
      job.company.toLowerCase().includes(search) ||
      job.location.toLowerCase().includes(search);

    const matchesLocation =
      selectedLocation === "" || job.location === selectedLocation;

    const matchesJobType =
      selectedJobType === "" || job.jobType === selectedJobType;

    const matchesExperience =
      selectedExperience === "" ||
      job.experience === selectedExperience;

    const matchesCategory =
      selectedCategory === "" || job.category === selectedCategory;

    return (
      matchesSearch &&
      matchesLocation &&
      matchesJobType &&
      matchesExperience &&
      matchesCategory
    );
  });

  return (
    <div className="jobs-page">
      <div className="jobs-header">
        <h1>Find Your Dream Job</h1>
        <p>Explore opportunities from companies across Nepal.</p>
      </div>

      <SearchInput
        searchText={searchText}
        setSearchText={setSearchText}
      />

      <JobFilter
        selectedLocation={selectedLocation}
        setSelectedLocation={setSelectedLocation}
        selectedJobType={selectedJobType}
        setSelectedJobType={setSelectedJobType}
        selectedExperience={selectedExperience}
        setSelectedExperience={setSelectedExperience}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />

      <p className="job-count">
        {filteredJobs.length} job
        {filteredJobs.length !== 1 ? "s" : ""} found
      </p>

      <JobList jobs={filteredJobs} />
    </div>
  );
}

export default Jobs;