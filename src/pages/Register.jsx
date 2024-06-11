import { useState } from "react";

import { supabase } from "../utils/supabaseClient";

import Logo from "../components/Logo";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { error } = await supabase.auth.signUp({
      email,
      password,
    });
    if (error) {
      console.log(error.message);
    } else {
      console.log("Registration successful");

      alert("Registration successful");
    }
  };

  return (
    <div className="flex h-screen justify-center items-center bg-gray">
      <div className="flex flex-col w-1/3 h-2/3 justify-center items-center p-8 rounded space-y-8 bg-white">
        <div className="flex flex-col justify-center items-center space-y-8">
          <h1>
            <Logo />
          </h1>
          <h2 className="text-2xl">Register your account</h2>
        </div>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col w-full justify-center space-y-4"
        >
          <div className="flex flex-col">
            <label htmlFor="email">Email:</label>
            <input
              id="email"
              type="text"
              className="block w-full rounded border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray placeholder:text-gray focus:ring-2 focus:ring-inset focus:ring-purple"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="password">Password:</label>
            <input
              id="password"
              type="password"
              className="block w-full rounded border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray placeholder:text-gray focus:ring-2 focus:ring-inset focus:ring-purple"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="rounded py-2 text-white bg-purple">
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
