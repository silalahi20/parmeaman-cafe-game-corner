import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './components/Auth/AuthProvider';
import LoginForm from './components/Auth/LoginForm';
import RegisterForm from './components/Auth/RegisterForm';
import Home from './components/Home';
import FoodMenu from './components/Food/FoodMenu';
import GameList from './components/Games/GameList';
import FoodOrder from './components/Food/FoodOrder'; // Assuming you have a FoodOrder component
import FoodRecommendation from './components/Food/FoodRecommendation'; // Assuming you have this component
import SessionExpiredHandle from './components/Auth/SessionExpiredHandle';
import Header from './components/Layout/Header';
import GameRecommendation from './components/Games/GameRecommendation';


const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
      console.log('User not authenticated, redirecting...');
      return <Navigate to="/login" replace />;
  }

  return children;
};



function App() {
    return (
        <Router>
            <AuthProvider>
              <Header />
                <div>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/home" element={<Home />} /> 
                        <Route path="/login" element={<LoginForm />} />
                        <Route path="/register" element={<RegisterForm />} />
                        <Route path="/sessionExpired" element={<SessionExpiredHandle />} />
                        <Route
                            path="/foodMenu"
                            element={
                                <ProtectedRoute>
                                    <FoodMenu />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/gameList"
                            element={
                                <ProtectedRoute>
                                    <GameList />
                                </ProtectedRoute>
                            }
                        />
                        <Route path="/foodOrder" element={<ProtectedRoute><FoodOrder /></ProtectedRoute>} />
                        <Route path="/foodRecommendation" element={<ProtectedRoute><FoodRecommendation /></ProtectedRoute>} />
                        <Route path="/GameRecommendation" element={<ProtectedRoute><GameRecommendation /></ProtectedRoute>} />
                    </Routes>
                </div>
            </AuthProvider>
        </Router>
    );
}

export default App;
