import { Link } from "react-router";

function Navbar() {
  return (
    <>
      <div className="navbar">
        <div className="hero">
          <h1 className="title">barSync</h1>
        </div>
        <nav className="nav-buttons">
          <Link to={"/"} className="nav-button">
            <p>Home</p>
          </Link>
          <Link to={"/ingredientsearch"} className="nav-button">
            <p>Add Ingredient</p>
          </Link>
          <Link to={"/recipes"} className="nav-button">
            <p>Make something?</p>
          </Link>
        </nav>
      </div>
    </>
  );
}

export default Navbar;
