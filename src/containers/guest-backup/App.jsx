import { Fragment } from 'react';
import { BrowserRouter, Routes, Route, Outlet, useParams} from 'react-router-dom';
import Navbar from './templates/Navbar';

import Quiz from './pages/Quiz';
import Kontribusi from './pages/Quiz/Kontribusi';
import Login from './pages/auth/Login';
import { Provider } from 'react-redux';
import { store } from '../../config/redux/store';
import MessageBlock from '../generic-templates/MessageBlock'
// import Category from './pages/category';

function App() {
  return (
    <>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" exact element={<GuestLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="teams" element={<Teams />}>
              <Route index element={<LeagueStandings />} />
              <Route path=":teamId" element={<Team />} />
              <Route path="new" element={<NewTeamForm />} />
            </Route>
            <Route path="quiz">
              <Route index element={<Quiz />} />
            </Route>
            <Route path="kontribusi">
              <Route index element={<Kontribusi />} />
            </Route>
            <Route path="login">
              <Route index element={<Login />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes> 
      </BrowserRouter>,
    </Provider>
    </>
  )
}

export default App;

function GuestLayout() {
  return (
    <>
      <Navbar/>
      <div className="container mt-4">
        <MessageBlock />
        <Outlet />
      </div>
    </>
  )
}
function NotFound() {
  return (
    <>
      <h1>404</h1>
    </>
  )
}
function Dashboard() {
  return (
    <>
      <h1>Selamat Datang Pengunjung</h1>
    </>
  )
}
function Teams() {
  return (
    <>
      <h1>Teams</h1>
      <Outlet />
    </>
  )
}
function Team() {
  let { teamId } = useParams();
  return (
    <><h1>Team { teamId }</h1></>
  )
}
function NewTeamForm() {
  return (
    <><h1>NewTeamForm</h1></>
  )
}
function LeagueStandings() {
  return (
    <><h1>LeagueStandings</h1></>
  )
}