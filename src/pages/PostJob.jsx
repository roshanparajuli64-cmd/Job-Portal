import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useJobs } from "../App";

function PostJob() {
    const navigate = useNavigate();
    const { addJob } = useJobs();

    const [formData, setFormData] = useState({
        title: "",
        company: "",
        location: "",
        jobType: "",
        experience: "",
        salary: "",
        category: "",
        description: "",
        requirements: "",
    });

    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState("");

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormData((previousData) => ({
            ...previousData,
            [name]: value,
        }));

        if (errors[name]) {
            setErrors((previousErrors) => ({
                ...previousErrors,
                [name]: "",
            }));
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.title.trim()) {
            newErrors.title = "Job title is required.";
        }

        if (!formData.company.trim()) {
            newErrors.company = "Company name is required.";
        }

        if (!formData.location.trim()) {
            newErrors.location = "Location is required.";
        }

        if (!formData.jobType) {
            newErrors.jobType = "Please select a job type.";
        }

        if (!formData.experience.trim()) {
            newErrors.experience = "Experience is required.";
        }

        if (!formData.salary.trim()) {
            newErrors.salary = "Salary is required.";
        }

        if (!formData.category) {
            newErrors.category = "Please select a category.";
        }

        if (!formData.description.trim()) {
            newErrors.description = "Job description is required.";
        }

        if (!formData.requirements.trim()) {
            newErrors.requirements = "Job requirements are required.";
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        if (!validateForm()) {
            return;
        }

        const newJob = {
            id: Date.now().toString(),

            title: formData.title.trim(),

            company: formData.company.trim(),

            location: formData.location.trim(),

            jobType: formData.jobType,

            experience: formData.experience.trim(),

            salary: formData.salary.trim(),

            category: formData.category,

            description: formData.description.trim(),

            requirements: formData.requirements
                .split("\n")
                .map((item) => item.trim())
                .filter((item) => item !== ""),

            postedBy: "Employer",

            postedDate: new Date().toISOString(),
        };

        addJob(newJob);

        setSuccessMessage("Job posted successfully!");

        setFormData({
            title: "",
            company: "",
            location: "",
            jobType: "",
            experience: "",
            salary: "",
            category: "",
            description: "",
            requirements: "",
        });

        setErrors({});

        setTimeout(() => {
            navigate("/jobs");
        }, 1200);
    };

    return (
        <main className="post-job-page">
            <div className="post-job-container">
                <div className="page-heading">
                    <p className="page-label">EMPLOYER</p>

                    <h1>Post a New Job</h1>

                    <p>
                        Create a job opportunity and connect with talented candidates.
                    </p>
                </div>

                {successMessage && (
                    <div className="success-message">
                        {successMessage}
                    </div>
                )}

                <form className="job-form" onSubmit={handleSubmit}>
                    <div className="form-section">
                        <h2>Basic Information</h2>

                        <div className="form-grid">
                            <div className="form-group">
                                <label htmlFor="title">
                                    Job Title <span>*</span>
                                </label>

                                <input
                                    type="text"
                                    id="title"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleChange}
                                    placeholder="e.g. Frontend Developer"
                                />

                                {errors.title && (
                                    <small className="error-text">{errors.title}</small>
                                )}
                            </div>

                            <div className="form-group">
                                <label htmlFor="company">
                                    Company <span>*</span>
                                </label>

                                <input
                                    type="text"
                                    id="company"
                                    name="company"
                                    value={formData.company}
                                    onChange={handleChange}
                                    placeholder="e.g. ABC Technologies"
                                />

                                {errors.company && (
                                    <small className="error-text">{errors.company}</small>
                                )}
                            </div>

                            <div className="form-group">
                                <label htmlFor="location">
                                    Location <span>*</span>
                                </label>

                                <input
                                    type="text"
                                    id="location"
                                    name="location"
                                    value={formData.location}
                                    onChange={handleChange}
                                    placeholder="e.g. Kathmandu, Nepal"
                                />

                                {errors.location && (
                                    <small className="error-text">{errors.location}</small>
                                )}
                            </div>

                            <div className="form-group">
                                <label htmlFor="jobType">
                                    Job Type <span>*</span>
                                </label>

                                <select
                                    id="jobType"
                                    name="jobType"
                                    value={formData.jobType}
                                    onChange={handleChange}
                                >
                                    <option value="">Select job type</option>
                                    <option value="Full Time">Full Time</option>
                                    <option value="Part Time">Part Time</option>
                                    <option value="Internship">Internship</option>
                                    <option value="Contract">Contract</option>
                                    <option value="Remote">Remote</option>
                                </select>

                                {errors.jobType && (
                                    <small className="error-text">{errors.jobType}</small>
                                )}
                            </div>

                            <div className="form-group">
                                <label htmlFor="experience">
                                    Experience <span>*</span>
                                </label>

                                <input
                                    type="text"
                                    id="experience"
                                    name="experience"
                                    value={formData.experience}
                                    onChange={handleChange}
                                    placeholder="e.g. 1-2 years"
                                />

                                {errors.experience && (
                                    <small className="error-text">
                                        {errors.experience}
                                    </small>
                                )}
                            </div>

                            <div className="form-group">
                                <label htmlFor="salary">
                                    Salary <span>*</span>
                                </label>

                                <input
                                    type="text"
                                    id="salary"
                                    name="salary"
                                    value={formData.salary}
                                    onChange={handleChange}
                                    placeholder="e.g. NPR 40,000 - 60,000"
                                />

                                {errors.salary && (
                                    <small className="error-text">{errors.salary}</small>
                                )}
                            </div>

                            <div className="form-group">
                                <label htmlFor="category">
                                    Category <span>*</span>
                                </label>

                                <select
                                    id="category"
                                    name="category"
                                    value={formData.category}
                                    onChange={handleChange}
                                >
                                    <option value="">Select category</option>
                                    <option value="IT & Software">IT & Software</option>
                                    <option value="Marketing">Marketing</option>
                                    <option value="Finance">Finance</option>
                                    <option value="Human Resources">Human Resources</option>
                                    <option value="Sales">Sales</option>
                                    <option value="Design">Design</option>
                                    <option value="Education">Education</option>
                                    <option value="Other">Other</option>
                                </select>

                                {errors.category && (
                                    <small className="error-text">{errors.category}</small>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="form-section">
                        <h2>Job Details</h2>

                        <div className="form-group full-width">
                            <label htmlFor="description">
                                Job Description <span>*</span>
                            </label>

                            <textarea
                                id="description"
                                name="description"
                                rows="6"
                                value={formData.description}
                                onChange={handleChange}
                                placeholder="Describe the job, responsibilities and role..."
                            />

                            {errors.description && (
                                <small className="error-text">
                                    {errors.description}
                                </small>
                            )}
                        </div>

                        <div className="form-group full-width">
                            <label htmlFor="requirements">
                                Requirements <span>*</span>
                            </label>

                            <textarea
                                id="requirements"
                                name="requirements"
                                rows="6"
                                value={formData.requirements}
                                onChange={handleChange}
                                placeholder={
                                    "Enter one requirement per line.\nExample:\nReact knowledge\nJavaScript knowledge\nGood communication skills"
                                }
                            />

                            {errors.requirements && (
                                <small className="error-text">
                                    {errors.requirements}
                                </small>
                            )}

                            <small className="input-help">
                                Write each requirement on a separate line.
                            </small>
                        </div>
                    </div>

                    <div className="form-actions">
                        <button
                            type="button"
                            className="secondary-button"
                            onClick={() => navigate("/jobs")}
                        >
                            Cancel
                        </button>

                        <button type="submit" className="primary-button">
                            Post Job
                        </button>
                    </div>
                </form>
            </div>
        </main>
    );
}

export default PostJob;