import Categories from '../../components/categories/Categories';
import Footer from '../../components/footer/Footer';
import Header from '../../components/Header/Header';
import Main from '../../components/main/Main';
import './App.css';

function App() {
  return (
    <div className="App">
      <Header />
      <Categories />
      <Main />
      <Footer />
    </div>
  );
}

export default App;
