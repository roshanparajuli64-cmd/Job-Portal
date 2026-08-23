function JobFilter({
  selectedLocation,
  setSelectedLocation,
  selectedJobType,
  setSelectedJobType,
  selectedExperience,
  setSelectedExperience,
  selectedCategory,
  setSelectedCategory,
}) {
  return (
    <div className="job-filters">
      <select
        value={selectedLocation}
        onChange={(e) => setSelectedLocation(e.target.value)}
      >
        <option value="">All Locations</option>
        <option value="Kathmandu">Kathmandu</option>
        <option value="Lalitpur">Lalitpur</option>
        <option value="Bhaktapur">Bhaktapur</option>
        <option value="Pokhara">Pokhara</option>
      </select>

      <select
        value={selectedJobType}
        onChange={(e) => setSelectedJobType(e.target.value)}
      >
        <option value="">All Job Types</option>
        <option value="Full Time">Full Time</option>
        <option value="Part Time">Part Time</option>
        <option value="Remote">Remote</option>
      </select>

      <select
        value={selectedExperience}
        onChange={(e) => setSelectedExperience(e.target.value)}
      >
        <option value="">All Experience Levels</option>
        <option value="Entry Level">Entry Level</option>
        <option value="Mid Level">Mid Level</option>
        <option value="Senior Level">Senior Level</option>
      </select>

      <select
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
      >
        <option value="">All Categories</option>
        <option value="Technology">Technology</option>
        <option value="Design">Design</option>
        <option value="Marketing">Marketing</option>
        <option value="Human Resources">Human Resources</option>
        <option value="Content">Content</option>
        <option value="Data">Data</option>
        <option value="Management">Management</option>
      </select>
    </div>
  );
}

export default JobFilter;