
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Signup from './user/pages/Signup';
import Layout from './common/header/layouts/Layouts';
import DoInquiry from './common/inquiry/components/doinquiry'

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="auth/login" element={<Signup/>}/>
      <Route></Route>
      <Route path="/" element={<Layout/>}>
      </Route>
    </Routes>
    </BrowserRouter>
  );
}

export default App;