import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="home-page">
      <section className="hero">
        <div className="hero-content">
          <h1>Find Your Dream Job</h1>

          <p>
            Discover exciting career opportunities from companies across
            Nepal.
          </p>

          <Link to="/jobs" className="hero-button">
            Explore Jobs
          </Link>
        </div>
      </section>

      <section className="home-info">
        <h2>Why Use Our Job Portal?</h2>

        <div className="info-grid">
          <div className="info-card">
            <h3>🔍 Easy Search</h3>
            <p>
              Quickly find jobs using our powerful search and filtering
              system.
            </p>
          </div>

          <div className="info-card">
            <h3>💼 Multiple Opportunities</h3>
            <p>
              Explore jobs from technology, design, marketing and many
              other industries.
            </p>
          </div>

          <div className="info-card">
            <h3>🚀 Build Your Career</h3>
            <p>
              Find opportunities that match your skills and experience.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;