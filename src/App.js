import React from 'react';
import './App.css';
import Homepage from './layouts/logsignpage';
import { Routes, Route, Navigate } from 'react-router-dom';
import Deleteanalyticspage from './layouts/deleteanalyticspage';
import Createquizpage from './layouts/createquizpage';
import Quizpublishedpage from './layouts/quizpublishedpage';
import Quizcompleted from './layouts/quizcompleted';
import Thankyoupage from './layouts/thankyoupage';
import Quizanalyticspage from './layouts/quizanalyticspage';
import HeroDiv from './layouts/heroDiv';
import MainQuizInterface from './layouts/mainQuizInterface';
import ProtectedRoute from './routes/protectedRoutes'; // Import the ProtectedRoute component

function App() {
  const token = localStorage.getItem('token');
  return (
    <div className="App">
      <Routes>
      <Route exact path="/" element={token ? <Navigate to="/dashboard" /> : <Homepage />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <HeroDiv />
            </ProtectedRoute>
          }
        />
        <Route
          path="/createquiztype"
          element={
            <ProtectedRoute>
              <Createquizpage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/quizpublishedpage"
          element={
            <ProtectedRoute>
              <Quizpublishedpage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/congratspage"
          element={
            <ProtectedRoute>
              <Quizcompleted />
            </ProtectedRoute>
          }
        />
        <Route
          path="/thankyoupage"
          element={
            <ProtectedRoute>
              <Thankyoupage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/deletepage"
          element={
            <ProtectedRoute>
              <Deleteanalyticspage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/quizanalyticspage"
          element={
            <ProtectedRoute>
              <Quizanalyticspage />
            </ProtectedRoute>
          }
        />
        <Route path="/quiz/:id" element={<MainQuizInterface />} />
      </Routes>
    </div>
  );
}

export default App;
