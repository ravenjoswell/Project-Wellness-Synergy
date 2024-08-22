import { useState } from "react"
import { signUp } from "../utilities"
import { useOutletContext, Link } from "react-router-dom"

const SignupPage = () => {
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const { setUser } = useOutletContext()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const user = await signUp(fullName, email, password)
    setUser(user)
  }

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
          <h1 className="form-title">Sign Up</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-lg font-serif text-black">Full Name</label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="input-field"
                placeholder="Enter your full name"
                required
              />
            </div>
            <div>
              <label className="block text-lg font-serif text-black">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-field"
                placeholder="Enter your email"
                required
              />
            </div>
            <div>
              <label className="block text-lg font-serif text-black">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-field"
                placeholder="Enter your password"
                required
              />
            </div>
            <button
              type="submit"
              className="submit-button"
            >
              Sign Up
            </button>
          </form>
          <div className="mt-4 text-center">
            <p className="text-lg font-serif text-black">
              Already have an account?{' '}
              <Link to="/login" className="signup-link">
                Login here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignupPage
