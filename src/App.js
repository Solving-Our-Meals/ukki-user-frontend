
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Signup from '../src/user/pages/signup/pages/Signup';
import Info from './user/pages/info/Info';
import UserLayout from './user/layouts/UserLayout';
import StoreDetail from './user/pages/storedetail/pages/StoreDetail';
import UserDoInquiry from './common/inquiry/components/UserDoInquiry';
import Main from './user/pages/main/Main';
import StoreDoInquiry from './common/inquiry/components/StoreDoInquiry';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="auth/signup" element={<Signup/>}/>
      <Route></Route>
      <Route path="/" element={<UserLayout/>}>
      <Route index element={<Main/>}/>
      <Route path="info" element={<Info/>}/>
      <Route path="main" element={<Main/>}/>
      <Route path="store" element={<StoreDetail/>}/>
      <Route path="inquiries" element={<UserDoInquiry/>}/>
      <Route path="sinquiries" element={<StoreDoInquiry/>}/>
      </Route>
    </Routes>
    </BrowserRouter>
  );
}

export default App;