import React from 'react';
import './App.css';
import Homepage from './layouts/logsignpage';
import { Routes,Route } from 'react-router-dom';
import Deleteanalyticspage from './layouts/deleteanalyticspage';
import Buttongroup from './components/buttongroup';
import Createquizpage from './layouts/createquizpage';
import Quizpublishedpage from './layouts/quizpublishedpage';
import Quizcompleted from './layouts/quizcompleted';
import Thankyoupage from './layouts/thankyoupage';
import Dashboardpage from './layouts/dashboardpage';
import Quizinterfacetext from './layouts/quizinterfacetext';
import Quizinterfaceimages from './layouts/quizinterfaceimages';
import Quizinterfacetextimage from './layouts/quizinterfacetextimage';
import Createquiztype from './layouts/createquiztype';
import Quizanalyticspage from './layouts/quizanalyticspage';
import Pollanalyticspage from './layouts/pollanalyticspage';
import CreatePoll from './layouts/createpolltype';
import QuizTable from './layouts/tablepage';
import Pollinterfacetext from './layouts/pollinterfacetext';
import Pollinterfaceimage from './layouts/pollinterfaceimage';
import Pollinterfacetextimage from './layouts/pollinterfacetextimage';
import CreateQuizType from './layouts/createquiztype';
import CreateQuizComponent from './reduxcomponents/createQuizComponent';
import QuizList from './reduxcomponents/quizList';
import HeroDiv from './layouts/heroDiv';
import MainQuizInterface from './layouts/mainQuizInterface';

function App() {
  
  return (
    <div className="App">
      <Routes> 
        <Route exact path='/' element={<Homepage/>}/>
        {/* <Route path='/login' element={<Homepage/>}/> */}
      <Route path='/heroDiv' element={<HeroDiv/>}/>
        <Route path='/createquiztype' element={<Createquiztype/>}/>
        <Route path='/quizpublishedpage' element={<Quizpublishedpage/>}/>
        <Route path='/congratspage' element ={<Quizcompleted/>}/>
        <Route path='/thankyoupage' element ={<Thankyoupage/>}/>
        <Route path='/deletepage' element ={<Deleteanalyticspage/>}/>
        <Route path='/quizanalyticspage' element ={<Quizanalyticspage/>}/>
        <Route path="/quiz/:id" element={<MainQuizInterface />} />

        {/* common file -> useEffect getQuizById ->ui check->qna | poll-> redirect*/}




        {/* <QuizTable/> */}

      
     
    
     
    {/* <Quizpublishedpage/> */}
    {/* <Quizinterfacetext/> */}
    {/* <Quizinterfaceimages/> */}
    {/* <Quizinterfacetextimage/> */}
    

    
    {/* <Pollanalyticspage/> */}
    {/* <CreatePoll/> */}
   
    {/* <Pollinterfacetext/> */}
    {/* <Pollinterfaceimage/> */}
    {/* <Pollinterfacetextimage/> */}
     {/* <CreateQuizComponent/> 
     <QuizList/> */}
    </Routes>
   
    </div>
  );
}

export default App;
