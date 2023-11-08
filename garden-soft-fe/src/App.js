import logo from './logo.svg';
import './App.css';
import { ListCustomer } from './components/ListCustomer';
import { CreateCustomer } from './components/CreateCustomer';
import { ImPortFile } from './components/ImPortFile';
import { Route, Routes } from 'react-router';
import { DetailCustomer } from './components/DetailCustomer';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<ListCustomer />}></Route>
        <Route path="/addCustomer" element={<CreateCustomer />}></Route>
        <Route path="/import" element={<ImPortFile/>}></Route>
        <Route path="/detail/:idCustomer" element={<DetailCustomer/>}></Route>
      </Routes>
    </>
  );
}

export default App;
