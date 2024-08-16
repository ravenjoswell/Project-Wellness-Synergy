import { useState } from "react";
import { signUp } from "../utilities";
import { useOutletContext, Link } from "react-router-dom";

const SignupPage = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUser } = useOutletContext();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = await signUp(fullName, email, password);
    setUser(user);
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen">
     <video
        src=""
        autoPlay
        loop
        muted
        className="absolute top-0 left-0 w-full h-full object-cover"
      />
      <div className="relative border border-stone-900 p-20 max-w-lg mx-auto bg-transparent opacity- shadow-lg rounded-lg">
        <h1 className="text-3xl font-serif mb-20 text-center text-black">Sign Up</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-serif text-black">Full Name</label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm py-2"
              placeholder=" Enter your full name"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-serif text-black">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm py-2"
              placeholder=" Enter your email"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-serif text-black">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm py-2"
              placeholder=" Enter your password"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-stone-950 text-black py-2 rounded-md hover:bg-stone-400 font-serif"
          >
            Sign Up
          </button>
        </form>
        <div className="mt-4 text-center">
          <p className="text-sm text-black font-serif">
            Already have an account?{' '}
            <Link to="/login" className="text-blue-600 hover:text-blue-200 font-serif">
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
