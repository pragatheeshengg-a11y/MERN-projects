import { Link } from "react-router-dom";

function Navbar(){
    return(
        <nav  style={{
                display: "flex",
                justifyContent: "center",
                gap: "20px",
                padding: "20px",
                background: "#f2f2f2"
            }}
        >
            <Link to="/">Login</Link>
            <Link to="/register">Registor Now</Link>
            <Link to="/profile">Profile</Link>
        </nav>
    )
}
export default Navbar;