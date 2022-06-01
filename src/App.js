import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { store } from "./config/redux/store";
import Contribution from "./containers/admin/pages/contribution";
import Quiz from "./containers/admin/pages/contribution/quiz";
import NewQuiz from "./containers/admin/pages/contribution/quiz/new";

import AdminDashboard from "./containers/admin/pages/dashboard/Index";
import User from "./containers/admin/pages/User";
import DoQuiz from "./containers/student/pages/doquiz";
import DoQuizShow from "./containers/student/pages/doquiz/show";
import PublicDashboard from "./containers/public/pages/HomePage";
import Login from "./containers/public/pages/Login"
import Layout from "./containers/templates/Layout";
import Private from "./containers/templates/RequireAuth";
import ScoreList from "./containers/student/pages/scorelist";
import Register from "./containers/public/pages/Register";


export default function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<PublicDashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/student" element={<Private group="student" />} >
              <Route index element={<PublicDashboard />} />
              <Route path="quiz">
                <Route index element={<DoQuiz />} />
                <Route path=":id" element={<DoQuizShow />} />
              </Route>
              <Route path="score">
                <Route index element={<ScoreList/>} />
              </Route>
            </Route>
            <Route path="/admin" element={<Private group="admin" />}>
              <Route index element={<AdminDashboard />} />
              <Route path="users">
                <Route index element={<User/>}/>
              </Route>
              <Route path="kontribusi">
                <Route index element={<Contribution />} />
                <Route path="quiz/:id">
                  <Route index element={<Quiz />} />
                  <Route path="new" element={<NewQuiz/>} />
                </Route>
              </Route>
            </Route>
          </Route>
        </Routes>
      </Provider>
    </BrowserRouter>
  );
}