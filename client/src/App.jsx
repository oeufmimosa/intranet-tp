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
import ProtectedAdminRoute from './components/protectedAdminRoute/ProtectedAdminRoute';
import UpdateProfilePage from './pages/UpdateProfilePage';
import AddCollaboratorPage from './pages/AddCollaboratorPage';

const App = () => {

  // Récupération des informations du reducer sur l'utilisateur connecté.
  const { userSession } = useSelector( state => state.collaboratorReducer );

  return (

    // Router
    <Router>

      <div className="App">
        <header className="Header">
          <h1 className="Nav-title">Bienvenue sur l'intranet</h1>
          <nav className="Nav">

            {/* Si l'utilisateur est connecté on affiche les lienx correspondants des routes protégées. */}
            {userSession.userConnection ?
              <>
                  <p className="Nav-link"><Link to="/infos-personnelles">Bonjour {userSession.userConnection.firstname} {userSession.userConnection.lastname}</Link></p>
                  <img style={{width: "50px", height:'50px'}}src={userSession.userConnection.photo} alt={userSession.userConnection.photo} />
                  <p className="Nav-link"><Link to="/collaborateurs">Liste</Link></p>
                  <p className="Nav-link"><Link to="/infos-personnelles">Mon profil</Link></p>
                  <p className="Nav-link"><Link to="/rechercher">Rechercher</Link></p>
                  
                  {/* Si l'utilisateur connecté est un admin on affiche l'ajout de collaborateur. */}
                  {userSession.userConnection.isAdmin ? 

                    <p className="Nav-link"><Link to="/collaborateur/ajouter">Ajouter un collaborateur</Link></p>
                  :
                    null
                  }
                <DisconnectButton/>
              </>
            :
              null }
          </nav>
        </header>

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
