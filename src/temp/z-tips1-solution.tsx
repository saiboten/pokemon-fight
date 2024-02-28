import { ChangeEvent, ChangeEventHandler } from "react";

// Solution 1:
export const MyGreatInput = () => {
  const onChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    console.log(e.target.value);
  };

  return <input onChange={onChange}></input>;
};

// Solution 2:
export const MyGreatInput2 = () => {
  return <input onChange={(e: ChangeEvent<HTMLInputElement>) => e}></input>;
};

// Solution 3:
export const MyGreatInput3 = () => {
  const onChange: React.ComponentProps<"input">["onChange"] = (e) => {
    console.log(e.target.value);
  };

  return <input onChange={onChange}></input>;
};
