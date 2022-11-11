import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import { CreatePage } from './pages/create/index';
import { VerifyPage } from './pages/verify/index';

export const App = () => {  
  return (
    <Routes>
      <Route path='/' element={<Navigate to="verify" />}/>
      <Route path='/verify' element={<VerifyPage />}/>
      <Route path='/create' element={<CreatePage />}/>
    </Routes>
  );
}

export default App;



