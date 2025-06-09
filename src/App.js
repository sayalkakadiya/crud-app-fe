import logo from './logo.svg';
import './App.css';
import UserCrud from './components/UserCrud';
import Pagination from './components/Pagination';
import UserFilter from './components/UserFilter';
import UserTable from './components/UserTable';

function App() {
  return (
    <div className="App">
      <h6>react & node api</h6>
      <UserCrud />
      {/* <Pagination />
      <UserFilter />
      <UserTable /> */}
    </div>
  );
}

export default App;
