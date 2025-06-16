"use client";

import { useEffect } from "react";

const TestArr = ({ testArr }) => {
  useEffect(() => {}, [testArr]);

  return (
    <div>
      {testArr.map((item, index) => (
        <div key={index}>Item: {item}</div>
      ))}
    </div>
  );
};

export default TestArr;
