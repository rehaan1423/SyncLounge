import { Route, Routes } from "react-router"
import SignUpPage from "./pages/SignUpPage.jsx"
import LoginPage from "./pages/LoginPage.jsx"
import ChatPage from "./pages/ChatPage.jsx"
import { useAuthStore } from "./store/useAuthStore.js"
import { useEffect } from "react"
import { Navigate } from "react-router"
import PageLoader from "./components/PageLoader.jsx"
import { Toaster } from "react-hot-toast"

function App() {
  const {authUser,isCheckingAuth,checkAuth} = useAuthStore();

  useEffect(() =>{
    checkAuth();
  },[checkAuth]);

  if(isCheckingAuth) return <PageLoader />

  return (
    <div className="min-h-screen bg-slate-900 relative flex items-center justify-center p-4 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-cyan-950 to-slate-900" />
      <div className="absolute inset-0 opacity-20 bg-[linear-gradient(0deg,transparent_24%,rgba(6,182,212,0.05)_25%,rgba(6,182,212,0.05)_26%,transparent_27%,transparent_74%,rgba(6,182,212,0.05)_75%,rgba(6,182,212,0.05)_76%,transparent_77%,transparent)] bg-[size:50px_50px]" />
      <div className="absolute inset-0 opacity-10 bg-[linear-gradient(180deg,transparent_0%,rgba(6,182,212,0.1)_2%,transparent_4%)] bg-[size:100%_4px] pointer-events-none animate-scanlines" />
      <div className="absolute -top-24 -left-32 w-96 h-96 bg-cyan-500 opacity-15 blur-[100px] rounded-full" style={{ animation: 'float 8s ease-in-out infinite' }} />
      <div className="absolute -bottom-32 -right-24 w-80 h-80 bg-orange-500 opacity-10 blur-[100px] rounded-full" style={{ animation: 'float 10s ease-in-out infinite 1s' }} />
      <div className="absolute top-1/3 -right-40 w-72 h-72 bg-cyan-400 opacity-5 blur-[120px] rounded-full" style={{ animation: 'float 12s ease-in-out infinite 2s' }} />
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-1 h-1 bg-cyan-400 rounded-full opacity-40" style={{ animation: 'pulse 3s ease-in-out infinite' }} />
        <div className="absolute top-40 right-20 w-0.5 h-0.5 bg-cyan-300 rounded-full opacity-30" style={{ animation: 'pulse 4s ease-in-out infinite 0.5s' }} />
        <div className="absolute bottom-32 left-1/4 w-1 h-1 bg-orange-400 rounded-full opacity-30" style={{ animation: 'pulse 5s ease-in-out infinite 1s' }} />
        <div className="absolute bottom-20 right-1/3 w-0.5 h-0.5 bg-cyan-300 rounded-full opacity-20" style={{ animation: 'pulse 3.5s ease-in-out infinite 0.8s' }} />
        <div className="absolute top-1/2 left-1/3 w-1 h-1 bg-orange-300 rounded-full opacity-25" style={{ animation: 'pulse 4.5s ease-in-out infinite 1.2s' }} />
      </div>
      <div className="absolute top-0 left-0 w-32 h-0.5 bg-gradient-to-r from-cyan-500 to-transparent opacity-30" />
      <div className="absolute top-0 right-0 w-32 h-0.5 bg-gradient-to-l from-cyan-500 to-transparent opacity-30" />
      <div className="absolute bottom-0 left-0 w-24 h-0.5 bg-gradient-to-r from-orange-500 to-transparent opacity-20" />
      <Routes>
        <Route path="/" element={authUser ? <ChatPage /> : <Navigate to={"/login"} />} />
        <Route path="/signup" element={!authUser ? <SignUpPage /> : <Navigate to={"/"} />} />
        <Route path="/login" element={!authUser ? <LoginPage /> :  <Navigate to={"/"} />} />
      </Routes>

      <Toaster />
    </div>
  )
}

export default App;