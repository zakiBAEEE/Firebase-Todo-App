import { NavbarSimple } from "./components/Navigation";
import { Route, Routes } from "react-router";
import { TodoPages } from "./pages/TodoPages";
import { NotePage } from "./pages/NotePages";
import { useEffect, useState } from "react";
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";
import { onAuthStateChanged } from "firebase/auth";
import { login } from "./firebase/firebaseAuth";
import { auth } from "./firebase/firebaseAuth";

function App() {
  const [authedUser, setAuthedUser] = useState(null);

  useEffect(() => {
    const storedUser = sessionStorage.getItem('authedUser');
    if (storedUser) {
      setAuthedUser(JSON.parse(storedUser)); // Atur state dari sessionStorage jika ada
    }

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        sessionStorage.setItem('authedUser', JSON.stringify(user)); // Simpan user ke sessionStorage
        setAuthedUser(user); // Perbarui state
      } else {
        sessionStorage.removeItem('authedUser'); // Hapus dari sessionStorage jika logout
        setAuthedUser(null);
      }
    });

    return () => {
      unsubscribe(); // Hentikan listener saat komponen dilepas
    };
  }, []);

  function loginHandler(email, password) {
    try {
      const user = login(email, password);
      console.log("User Berhasil Login : ", user);
      setAuthedUser(user);
    }
    catch (error) {
      console.error("Gagal login : ", error.message);
      throw error
    }
  }

  if (authedUser == null) {
    return (
      <div className="bg-indigo-300 h-screen flex flex-col gap-y-11">
        <header></header>
        <main>
          <Routes>
            <Route path="/" element={<LoginPage loginHandler={loginHandler} />} />
            <Route path="/register" element={<RegisterPage />} />
          </Routes>
        </main>
      </div>
    )
  }
  return (
    <div className="bg-indigo-300 h-screen flex flex-col gap-y-11">
      <header className="flex flex-col gap-1.5 mt-3">
        <NavbarSimple />
      </header>
      <main className="mx-10">
        <Routes>
          <Route path="/" element={<TodoPages />} />
          <Route path="/notes" element={<NotePage />} />
        </Routes>
      </main>
    </div>
  )
}




export default App
