import { useState, useEffect } from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import NavBar from "../components/nav/NavBar.jsx";
import { SplashPage } from "../components/Splash/Splash.jsx";
import { GamesList } from "../components/games/GamesList.jsx";
import { Login } from "../components/auth/Login.jsx";
import { Profile } from "../components/profile/Profile.jsx";
import { CreateGame } from "../components/games/CreateGame.jsx";
import { EditGame } from "../components/games/editGame.jsx";
import { EditProfile } from "../components/profile/EditProfile.jsx";



export default function ApplicationViews() {
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    const localUser = localStorage.getItem("loggedInUser");
    const parsedUser = JSON.parse(localUser);
    setCurrentUser(parsedUser);
  }, []);



  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <Outlet />
            <NavBar/>
           
          </>
        }
      >
        <Route path="/" index element={<SplashPage currentUser={currentUser} />} />
        <Route path="games" index element={<GamesList currentUser={currentUser} />} />
        <Route path="login" index element={<Login currentUser={currentUser} />} />
        <Route path="profile" index element={<Profile currentUser={currentUser} />} />
        <Route path="create-game" index element={<CreateGame currentUser={currentUser} />} />
        <Route path="edit-game/:gameId" element={<EditGame currentUser={currentUser} />} />
        <Route path="edit-profile/:profileId" element={<EditProfile currentUser={currentUser} />} />
      </Route>
    </Routes>
  );
}

