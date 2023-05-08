import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import { BrowserRouter, Routes, Route } from "react-router-dom";
import RandomGrid from './pages/randomGrid';
import GridSolver from './pages/gridSolver';


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/solver' element={<GridSolver />}/>
        <Route path="/" element={<RandomGrid />}>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render( <App /> );
