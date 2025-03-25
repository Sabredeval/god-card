import './styles/App.css';
import Card from './components/Card';

function App() {
  return (
    <div className="App">
      <h1>Card Game</h1>
      <div className="cards-display">
        <Card />
      </div>
    </div>
  );
}

export default App;