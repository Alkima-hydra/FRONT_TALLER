import { useSelector } from 'react-redux';
import { selectUser } from '../../../features/login/slices/loginSlice';

export default function UserProfile() {
  const user = useSelector(selectUser);
  if (!user) return null;
  // TODO: Agregar opcion para cerrar sesión al acercarse a la wea
  return (
    <div className="flex items-center gap-3">
      <div className="hidden sm:block">
        <p className="font-semibold text-sm">{user.name}</p>
        <p className="text-xs text-muted-light dark:text-muted-dark">{user.role}</p>
      </div>
    </div>
  );
}