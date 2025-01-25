import { useNavigate } from "react-router";
import { getCookie, removeCookie } from 'typescript-cookie';
import barSyncLogo from "../../assets/barSync_logo.png";
import NavigationLink from "./NavigationLink";

function Navbar() {
  const navigate = useNavigate();

  const userToken = getCookie('token');

  async function logout() {
    removeCookie("token", {expires: 1, path: "/", sameSite: "Strict"});
    await navigate("/login");
  }

  return (
    <>
      <div className="navbar">
        <div className="hero">
          {!userToken ? '' : <button className="login-button" onClick={logout}>Logout</button>}
          <img src={barSyncLogo} className="logo"></img>
          <h1 className="title">barSync</h1>
        </div>
        {!userToken ? '' :
        <nav className="nav-buttons">
          <NavigationLink route="/" text="Home" />
          <NavigationLink route="/ingredientsearch" text="Add Ingredient" />
          <NavigationLink route="/recipes" text="Make something?" />
        </nav>
        }
      </div>
    </>
  );
}

export default Navbar;
