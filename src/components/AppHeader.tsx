import BackIcon from "../assets/Back.svg";
import ToddleLogo from "../assets/toddle-logo.svg";
import CrumbNext from "../assets/Path (1).png";
import "./AppHeader.css";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";

const AppHeader = () => {
  const location = useLocation();
  const crumbs = location.pathname.split("/").filter((item) => item);
  return (
    <div className="header-container">
      <Link
        className="header-container"
        to={
          "/" +
          crumbs
            .filter((item) => item)
            .splice(0, crumbs.length - 1)
            .join("/")
        }
      >
        <img src={BackIcon} alt="Back" className="touchable backButton" />
        <img src={ToddleLogo} alt="Logo" className="touchable logo" />
      </Link>
      <div className="crumbs">
        {crumbs
          .filter((item) => item)
          .splice(0, crumbs.length - 1)
          .map((crumb, index) => (
            <div className="crumb" key={index}>
              <Link
                to={
                  "/" +
                  crumbs
                    .filter((item) => item)
                    .splice(0, index + 1)
                    .join("/")
                }
                className="crumbText touchable"
              >
                <span>{crumb}</span>
              </Link>
              <img src={CrumbNext} alt="next_arrow" className="crumbNext" />
            </div>
          ))}
        <div className="crumb">
          <span className="crumbText currentCrumb">
            {crumbs[crumbs.length - 1]}
          </span>
        </div>
      </div>
    </div>
  );
};

export default AppHeader;
