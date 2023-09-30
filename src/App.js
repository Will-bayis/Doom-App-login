import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Profil from "./pages/Profil";
import Trending from "./pages/Trending";
import Home from "./pages/Home";
import { UidContext } from "./components/AppContext";
import axios from "axios";
import Navbar from "./components/Navbar";
import { useDispatch } from "react-redux";
import { getUser } from "./actions/user.actions";

const App = () => {
  const [uid, setUid] = useState(null);
  const dispatch = useDispatch();

 useEffect(() => {
  const fetchToken = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}jwtid`, {
        method: "GET",
        credentials: "include", // Active le mode "credentials" pour permettre les cookies
      });

      if (response.ok) {
        const data = await response.json();
        setUid(data);
      } else {
        console.log("No token");
      }
    } catch (error) {
      console.error("Error fetching token:", error);
    }
  };

  fetchToken();

  if (uid) dispatch(getUser(uid));
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, [uid]);


  return (
    <BrowserRouter>
      <UidContext.Provider value={uid}>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profil" element={<Profil />} />
          <Route path="/trending" element={<Trending />} />
          {/* path="*" fonctionne si jamais l'url ne correspond à rien de déclaré au-dessus */}
          <Route path="*" element={<Home />} />
        </Routes>
      </UidContext.Provider>
    </BrowserRouter>
  );
};

export default App;
