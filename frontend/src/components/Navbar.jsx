import { Link } from "react-router-dom";

function Navbar() {
    return (
        <nav className="navbar navbar-dark bg-dark">
            <div className="container">
                <Link className="navbar-brand" to="/">
                    Car Inventory
                </Link>

                <div>
                    <Link
                        className="btn btn-outline-light me-2"
                        to="/login"
                    >
                        Login
                    </Link>

                    <Link
                        className="btn btn-warning"
                        to="/register"
                    >
                        Register
                    </Link>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;