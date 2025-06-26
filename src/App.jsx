import Landing from "./routes/Landing";
import {Routes, Route, Navigate} from 'react-router-dom';
import Login from "./routes/Login";
import Signup from "./routes/Signup"
import Navbar from "./components/Navbar";

function App() {
  return (
    <>
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <Routes>
        <Route path="/" element={<Landing/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<Signup/>}/>
      </Routes>
    </div>
    
    </>
  );
}

export default App;
