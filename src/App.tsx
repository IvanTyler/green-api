import { useState } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { LoginScreen } from './Components/features/Auth/LoginScreen/LoginScreen';
import type { LoginFormValues } from './Components/features/Auth/LoginScreen/LoginScreen.schema';
import { ChatScreen } from './Components/features/Chat/ChatScreen/ChatScreen';

function App() {
  const [credentials, setCredentials] = useState<LoginFormValues | null>(null);
  const navigate = useNavigate();

  const handleLoginSubmit = (values: LoginFormValues) => {
    console.log('форма прошла валидацию и запрос успешен:', values);
    setCredentials(values);
    navigate('/chat');
  };

  return (
    <Routes>
      <Route path="/" element={<LoginScreen onSubmit={handleLoginSubmit} />} />
      <Route path="/chat" element={credentials ? <ChatScreen /> : <Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
