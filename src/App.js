import {BrowserRouter,Routes,Route} from "react-router-dom";
import Layout from './common/header/layouts/Layouts';
import DoInquiry from './common/inquiry/components/doinquiry'

function App() {
  return (
    <BrowserRouter>
    <Routes>
      {/* <Route path="/" element={<Layout/>}> */}
      <Route path="/" element={<DoInquiry/>}></Route>
      {/* </Route> */}
    </Routes>
    </BrowserRouter>
  );
}

export default App;