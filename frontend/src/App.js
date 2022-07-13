// import logo from './logo.svg';
import './App.css';

import Home from './pages/Home'
import Contact from './pages/Contact';
import Service from './pages/Service';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Error from './_utils/Error';
import Layout from './pages/layout';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route element={<Layout />} >
          <Route index element={<Home />} />

          <Route path="/home" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/service" element={<Service />} />

          <Route path="*" element={<Error />} />
        </Route>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
