import "./App.css";
import NavBar from "./components/navigation/NavBar";
import MainRouter from "./routes/mainRouter";

function App() {
  return (
    <>
      <NavBar />
      <div className="size-full">
        <MainRouter />
      </div>
    </>
  );
}

export default App;
