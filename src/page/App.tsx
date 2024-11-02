import Header from '../components/Header/Header';
import Categories from '../components/categories/Categories';
import Main from '../components/main/Main';
import './App.css';


function App() {
  return (
    <div className="App">
      <div className="container">
        <Header />
        <Categories />
        <Main />
      </div>
    </div>
  );
}

export default App;
