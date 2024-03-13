import React, { useState } from "react";

export default function TicketPurchase() {
  // State variables to manage form inputs
  const [numTickets, setNumTickets] = useState("");
  const [ticketType, setTicketType] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [foodBundle, setFoodBundle] = useState([]);
  const [merchBundle, setMerchBundle] = useState([]);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [totalPrice, setTotalPrice] = useState("");

  const prices = new Map([
    ["GA", 55],
    ["KI", 35],
    ["NA", 0],
    ["AB", 15],
    ["DF", 25],
    ["GG", 20],
    ["FF", 15],
    ["EE", 25],
    ["MM", 20],
  ]);

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    var t = 0;
    console.log(numTickets, selectedDate);
    for (let i = 0; i < numTickets; i++) {
      console.log(ticketType[i], foodBundle[i], merchBundle[i]);
      t +=
        prices.get(ticketType[i]) +
        prices.get(foodBundle[i]) +
        prices.get(merchBundle[i]);
    }
    setFormSubmitted(true);
    setTotalPrice(t);
  };

  // Function to handle changes in number of tickets
  const handleNumTicketsChange = (e) => {
    const value = parseInt(e.target.value);
    setNumTickets(value >= 0 ? value : 0);
    // Automatically set the first ticket type to "GA"
    setTicketType(Array(value));
    setFoodBundle(Array(value));
    setMerchBundle(Array(value));
  };

  // Function to handle changes in ticket type
  const handleTicketTypeChange = (e, index) => {
    console.log(index);
    var newTicketType = ticketType;
    newTicketType[index] = e.target.value;
    setTicketType(newTicketType);
  };

  const handleFoodBundleChange = (e, index) => {
    var newFoodBundle = foodBundle;
    newFoodBundle[index] = e.target.value;
    setFoodBundle(newFoodBundle);
  };

  const handleMerchBundleChange = (e, index) => {
    var newMerchBundle = merchBundle;
    newMerchBundle[index] = e.target.value;
    setMerchBundle(newMerchBundle);
  };

  return (
    <div className="row justify-content-center">
      <div className="col md-4 mb-4">
        <div className="card sign-up">
          <div className="card-body">
            <h1 className="my-2 text-center" style={{ color: "#2F4858" }}>
              Purchase Tickets
            </h1>
            <div className="text-center">
              General Admission Tickets (GA): $55, for all customers above 10
              years old
            </div>
            <div className="text-center">
              Kid Tickets (KI): $35, for all customers between 3 and 10 years
              old
            </div>
            <div className="text-center">
              **Customers under the age of 3 do not need a ticket and have free
              admission to Wonderland.
            </div>
            <form onSubmit={handleSubmit}>
              <div className="mt-2 mb-3">
                <label htmlFor="numOfTickets" className="form-label">
                  Number of Tickets
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="numOfTickets"
                  name="numOfTickets"
                  placeholder="0"
                  value={numTickets}
                  onChange={(e) => handleNumTicketsChange(e)}
                  min="0"
                  maxLength="10"
                  required
                />
              </div>
              <div className="mt-2 mb-3">
                <label htmlFor="dateValid" className="form-label">
                  Date
                </label>
                <input
                  id="dateValid"
                  name="dateValid"
                  type="date"
                  className="form-control"
                  maxLength="100"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  required
                />
              </div>
              <div className="row mb-3">
                {Array.from({ length: numTickets }, (_, index) => (
                  <div className="col" key={index}>
                    <label
                      htmlFor={`ticketType${index}`}
                      className="form-label mb-2"
                    >
                      Ticket {index + 1} Type
                    </label>
                    <input
                      className="form-control"
                      list={`datalistOptions${index}`}
                      id={`ticketType${index}`}
                      placeholder="Type to search..."
                      value={ticketType[index]}
                      onChange={(e) => handleTicketTypeChange(e, index)}
                      required
                    ></input>
                    <datalist id={`datalistOptions${index}`}>
                      <option value="GA">General Admission (10+)</option>
                      <option value="KI">Kids (3-10)</option>
                    </datalist>
                  </div>
                ))}
              </div>
              <div className="row mb-3">
                {Array.from({ length: numTickets }, (_, index) => (
                  <div className="col" key={index}>
                    <label
                      htmlFor={`foodBundle${index}`}
                      className="form-label mb-2"
                    >
                      Ticket {index + 1} Food Bundle
                    </label>
                    <input
                      className="form-control"
                      list={`datalistOption${index}`}
                      id={`foodBundle${index}`}
                      placeholder="Type to search..."
                      value={foodBundle[index]}
                      onChange={(e) => handleFoodBundleChange(e, index)}
                      required
                    ></input>
                    <datalist id={`datalistOption${index}`}>
                      <option value="NA">None</option>
                      <option value="AB">
                        Adventure Bites Eatery ($15): Includes a burger meal or
                        pizza meal with a drink.
                      </option>
                      <option value="DF">
                        Dragon's Flame Tavern ($25): Includes a selection of
                        fire-grilled meats and skewers with a drink.
                      </option>
                      <option value="GG">
                        Galactic Grub Hub ($20): Includes a hearty sandwhch with
                        chips and a drink.
                      </option>
                    </datalist>
                  </div>
                ))}
              </div>
              <div className="row mb-3">
                {Array.from({ length: numTickets }, (_, index) => (
                  <div className="col" key={index}>
                    <label
                      htmlFor={`merchBundle${index}`}
                      className="form-label mb-2"
                    >
                      Ticket {index + 1} Merch Bundle
                    </label>
                    <input
                      className="form-control"
                      list={`datalistMerch${index}`}
                      id={`merchBundle${index}`}
                      placeholder="Type to search..."
                      value={merchBundle[index]}
                      onChange={(e) => handleMerchBundleChange(e, index)}
                      required
                    ></input>
                    <datalist id={`datalistMerch${index}`}>
                      <option value="NA">None</option>
                      <option value="FF">
                        Fantasy Finds Boutique ($15): Includes a shirt with a
                        picture of one of our rides.
                      </option>
                      <option value="EE">
                        Enchanted Emporium ($25): Includes a wizard robe, a
                        plush toy, and a wand.
                      </option>
                      <option value="MM">
                        Mystic Marvels Marketplace ($20): Includes a specially
                        crafted mug and a figurine.
                      </option>
                    </datalist>
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap -mx-3 mt-6">
                <div className="w-full px-3 text-center">
                  <button id="button" type="submit" className="btn btn-primary">
                    Get Total Cost
                  </button>
                </div>
              </div>
            </form>
            {formSubmitted && (
              <>
                <div className="text-center text-white mt-3">
                  Total Amount = ${totalPrice}
                </div>
                <div className="w-full px-3 text-center">
                  <button className="btn btn-primary mx-auto mt-3" onClick={() => alert("Tickets have been purchased!")}>Purchase</button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
