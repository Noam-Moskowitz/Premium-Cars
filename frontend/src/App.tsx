import "./App.css";
import NavBar from "./components/navigation/NavBar";
import MainRouter from "./routes/MainRouter";
import { ThemeProvider } from "./theme/ThemeProvider";

function App() {
  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <NavBar />
        <div className="size-full">
          <MainRouter />
        </div>
      </ThemeProvider>
    </>
  );
}

export default App;
