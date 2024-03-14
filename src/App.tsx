import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AuthProvider } from 'feature/auth/provider/AuthProvider';
import { AuthGuard } from 'feature/auth/component/AuthGuard';

import { HomePage } from 'components/Pages/HomePage';
import { PlayerPage } from 'components/Pages/PlayerPage';
import { AccountPage } from 'components/Pages/AccountPage';
import { SignupPage } from 'components/Pages/SignupPage';
import { LoginPage } from 'components/Pages/LoginPage';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/app" element={<AuthGuard element={<HomePage />} />} />

          <Route path="/app/player" element={<PlayerPage />} />

          <Route path="/app/account" element={<AccountPage />} />
          <Route path="/app/account/signup" element={<SignupPage />} />
          <Route path="/app/account/login" element={<LoginPage />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
