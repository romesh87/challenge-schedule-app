import './App.css';

import NavBar from './components/NavBar';
import Sidebar from './components/Sidebar';
import AppointmentList from './components/AppointmentList';

function App() {
  return (
    <>
      <header>
        <NavBar />
      </header>
      <div className="container">
        <Sidebar />
        <main>
          <AppointmentList />
        </main>
      </div>
    </>
  );
}

export default App;
