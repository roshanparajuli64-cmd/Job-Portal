import { NavLink } from "react-router-dom";

function Navbar() {
    const getLinkClass = ({ isActive }) =>
        isActive ? "nav-link active" : "nav-link";

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <NavLink to="/" className="navbar-logo">
                    Job<span>Portal</span>
                </NavLink>

                <div className="nav-links">
                    <NavLink to="/" className={getLinkClass}>
                        Home
                    </NavLink>

                    <NavLink to="/jobs" className={getLinkClass}>
                        Jobs
                    </NavLink>

                    <NavLink to="/applications" className={getLinkClass}>
                        Applications
                    </NavLink>

                    <NavLink to="/saved" className={getLinkClass}>
                        Saved Jobs
                    </NavLink>

                    <NavLink to="/post-job" className="post-job-nav-link">
                        Post Job
                    </NavLink>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;