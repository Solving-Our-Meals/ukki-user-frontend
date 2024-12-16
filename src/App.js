import {BrowserRouter,Routes,Route} from "react-router-dom";
import styles from "../src/common/header/css/reset.css";
import Layout from "./user/layouts/UserLayout";
import '../src/common/header/css/reset.css';

function App() {
  return (
    <BrowserRouter style={styles}>
    <Routes>
      <Route path="/" element={<Layout/>}>
      </Route>
    </Routes>
    </BrowserRouter>
  );
}

export default App;