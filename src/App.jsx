import { Toaster } from "react-hot-toast";
import AppRoutes from "./routes/AppRoutes";
import { GoogleOAuthProvider } from "@react-oauth/google";

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

function App() {
  return (
    <>
      <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
        <Toaster position="top-right" />
        <AppRoutes />
      </GoogleOAuthProvider>
    </>
  );
}

export default App;