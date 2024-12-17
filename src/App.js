
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Signup from '../src/user/pages/signup/pages/Signup';
import Info from './user/pages/info/Info';
import UserLayout from './user/layouts/UserLayout';
import StoreDetail from './user/pages/storedetail/pages/StoreDetail';
import UserDoInquiry from './common/inquiry/components/UserDoInquiry';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="auth/login" element={<Signup/>}/>
      <Route></Route>
      <Route path="/" element={<UserLayout/>}>
      <Route path="info" element={<Info/>}/>
      <Route path="store" element={<StoreDetail/>}/>
      <Route path="inquiries" element={<UserDoInquiry/>}/>
      </Route>
    </Routes>
    </BrowserRouter>
  );
}

export default App;