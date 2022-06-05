import './App.css';
import 조건검색페이지 from './component/조건검색페이지'
import 내시간표페이지 from './component/내시간표페이지'
import 조건검색결과페이지 from './component/조건검색결과페이지'
import 전체강의페이지 from './component/전체강의페이지'
import Introduce from './component/Introduce'
import Landing from './component/Landing'
import Login from './component/Login'
import Signup from './component/Signup'
import Headers from './component/Headers'
import { Route, BrowserRouter, Switch } from 'react-router-dom';

function App() {
  return (
    
      
      <BrowserRouter>
        <div className="App">
        <Route><Headers /></Route>
          <Switch>
            
            <Route exact path="/"><Landing /></Route>
            <Route exact path="/introduce"><Introduce /></Route>
            <Route exact path="/login"><Login /></Route>
            <Route exact path="/signup"><Signup /></Route>
            <Route exact path="/lecturelist"><전체강의페이지 /></Route>
            <Route exact path="/to-search"><조건검색페이지 /></Route>
            <Route exact path="/search-result"><조건검색결과페이지 /></Route>
            <Route exact path="/schedule"><내시간표페이지 /></Route>
          </Switch>
        </div>
      </BrowserRouter>
      
  );
}

export default App;
