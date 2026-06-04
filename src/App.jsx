import { ThemeProvider } from "./Context/ThemeContext";
import LandingView from "./Pages/Landing/View";

function App() {
  return (
    <ThemeProvider>
      <LandingView />
    </ThemeProvider>
  );
}

export default App;
