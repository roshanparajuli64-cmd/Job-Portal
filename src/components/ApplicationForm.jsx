import React, { useState } from "react";
import { useJobContext } from "../context/JobContext";

export default function ApplicationForm({ job, onSubmitted }) {
  const { addApplication } = useJobContext();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    coverLetter: "",
    resume: "",
  });

  const [errors, setErrors] = useState({});

  const [submittedApplication, setSubmittedApplication] =
    useState(null);

  // -----------------------------
  // Handle controlled inputs
  // -----------------------------
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }));

    // Remove error when user starts correcting field
    if (errors[name]) {
      setErrors((currentErrors) => ({
        ...currentErrors,
        [name]: "",
      }));
    }
  };

  // -----------------------------
  // Validate form
  // -----------------------------
  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required.";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailPattern.test(formData.email)) {
        newErrors.email = "Please enter a valid email address.";
      }
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required.";
    }

    if (!formData.coverLetter.trim()) {
      newErrors.coverLetter = "Cover letter is required.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // -----------------------------
  // Submit application
  // -----------------------------
  const handleSubmit = (event) => {
    event.preventDefault();

    const isValid = validateForm();

    if (!isValid) {
      return;
    }

    const application = {
      id: Date.now(),

      jobId: job.id,

      jobTitle:
        job.title ||
        job.jobTitle ||
        job.name ||
        "Job Position",

      company:
        job.company ||
        job.companyName ||
        "Company",

      location:
        job.location ||
        "Location not specified",

      applicant: {
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        coverLetter: formData.coverLetter,
        resume: formData.resume,
      },

      status: "Pending",

      appliedAt: new Date().toLocaleString(),
    };

    // Save application in Context
    addApplication(application);

    // Show summary
    setSubmittedApplication(application);

    // Clear form
    setFormData({
      fullName: "",
      email: "",
      phone: "",
      coverLetter: "",
      resume: "",
    });

    // Tell parent that submission happened
    if (onSubmitted) {
      onSubmitted(application);
    }
  };

  // -----------------------------
  // Application Summary
  // -----------------------------
  if (submittedApplication) {
    return (
      <div className="application-summary">
        <div className="summary-header">
          <h2>Application Submitted!</h2>
          <p>
            Your application has been successfully submitted.
          </p>
        </div>

        <div className="summary-card">
          <h3>Application Summary</h3>

          <div className="summary-row">
            <strong>Position:</strong>
            <span>{submittedApplication.jobTitle}</span>
          </div>

          <div className="summary-row">
            <strong>Company:</strong>
            <span>{submittedApplication.company}</span>
          </div>

          <div className="summary-row">
            <strong>Location:</strong>
            <span>{submittedApplication.location}</span>
          </div>

          <hr />

          <div className="summary-row">
            <strong>Name:</strong>
            <span>
              {submittedApplication.applicant.fullName}
            </span>
          </div>

          <div className="summary-row">
            <strong>Email:</strong>
            <span>
              {submittedApplication.applicant.email}
            </span>
          </div>

          <div className="summary-row">
            <strong>Phone:</strong>
            <span>
              {submittedApplication.applicant.phone}
            </span>
          </div>

          <div className="summary-row">
            <strong>Resume:</strong>
            <span>
              {submittedApplication.applicant.resume
                ? submittedApplication.applicant.resume
                : "Not provided"}
            </span>
          </div>

          <div className="summary-row">
            <strong>Status:</strong>
            <span className="status-badge">
              {submittedApplication.status}
            </span>
          </div>

          <div className="summary-row">
            <strong>Applied:</strong>
            <span>{submittedApplication.appliedAt}</span>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setSubmittedApplication(null)}
        >
          Apply Again
        </button>
      </div>
    );
  }

  // -----------------------------
  // Application Form
  // -----------------------------
  return (
    <form
      className="application-form"
      onSubmit={handleSubmit}
      noValidate
    >
      <div className="form-job-info">
        <h2>
          Apply for{" "}
          {job.title ||
            job.jobTitle ||
            job.name ||
            "this position"}
        </h2>

        <p>
          {job.company ||
            job.companyName ||
            "Company"}
        </p>

        {job.location && (
          <p>{job.location}</p>
        )}
      </div>

      {/* Full Name */}
      <div className="form-group">
        <label htmlFor="fullName">
          Full Name *
        </label>

        <input
          id="fullName"
          name="fullName"
          type="text"
          value={formData.fullName}
          onChange={handleChange}
          placeholder="Enter your full name"
        />

        {errors.fullName && (
          <p className="form-error">
            {errors.fullName}
          </p>
        )}
      </div>

      {/* Email */}
      <div className="form-group">
        <label htmlFor="email">
          Email *
        </label>

        <input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="example@email.com"
        />

        {errors.email && (
          <p className="form-error">
            {errors.email}
          </p>
        )}
      </div>

      {/* Phone */}
      <div className="form-group">
        <label htmlFor="phone">
          Phone *
        </label>

        <input
          id="phone"
          name="phone"
          type="tel"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Enter your phone number"
        />

        {errors.phone && (
          <p className="form-error">
            {errors.phone}
          </p>
        )}
      </div>

      {/* Resume */}
      <div className="form-group">
        <label htmlFor="resume">
          Resume / Resume Link
        </label>

        <input
          id="resume"
          name="resume"
          type="text"
          value={formData.resume}
          onChange={handleChange}
          placeholder="Paste your resume link"
        />
      </div>

      {/* Cover Letter */}
      <div className="form-group">
        <label htmlFor="coverLetter">
          Cover Letter *
        </label>

        <textarea
          id="coverLetter"
          name="coverLetter"
          value={formData.coverLetter}
          onChange={handleChange}
          placeholder="Write your cover letter..."
          rows="7"
        />

        {errors.coverLetter && (
          <p className="form-error">
            {errors.coverLetter}
          </p>
        )}
      </div>

      <button type="submit">
        Submit Application
      </button>
    </form>
  );
}