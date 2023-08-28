import './App.css';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Home from './views/home';
import MainWrapper from './layouts/MainWrapper';
import Login from './views/login';
import Logout from './views/logout';
import Register from './views/register';
import PostList from './components/PostList';
import UserPage from './components/UserPage';

function App() {
    return (
        <BrowserRouter>
            <MainWrapper>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/logout" element={<Logout />} />
                    <Route path="/users/:userName" element={<UserPage />} />
                </Routes>
                <PostList />
            </MainWrapper>
        </BrowserRouter>
    );
}

export default App;
