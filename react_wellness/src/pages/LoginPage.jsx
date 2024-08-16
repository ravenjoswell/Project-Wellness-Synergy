import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { signIn } from "../utilities";

const LogIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUser } = useOutletContext();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = await signIn(email, password);
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
      <div className="relative border border-stone-900 p-20 max-w-lg mx-auto bg-transparent shadow-xl rounded-lg">
        <h1 className="text-3xl font-serif mb-20 text-center text-black">Log In</h1>
        <form onSubmit={(e) => handleSubmit(e)} className="space-y-4">
          <div>
            <label className="block text-sm font-serif text-black">Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder=" Enter email"
              required
              className="mt-2 block w-full py-2 border-gray-300 rounded-md shadow-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-serif text-black">Password</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder=" Enter password"
              required
              className="mt-2 block w-full py-2 border-gray-300 rounded-md shadow-sm"
            />
          </div>
          <input
            type="submit"
            value="Log In"
            className="w-full bg-stone-950 text-black py-3 rounded-md hover:bg-stone-400 font-serif"
          />
        </form>
      </div>
    </div>
  );
};

export default LogIn;
