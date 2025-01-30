import { useEffect, useMemo, useState } from "react";
import { Route, Routes } from "react-router";
import { onAuthStateChanged } from "firebase/auth";

import { NavbarSimple } from "./components/Navigation";
import { TodoPages } from "./pages/TodoPages";
import { NotePage } from "./pages/NotePages";
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";

import { login } from "./firebase/firebaseAuth";
import { auth } from "./firebase/firebaseAuth";
import { ThemeContext } from "./contexts/ThemeContext";

function App() {
  // 🌟 State Management
  const [authedUser, setAuthedUser] = useState(sessionStorage.getItem('authedUser') || null);

  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "light";
  });

  // 🎨 Theme Handling
  useEffect(() => {
    document.getElementById("root").setAttribute("class", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  const themeContextValue = useMemo(() => ({ theme, toggleTheme }), [theme]);

  // 🔑 Authentication Listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        sessionStorage.setItem("authedUser", JSON.stringify(user));
        setAuthedUser(user);
      } else {
        sessionStorage.removeItem("authedUser");
        setAuthedUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  // 🔐 Login Handler
  const loginHandler = async (email, password) => {
    try {
      const user = await login(email, password);
      setAuthedUser(user);
      console.log("✅ User Berhasil Login:", user);
    } catch (error) {
      console.error("❌ Gagal login:", error.message);
      throw error;
    }
  };

  // 🏠 Rendering UI
  return (
    <ThemeContext.Provider value={themeContextValue}>
      <div className={`h-screen flex flex-col gap-y-11 ${theme === "dark" ? "bg-blue-900" : "bg-indigo-300"}`}>
        {authedUser ? (
          <>
            {/* Header */}
            <header className="flex flex-col gap-1.5 mt-3">
              <NavbarSimple />
            </header>

            {/* Main Content */}
            <main className="mx-10">
              <Routes>
                <Route path="/" element={<TodoPages />} />
                <Route path="/notes" element={<NotePage />} />
              </Routes>
            </main>
          </>
        ) : (
          <>
            {/* Header kosong agar layout tetap stabil */}
            <header></header>

            {/* Login/Register Page */}
            <main>
              <Routes>
                <Route path="/" element={<LoginPage loginHandler={loginHandler} />} />
                <Route path="/register" element={<RegisterPage />} />
              </Routes>
            </main>
          </>
        )}
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
