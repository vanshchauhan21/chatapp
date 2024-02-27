
import React from 'react'
import './App.css';

import{BrowserRouter as Router,Routes ,Route} from "react-router-dom";
import Chatt from './component/Chatt/Chatt';
import Joined from './component/Joined/Joined';


function App() {


  return (
    <div className='App'>
      



      <Router>
<Routes>
        <Route  path="/" Component={Joined} />
        <Route path="/Chatt" Component={Chatt} />
        </Routes>
      </Router>
    </div>
  )
}

export default App








