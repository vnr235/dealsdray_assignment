import './App.css';
import Dashboard from './Components/Admin.jsx';
import CreateEmployee from './Components/Createemp.jsx';
import EmployeeEdit from './Components/Edit.jsx';
import EmployeeList from './Components/EmployeeList.jsx';
import Login from './Components/Login.jsx';
import AdminRegistration from './Components/Register.jsx';

function App() {
  return (
    <div className="App">
      {/* <Login/> */}
      <EmployeeList/>
      {/* <Dashboard/> */}
      {/* <EmployeeEdit/> */}
      {/* <CreateEmployee/> */}
      {/* <AdminRegistration/> */}
    </div>
  );
}

export default App;
