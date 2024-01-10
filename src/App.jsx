import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './Home';
import Landing from './Landing';


function App() {
  return (
    <div className="App">
      <Routes>

        <Route path='/' element={<Landing/> }/>
        <Route path='/home' element={<Home/>}/>

      </Routes>
      
    </div>
  );
}

export default App;
