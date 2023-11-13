import classes from "./Layout.module.css";
import MainNavigation from "./MainNavagation";
function Layout(props) {
  return (
    <div>
      <MainNavigation />
      <main>{props.children}</main>
    </div>
  );
}
export default Layout;
