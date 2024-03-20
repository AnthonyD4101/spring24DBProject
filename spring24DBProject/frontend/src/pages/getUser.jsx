import React, { useState } from "react";
import CreateEmployeeAccount from "./CreateEmployeeAccount";
import AddEmployee from "./AddEmployee";

function ParentComponent() {
  const [userData, setUserData] = useState({});

  const handleSuccess = (data) => {
    setUserData(data); // Store the entire user data
  };

  return (
    <div>
      <CreateEmployeeAccount onSuccess={handleSuccess} />
      {userData.userId && <AddEmployee userData={userData} />}
    </div>
  );
}

export default ParentComponent;
