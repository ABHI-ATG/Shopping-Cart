import './App.css';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header'
import Home from './components/Home'
import ProductCart from './components/ProductCart';
import Error from './components/Error'
import Footer from './components/Footer'
import Container from './components/Container';


function App() {
  return (
    <>
      <Header/>
      <Routes>
        <Route path='/' exactly Component={Home}/>
        <Route path='/home' exactly Component={Container}/>
        <Route path='/cart' Component={ProductCart}/>
        <Route path="*" Component={Error}/> 
      </Routes>
      <Footer/>
    </>
  );
}

export default App;
