import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Brain, Camera } from "lucide-react";

const Signup = () => {

  const navigate = useNavigate();

  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [role,setRole] = useState("patient");
  const [photo,setPhoto] = useState(null);

  const handlePhoto = (e) => {

    const file = e.target.files[0];
    if(!file) return;

    const reader = new FileReader();

    reader.onload = () => {
      setPhoto(reader.result);
    };

    reader.readAsDataURL(file);
  };

  const handleSignup = () => {

    if(!name || !email || !password) return;

    const users =
      JSON.parse(localStorage.getItem("memorybridge_users")) || [];

    const newUser = {
      id:crypto.randomUUID(),
      name,
      email,
      password,
      role,
      photo
    };

    users.push(newUser);

    localStorage.setItem(
      "memorybridge_users",
      JSON.stringify(users)
    );

    navigate("/login");
  };

  return (

    <div className="min-h-screen flex items-center justify-center bg-background px-4">

      <div className="bg-card w-full max-w-sm p-8 rounded-2xl shadow-soft space-y-4">

        <div className="text-center">
          <Brain className="mx-auto text-primary mb-2"/>
          <h1 className="font-heading font-bold text-lg">
            Create Account
          </h1>
        </div>

        <input
          placeholder="Name"
          value={name}
          onChange={(e)=>setName(e.target.value)}
          className="border border-border px-3 py-2 rounded-md w-full"
        />

        <input
          placeholder="Email"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
          className="border border-border px-3 py-2 rounded-md w-full"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
          className="border border-border px-3 py-2 rounded-md w-full"
        />

        <select
          value={role}
          onChange={(e)=>setRole(e.target.value)}
          className="border border-border px-3 py-2 rounded-md w-full"
        >
          <option value="patient">Patient</option>
          <option value="caregiver">Caregiver</option>
        </select>

        {/* Face Upload */}

        {role === "patient" && (

          <label className="flex items-center gap-2 text-sm text-primary cursor-pointer">

            <Camera size={16}/>
            Upload face photo

            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handlePhoto}
            />

          </label>

        )}

        {photo && (
          <img
            src={photo}
            className="w-20 h-20 object-cover rounded-full mx-auto"
          />
        )}

        <button
          onClick={handleSignup}
          className="bg-primary text-white w-full py-2 rounded-md"
        >
          Sign Up
        </button>

      </div>

    </div>

  );
};

export default Signup;