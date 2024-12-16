import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Signup from './user/pages/Signup';

function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path="auth/login" element={<Signup/>}/>
      <Route></Route>
    </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
