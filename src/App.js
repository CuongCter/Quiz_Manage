import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import AddQuestion from "./components/AddQuestion";
import AddExam from "./components/AddExam";
import ListQuestion from "./components/ListQuestion";
import ListExam from "./components/ListExam";
import Login from "./components/Login";
import LoginStudent from "./components/LoginStudent";
import LoginTeacher from "./components/LoginTeacher";
import Results from "./components/Results";
import StudentHome from "./components/StudentHome";
import Exams from "./components/Exams";
import Test from "./components/Test";

//import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/LoginStudent" Component={LoginStudent} />
        <Route path="/LoginTeacher" Component={LoginTeacher} />
        <Route path="/dashboard" Component={Dashboard} />
        <Route path="/ListQuestion" Component={ListQuestion} />
        <Route path="/AddQuestion" Component={AddQuestion} />
        <Route path="/AddExam" Component={AddExam} />
        <Route path="/ListExam" Component={ListExam} />
        <Route path="/Results" Component={Results}/>
        <Route path="/StudentHome" Component={StudentHome}/>
        <Route path="/Exams/:subjectKey" Component={Exams} />
        <Route path="/Test/:examKey" Component={Test} />
      </Routes>
    </BrowserRouter>
  );
}
 
export default App;