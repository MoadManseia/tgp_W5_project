import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BoltIcon } from "@heroicons/react/24/solid";
import Button from "../components/UI/Button";
import type { AppUser } from "../App";

type LoginProps = {
  onLogin: (user: AppUser) => void;
};

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [focusedField, setFocusedField] = useState<"email" | "password" | null>(
    null
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Simple validation
    if (!credentials.email || !credentials.password) {
      setError("Please fill in all fields");
      return;
    }
    
    // Mock authentication
    const mockUsers: (Required<AppUser> & { password: string })[] = [
      { email: "md@yaho.com", password: "123456", id: 1, name: "Moad" },
      { email: "hk@yaho.com", password: "test123", id: 2, name: "dr.Hakeem" },
    ];
    
    const user = mockUsers.find(
      (u) =>
        u.email === credentials.email && u.password === credentials.password
    );
    
    if (user) {
      const { password, ...userWithoutPassword } = user;
      onLogin(userWithoutPassword);
      navigate("/dashboard");
    } else {
      setError("Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4" style={{fontFamily: 'Roboto, Arial, sans-serif'}}>
      <div className="bg-white w-full max-w-sm p-6 rounded-lg shadow border border-blue-100">
        <div className="flex flex-col items-center mb-6">
        
          <h1 className="text-xl font-normal text-gray-800 mb-3">Co.Chat</h1>
          <p className="text-gray-400 text-sm mt-1">Sign in to your account</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="p-2 bg-red-50 text-red-600 rounded text-xs text-center border border-red-100">
              {error}
            </div>
          )}
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">Email</label>
            <input
              type="email"
              value={credentials.email}
              onChange={(e) => setCredentials({...credentials, email: e.target.value})}
              onFocus={() => setFocusedField('email')}
              onBlur={() => setFocusedField(null)}
              className={`w-full px-3 py-2 border border-gray-200 rounded text-sm text-gray-900 placeholder:text-gray-300 focus:ring-1 focus:ring-blue-500 focus:outline-none ${
                credentials.email && focusedField !== 'email' ? 'bg-gray-100' : 'bg-white'
              }`}
              placeholder="Enter your email"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">Password</label>
            <input
              type="password"
              value={credentials.password}
              onChange={(e) => setCredentials({...credentials, password: e.target.value})}
              onFocus={() => setFocusedField('password')}
              onBlur={() => setFocusedField(null)}
              className={`w-full px-3 py-2 border border-gray-200 rounded text-sm text-gray-900 placeholder:text-gray-100 focus:ring-1 focus:ring-blue-500 focus:outline-none ${
                credentials.password && focusedField !== 'password' ? 'bg-gray-100' : 'bg-white'
              }`}
              placeholder="Enter your password"
            />
          </div>
          <div className="flex items-center justify-between">
           
          </div>
          <Button type="submit" className="w-full mt-2" variant="primary">
            Sign In
          </Button>
        </form>
    
      </div>
    </div>
  );
};

export default Login;