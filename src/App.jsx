import { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./Dashboard.jsx";
import Login from "./Login.jsx";
import Loading from "./Loading.jsx";
import Team from './team.jsx'
import Game from "./game.jsx";

function App() {
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(() => !!localStorage.getItem("user"));
  
  useEffect(() => {
    const user = localStorage.getItem("user");
    setIsLoggedIn(!!user);

    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (loading) return <Loading />;

  return (
    <>
    <Routes>
      <Route 
          path="/" 
          element={<Navigate to="/login" />} 
      />

      <Route
          path="/login"
          element={isLoggedIn ? (<Navigate to="/dashboard" />) : (<Login setIsLoggedIn={setIsLoggedIn} />)} 
      />

      <Route
          path="/dashboard"
          element={isLoggedIn ? <Dashboard /> : <Navigate to="/login" />} 
      />

      <Route index element={<Game />} />
      <Route path="/team/:gameId/:teamName" element={<Team />} />


    </Routes>
      </>
  );
}

export default App;
