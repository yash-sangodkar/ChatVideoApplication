import "./index.css";
import LoaderProvider from "./components/context/LoaderProvider";
import MainScreen from "./components/MainScreen";
import UserProvider from "./components/context/UserProvider";

function App() {
  return (
    <LoaderProvider>
      <UserProvider>
        <MainScreen />
      </UserProvider>
    </LoaderProvider>
  );
}

export default App;
