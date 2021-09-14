import "./App.scss";
import Dictionary from "./Dictionary";
function App() {
  return (
    <>
      <div className="App-nav">
        <img src="./logo.png" alt="Logo" />
        <h2>E2E Dictionary</h2>
      </div>
      <div className="App-output">
        <Dictionary />
      </div>
    </>
  );
}

export default App;
