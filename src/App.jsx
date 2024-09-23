import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './assets/components/Home'
import Ejercicios from './assets/components/Ejercicios';
import Rutinas from './assets/components/Rutinas';
import Playground from './assets/components/Playground';
import Seleccion from './assets/components/Seleccion';
import Ranking from './assets/components/Ranking';
import NuevoReto from './assets/components/NuevoReto';
import ProtectedRoute from './assets/components/ProtectedRoute';
import Registro from './assets/components/Registro';
import Parques from './assets/components/Parques';

function App() {

  return (
        <Router>
            <div>
              <Routes>
                <Route path='/' element={<Home />}/>
                <Route path='/ejercicios' element={<Ejercicios />}/>
                <Route path='/rutinas' element={<Rutinas />}/>
                <Route path='/parques' element={<Rutinas />}/>
                <Route path='/playground' element={<Playground />}/>
                <Route path='/registro' element={<Registro />} />
                <Route path='/seleccion' element={
                  <ProtectedRoute>
                    <Seleccion />
                  </ProtectedRoute>
                }/> 
                <Route path="/ranking" element={
                  <ProtectedRoute>
                    <Ranking />
                  </ProtectedRoute>
                }/>
                <Route path="/nuevoreto" element={
                  <ProtectedRoute>
                    <NuevoReto />
                  </ProtectedRoute>
                }/>
              </Routes>
            </div>
        </Router>
  )
}

export default App
