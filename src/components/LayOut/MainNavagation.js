import { Link } from "react-router-dom";
import classes from "./MainNavagation.module.css";

/*v* Import the css file as a Java script object *v*/
import { BsFillBinocularsFill } from "react-icons/bs";

function MainNavigation() {
  return (
    <div>
      <header >
        <nav>
          <ul className={classes.ul}>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/VolcanoList">Volcano List</Link>
            </li>
            <li>
              <Link to="/Register">Register</Link>
            </li>
            <li>
              <Link to="/Login">Login</Link>
            </li>
          </ul>
        </nav>
      </header>
    </div>
  );
}
export default MainNavigation;
