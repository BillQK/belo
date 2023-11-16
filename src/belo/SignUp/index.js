import React from "react";

const SignUp = () => {
  return (
    <div>
      {/* Your signup component code goes here */}
      <input type="email" placeholder="Email" />
      <input type="text" placeholder="Username" />
      <input type="password" placeholder="Password" />
      <input type="password" placeholder="Re-enter Password" />
      <select>
        <option value="role1">Role 1</option>
        <option value="role2">Role 2</option>
      </select>
    </div>
  );
};

export default SignUp;
