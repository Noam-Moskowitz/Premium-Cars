import { Provider } from "react-redux";
import "./App.css";
import Footer from "./components/footer/Footer";
import NavBarWarpper from "./components/navigation/NavBarWarpper";
import MainRouter from "./routes/MainRouter";
import { ThemeProvider } from "./theme/ThemeProvider";
import store from "./store/store";

function App() {
  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Provider store={store}>
          <NavBarWarpper />
          <div className="size-full">
            <MainRouter />
          </div>
          <Footer />
        </Provider>
      </ThemeProvider>
    </>
  );
}

export default App;
