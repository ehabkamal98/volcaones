
import { useState, useEffect } from "react";
import classes from "./Homepage.module.css";
import home_jpg from "../home.jpg";

function HomePage() {
  return (
    <div>
      <h1>Volcanoes of the World</h1>
      <section>
        <img src={home_jpg} alt="San Pedro Volcano, Chile" className={classes.home_jpg} />
      </section>
    </div>
  );
}

export default HomePage;
