import './App.css';
import { Topnav } from './components/topnav/Topnav';
import { Route, Routes } from 'react-router-dom';
import { HomePage } from './pages/homePage/HomePage';
import { MeetupdetailPage } from './pages/meetupdetailPage/MeetupdetailPage';

function App() {
  return (
    <>
      <div className="App">
        <Topnav />

        <Routes>
          <Route path="/" element={<HomePage/ >} />
          <Route path={`/eventdetail/:meetId`} element={<MeetupdetailPage />} />
        </Routes>

      </div>
    </>
  );
}

export default App;
