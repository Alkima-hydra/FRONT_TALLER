import { useSelector } from 'react-redux';
import { selectUser } from '../../../features/login/slices/loginSlice';

export default function UserProfile() {
  const user = useSelector(selectUser);
  if (!user) return null;

  return (
    <div className="flex items-center gap-3">
      <img
        alt={`Avatar de ${user.name}`}
        className="w-8 h-8 rounded-full object-cover"
        src={user.avatar}
      />
      <div className="hidden sm:block">
        <p className="font-semibold text-sm">{user.name}</p>
        <p className="text-xs text-muted-light dark:text-muted-dark">{user.role}</p>
      </div>
    </div>
  );
}