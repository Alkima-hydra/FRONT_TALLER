

import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams, Link } from 'react-router-dom';

import {
  changeUsuarioPassword,
  selectUsuariosIsChangingPassword,
  selectUsuariosError,
  selectUsuariosLastChangeResponse,
} from '../usuarios/slices/usuariosSlice';

export default function RestaurarContrasenaPage() {
  const dispatch = useDispatch();
  const [params] = useSearchParams();
  const token = useMemo(() => params.get('token') || '', [params]);

  const isChanging = useSelector(selectUsuariosIsChangingPassword) || false;
  const lastChangeResponse = useSelector(selectUsuariosLastChangeResponse);
  const sliceError = useSelector(selectUsuariosError);

  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const validate = () => {
    if (!token) return 'Token inválido o faltante en el enlace.';
    if (!password) return 'Ingresa una nueva contraseña.';
    if (password.length < 8) return 'La contraseña debe tener al menos 8 caracteres.';
    if (password !== confirm) return 'Las contraseñas no coinciden.';
    return '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);
    const v = validate();
    if (v) {
      setErrorMsg(v);
      return;
    }
    setErrorMsg('');
    try {
      const action = await dispatch(changeUsuarioPassword({ token, newPassword: password }));
      if (action.meta.requestStatus === 'fulfilled') {
        setSuccessMsg('Tu contraseña fue actualizada correctamente.');
      } else {
        const payload = action.payload;
        const msg = typeof payload === 'string' ? payload : (payload?.message || 'No se pudo actualizar la contraseña.');
        setErrorMsg(msg);
      }
    } catch (err) {
      const msg = err?.response?.data?.message || err?.message || 'Error inesperado al actualizar la contraseña.';
      setErrorMsg(msg);
    }
  };

  useEffect(() => {
    if (!submitted) return;
    if (!sliceError) return;
    setErrorMsg(typeof sliceError === 'string' ? sliceError : (sliceError?.message || 'Ocurrió un error.'));
  }, [sliceError, submitted]);

  const PasswordField = ({ id, label, value, onChange, show, setShow }) => (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="block text-sm font-medium text-gray-900 dark:text-gray-300">{label}</label>
      <div className="relative">
        <input
          id={id}
          type={show ? 'text' : 'password'}
          value={value}
          onChange={onChange}
          className="bg-background-light dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5 pr-10"
          placeholder="••••••••"
          autoComplete="new-password"
        />
        <button
          type="button"
          onClick={() => setShow(!show)}
          className="absolute inset-y-0 right-0 px-3 text-gray-500 hover:text-gray-700 dark:text-gray-300"
          aria-label={show ? 'Ocultar contraseña' : 'Mostrar contraseña'}
        >
          <span className="material-symbols-outlined align-middle">{show ? 'visibility_off' : 'visibility'}</span>
        </button>
      </div>
    </div>
  );

  const isTokenMissing = !token || token.length < 10;

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
        <div className="flex items-center gap-2 mb-4">
          <span className="material-symbols-outlined text-2xl">lock_reset</span>
          <h1 className="text-lg font-semibold">Restablecer contraseña</h1>
        </div>

        {isTokenMissing && (
          <div className="mb-4 rounded-lg p-3 bg-amber-100 text-amber-900 dark:bg-amber-900 dark:text-amber-100">
            El enlace no es válido o falta el parámetro <code>token</code>. Vuelve a solicitar el correo de restablecimiento.
          </div>
        )}

        {successMsg ? (
          <div className="space-y-4">
            <div className="rounded-lg p-3 bg-emerald-100 text-emerald-900 dark:bg-emerald-900 dark:text-emerald-100">
              {successMsg}
            </div>
            <Link to="/login" className="inline-flex items-center gap-2 px-5 py-2 rounded-lg bg-primary text-white hover:bg-primary/90">
              <span className="material-symbols-outlined">login</span>
              Ir a iniciar sesión
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <PasswordField
              id="new-pass"
              label="Nueva contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              show={showPass}
              setShow={setShowPass}
            />

            <PasswordField
              id="confirm-pass"
              label="Confirmar contraseña"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              show={showConfirm}
              setShow={setShowConfirm}
            />

            {errorMsg && (
              <div className="rounded-lg p-3 bg-rose-100 text-rose-900 dark:bg-rose-900 dark:text-rose-100 text-sm">{errorMsg}</div>
            )}

            <button
              type="submit"
              disabled={isChanging || isTokenMissing}
              className={`w-full inline-flex items-center justify-center gap-2 px-5 py-2 rounded-lg text-white ${
                isChanging || isTokenMissing ? 'bg-primary/60 cursor-not-allowed' : 'bg-primary hover:bg-primary/90'
              }`}
            >
              <span className="material-symbols-outlined">key</span>
              {isChanging ? 'Actualizando…' : 'Actualizar contraseña'}
            </button>

            <div className="text-xs text-gray-500 dark:text-gray-400">
              Si este enlace expiró, vuelve a solicitar el correo de restablecimiento desde la pantalla de inicio de sesión.
            </div>
          </form>
        )}
      </div>
    </div>
  );
}