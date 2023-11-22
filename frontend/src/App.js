import { Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './ui-components/Login';
import Main from './ui-components/Main';
import List from './elements/List';
import Employee from './elements/Employee';
import { Logout } from './elements/Logout';
import { RequireAuth } from './elements/Auth';
import { RequireAdminAuth } from './elements/AdminAuth';

function App() {
  return (
    <div >
      <Routes>
        <Route path="/" element={<Login/>}/>        
        <Route path="/logout" element={<Logout/>}/>
        <Route path='/list' element={<RequireAuth><Main child={<List />}/></RequireAuth>}/>
        <Route path='/addemployee' element={<RequireAdminAuth><Main child={<Employee/>}/></RequireAdminAuth>}/>
      </Routes>
    </div>
  );
}

export default App;
