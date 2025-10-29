import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from './slices/loginThunks';
import { selectIsLoading, selectError } from './slices/loginSelectors';
import LoginPanel from './components/LoginPanel';
import LoginForm from './components/LoginForm';
import HeroPanel from './components/HeroPanel';

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e?.preventDefault();
    console.log('[Login] Enviando formulario:', formData);

    const result = await dispatch(loginUser(formData));

    if (loginUser.fulfilled.match(result)) {
      console.log('[Login] Login exitoso, redirigiendo...');
      navigate('/dashboard');
    } else {
      console.error('[Login] Falló el login:', result.payload);
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      <LoginPanel>
        <LoginForm 
          onSubmit={handleSubmit}
          formData={formData}
          setFormData={setFormData}
          showPassword={showPassword}
          setShowPassword={setShowPassword}
          isLoading={isLoading}
          error={error}
        />
      </LoginPanel>

      <HeroPanel />
    </div>
  );
}