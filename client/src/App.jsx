import { useState } from 'react'
import reactLogo from './assets/react.svg'
import {BrowserRouter as Router,Routes, Route, Link} from "react-router-dom";
import './App.css'
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import ListPage from './pages/ListPage';
import CollaboratorPage from './pages/CollaboratorPage';

import ProtectedRoute from './components/protectedRoute/ProtectedRoute';
import NotFound from './pages/NotFound';
import InfosPage from './pages/InfosPage';
import SearchPage from './pages/SearchPage';
import ProtectedAdminRoute from './components/protectedAdminRoute/ProtectedAdminRoute';
import UpdateProfilePage from './pages/UpdateProfilePage';
import AddCollaboratorPage from './pages/AddCollaboratorPage';
import Header from './components/header/Header';

const App = () => {

  return (

    // Router
    <Router>

      <div className="App">
        
          <Header/>

          {/* Routes correspondants aux pages. */}
          <Routes>

            <Route path="/" element={<LoginPage />}/>

            {/* ************************************ */}
            {/* Routes protégées pour l'utilisateur. */}
            {/* ************************************ */}
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

              {/* ************************************** */}
              {/* Routes protégées pour l'administrateur */}
              {/* ************************************** */}
              <Route path="/collaborateur/modifier/:id" element={
                <ProtectedRoute>
                  <ProtectedAdminRoute>
                    <UpdateProfilePage/>
                  </ProtectedAdminRoute>
                </ProtectedRoute>}/>

              <Route path="/collaborateur/ajouter" element={
                 <ProtectedRoute>
                  <ProtectedAdminRoute>
                    <AddCollaboratorPage/>
                  </ProtectedAdminRoute>
               </ProtectedRoute>}/>

               {/* Pour toutes les routes qui ne correspondent pas aux autres */}
              <Route path="*" element={<NotFound/>}/>
              
          </Routes>
      </div>

    </Router>

  )
}

export default App
