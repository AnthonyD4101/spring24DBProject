import React from "react";

import classes from "../components/UI/Home.module.css";

//alerts for temporarily closure shows up first, then today's park hours, and so on
export default function ParkInformation() {
  return (
    <div className={classes.homepage}>
      <header>
        <h1>
          Park Information
        </h1>
        <nav>
          <ul>
            <li>
              <a href="#today">Theme Park Hours</a>
            </li>
            <li>
              <a href="#events">Show Times</a>
            </li>
            <li>
              <a href="#parking">Parking Information</a>
            </li>
            <li>
              <a href="#closed">Retired Attractions</a>
            </li>
          </ul>
        </nav>
      </header>

      <main>
        <section id="today" className={classes.about}>
          
        </section>
        <section id="events" className={classes.about}>
          
        </section>
        <section id="parking" className={classes.about}>
          
        </section>
        <section id="closed" className={classes.about}>
          
        </section>

      </main>



    </div>
  
  
  );
}
