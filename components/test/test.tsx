"use client";

import { Button } from "../ui/button";

const AddTest = ({ handleTest }) => {
  let n = Math.floor(Math.random() * 100); // or however you want to generate values

  const handleSubmit = () => {
    handleTest(n); // send value to be added to array
  };

  return (
    <div>
      <Button onClick={handleSubmit}>Click to test</Button>
    </div>
  );
};

export default AddTest;
