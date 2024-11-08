import "./App.css";
import Footer from "./components/footer/Footer";
import NavBarWarpper from "./components/navigation/NavBarWarpper";
import MainRouter from "./routes/MainRouter";
import { ThemeProvider } from "./theme/ThemeProvider";
import { useEffect } from "react";
import useCheckToken from "./hooks/useCheckToken";

function App() {
  const { checkIfLoggedIn } = useCheckToken();

  useEffect(() => {
    checkIfLoggedIn();
  }, []);

  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <NavBarWarpper />
        <div className=" w-full pt-14 ">
          <MainRouter />
        </div>
        <Footer />
      </ThemeProvider>
    </>
  );
}

export default App;
