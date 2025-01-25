import { Link } from "react-router";

interface NavigationLinkProps {
  route: string,
  text: string
  className? : string
}

function NavigationLink({route, text, className}: NavigationLinkProps) {
  return (
    <>
      <Link to={route} className={`nav-button ${className || ""}`} >
        <p>{text}</p>
      </Link>
    </>
  );
}

export default NavigationLink;
