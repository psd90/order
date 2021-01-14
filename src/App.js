import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Pre-ordering food Site
        </p>
        <img src={logo} className="App-logo" alt="logo" />
        <a
          className="App-link"
          href="https://www.facebook.com/Dhillonscurry"
          target="_blank"
          rel="noopener noreferrer"
        >
          Back to Facebook
        </a>
      </header>
    </div>
  );
}

export default App;
