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
          </ul>
        </nav>
      </header>

      <main>
        <section id="today" className={classes.about}>
          
        </section>
        <section id="events" className={classes.about}>
          
        </section>
        <section id="parking" className={classes.about}>
        <h2>
          Parking Information
        </h2>
        <p>
          Our theme park has four parkimng lots, three of which are accessible for all visitors. Please see your parking options listed below!
        </p>
        
        <h3>
          Parking Zone A - Premium Parking
        </h3>
        <p>
          Parking Zone A is our premium parking area, offering shaded parking spots closest to the entrance. 
          It's the ideal choice for guests seeking convenience and comfort. 
          While parking here comes at a premium, you'll enjoy the benefit of quick access to the park, making it perfect for those who prioritize ease of entry.
        </p>
        <p>
          Parking in this zone costs $30 per day.
        </p>

        <h3>
          Parking Zone B - Free Parking
        </h3>
        <p>
          Parking Zone B is our largest parking area and it's completely free! 
          Although it's not as close to the entrance as Zone A, it provides ample space for parking and is still within a 
          reasonable walking distance to the park.
        </p>

        <h3>
          Parking Zone C - Free Parking
        </h3>
        <p>
          Parking Zone C is a smaller free parking area, located slightly further from the entrance compared to Zones A and B. 
          While it may not offer as many parking spots, it's still a viable choice for guests looking for complimentary parking options. 
        </p>

        <h3>
          Parking Zone D - Employees Only
        </h3>
        <p>
          Please note that Zone D is reserved exclusively for employees of the theme park. 
          This ensures that our staff have convenient parking access while they work hard to make your visit enjoyable.
        </p>

        </section>
      </main>



    </div>
  
  
  );
}
