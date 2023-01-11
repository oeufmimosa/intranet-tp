import { useState } from 'react'
import reactLogo from './assets/react.svg'
import {BrowserRouter as Router,Routes, Route, Link} from "react-router-dom";
import './App.css'
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import ListPage from './pages/ListPage';
import CollaboratorPage from './pages/CollaboratorPage';
import { useSelector } from "react-redux";
import DisconnectButton from './components/disconnect/DisconnectButton';
import ProtectedRoute from './components/protectedRoute/ProtectedRoute';
import NotFound from './pages/NotFound';
import InfosPage from './pages/InfosPage';
import SearchPage from './pages/SearchPage';

const App = () => {

  const { userSession } = useSelector( state => state.collaboratorReducer );

  return (

    <Router>

      <div className="App">
        {userSession.userConnection ?
          <>
            <p><Link to="/infos-personnelles">Bonjour {userSession.userConnection.firstname} {userSession.userConnection.lastname}</Link></p>
            <p><Link to="/collaborateurs">Liste</Link></p>
            <p><Link to="/infos-personnelles">Mon profil</Link></p>
            <p><Link to="/rechercher">Rechercher</Link></p>
            <DisconnectButton/>
          </>

        :
          null }
        
          <Routes>
            <Route path="/" element={<LoginPage />}/>
            <Route path="/accueil" element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>}/>
            <Route path="/collaborateurs" element={
              <ProtectedRoute>
                <ListPage />
              </ProtectedRoute>}/>
            <Route path="/collaborateur/:id" element={
              <ProtectedRoute>
                <CollaboratorPage/>
              </ProtectedRoute>}/>
              <Route path="/infos-personnelles" element={
              <ProtectedRoute>
                <InfosPage/>
              </ProtectedRoute>}/>
              <Route path="/rechercher" element={
              <ProtectedRoute>
                <SearchPage/>
              </ProtectedRoute>}/>
              <Route path="*" element={<NotFound/>}/>
          </Routes>
      </div>

    </Router>

  )
}

export default App
