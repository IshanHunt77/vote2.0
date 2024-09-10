import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Signup } from './Components/Admin/Signup';
import { Signin } from './Components/Admin/Signin';
import { Createpoll } from './Components/Admin/Createpoll';
import { Polls } from './Components/Admin/Polls';
import { Results } from './Components/Admin/Results';
import { UserSignup } from './Components/User/UserSignup';
import { UserSignin } from './Components/User/UserSignin';
import { UserCreatepoll } from './Components/User/UserCreatepoll';
import { UserPolls } from './Components/User/UserPolls';
import { Home } from './Components/Home';
import { TokenProvider } from './Components/Admin/TokenContext';  // Correct path
import { AddressProvider } from './Components/Admin/AddressContext';
import { NameProvider } from './Components/Admin/NameContext';

function App() {
    return (
        <TokenProvider>
            <AddressProvider>
                <NameProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/admin/signup" element={<Signup />} />
                    <Route path="/admin/signin" element={<Signin />} />
                    <Route path="/admin/createpoll" element={<Createpoll />} />
                    <Route path="/admin/polls" element={<Polls />} />
                    <Route path="/admin/results" element={<Results />} />
                    <Route path="/user/signup" element={<UserSignup />} />
                    <Route path="/user/signin" element={<UserSignin />} />
                    <Route path="/user/createpoll" element={<UserCreatepoll />} />
                    <Route path="/user/polls" element={<UserPolls />} />
                    <Route path="/user/results" element={<UserPolls />} />
                </Routes>
            </Router>
            </NameProvider>
            </AddressProvider>
        </TokenProvider>
    );
}

export default App;
