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
    <div className="outer-container">
      <div className="white-container">
        <video
          src="loginbg.mp4" 
          autoPlay
          loop
          muted
        />
        <div className="lifted-container">
          <h1 className="form-title">Log In</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-lg font-serif text-black">Email</label> {/* Increased font size */}
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="Enter email"
                required
                className="input-field"
              />
            </div>
            <div>
              <label className="block text-lg font-serif text-black">Password</label> {/* Increased font size */}
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="Enter password"
                required
                className="input-field"
              />
            </div>
            <input
              type="submit"
              value="Log In"
              className="submit-button"
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default LogIn;
