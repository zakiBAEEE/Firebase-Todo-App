import { NavbarSimple } from "./components/Navigation";
import { Route, Routes } from "react-router";
import { TodoPages } from "./pages/TodoPages";
import { NotePage } from "./pages/NotePages";
import { useEffect, useMemo, useState } from "react";
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";
import { onAuthStateChanged } from "firebase/auth";
import { login } from "./firebase/firebaseAuth";
import { auth } from "./firebase/firebaseAuth";
import { ThemeContext } from "./contexts/ThemeContext";

function App() {
  const [authedUser, setAuthedUser] = useState(null);
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

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

  function toggleTheme() {
    setTheme((prevState) => prevState == 'light' ? 'dark' : 'light');
  }

  useEffect(() => {
    localStorage.setItem('theme', theme);
  }, [theme]);

  const ThemeContextValue = useMemo(() => {
    return {
      theme,
      toggleTheme
    }
  }, [theme])

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
      <ThemeContext.Provider value={ThemeContextValue}>
        <div className="bg-indigo-300 h-screen flex flex-col gap-y-11">
          <header></header>
          <main>
            <Routes>
              <Route path="/" element={<LoginPage loginHandler={loginHandler} />} />
              <Route path="/register" element={<RegisterPage />} />
            </Routes>
          </main>
        </div>
      </ThemeContext.Provider>
    )
  }
  return (
    <ThemeContext.Provider value={ThemeContextValue}>
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
    </ThemeContext.Provider>
  )
}




export default App
