import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './components/authentication/Login';
import Register from './components/authentication/Signup';
import BlogList from './services/BlogList'
import AddBlog from './services/AddBlog'
import EditBlog from './services/EditBlog'
import Header from './pages/Header'
import HomePage from './pages/Home'
import BlogPage from './services/BlogPage'
import ProtectedRoute from './components/authentication/ProtectedRoute'
import { ProfileProvider } from './contexts/ProfileContext'
import ProfilePage from './pages/ProfilePage';
import 'bootstrap/dist/css/bootstrap.min.css';

const App: React.FC = () => {
    return (
           <ProfileProvider>
         <Router>
         <Header/>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/blog/:blogId" element={<BlogPage />} />
        <Route path ='/profile'
         element={
             <ProtectedRoute>
                <ProfilePage />
            </ProtectedRoute>
         }/>

        <Route path="/blog" element={<ProtectedRoute><BlogList /></ProtectedRoute>} />
        <Route path='/blog/add' element ={<ProtectedRoute><AddBlog/></ProtectedRoute>}/>
        <Route path ='/blog/edit/:id' element ={<ProtectedRoute><EditBlog/></ProtectedRoute>}/>
         </Routes>
    </Router>
    </ProfileProvider>
    );
};

export default App;








