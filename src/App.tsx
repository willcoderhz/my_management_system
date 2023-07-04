import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import { AuthContext } from './AuthContext';
import Navbar from './Navbar';
import Footer from './Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import ProductUpload from './pages/ProductUpload';
import Products from './pages/Products';
import './App.css';
import AuthContextProvider from './AuthContext'

function App() {
  // 我们将整个Router放入新的组件中，以便能在Router内部访问context
  return (
    <AuthContextProvider>
      <AppRouter />
    </AuthContextProvider>
  );
}

// 新建的AppRouter组件，这里是真正的Router部分
function AppRouter() {
  const { loggedIn } = useContext(AuthContext);  // 这次我们在Router内部访问context

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/upload" element={loggedIn ? <ProductUpload /> : <Login />} />
        <Route path="/products" element={loggedIn ? <Products /> : <Login />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;

