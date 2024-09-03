import "./App.css";
import NavBarWarpper from "./components/navigation/NavBarWarpper";
import MainRouter from "./routes/MainRouter";
import { ThemeProvider } from "./theme/ThemeProvider";

function App() {
  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <NavBarWarpper />
        <div className="size-full">
          <MainRouter />
        </div>
      </ThemeProvider>
    </>
  );
}

export default App;
