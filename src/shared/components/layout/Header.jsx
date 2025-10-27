import { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectNotifications } from '../../../features/login/slices/loginSlice';
import UserProfile from './UserProfile';

export default function Header({ title, onMenuClick }) {
  const notifications = useSelector(selectNotifications);
  const [showSearch, setShowSearch] = useState(false);

  return (
    <>
      <header className="h-16 bg-card-light dark:bg-card-dark border-b border-border-light dark:border-border-dark flex items-center justify-between px-4 sm:px-6">
        <div className="flex items-center gap-3 min-w-0">
          {/* Boton  hamburguesa */}
          <button
            onClick={onMenuClick}
            className="lg:hidden text-muted-light dark:text-muted-dark hover:text-foreground-light dark:hover:text-foreground-dark flex-shrink-0 items-center justify-center"
            aria-label="Abrir menú"
          >
            <span className="material-symbols-outlined">menu</span>
          </button>
          <h2 className="text-lg sm:text-2xl font-bold tracking-tight truncate items-center">{title}</h2>
        </div>

        <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0">
          {/* Buscador */}
          <div className="hidden md:block relative">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-muted-light dark:text-muted-dark">search</span>
            <input
              type="text"
              placeholder="Buscar..."
              className="bg-background-light dark:bg-background-dark border border-border-light dark:border-border-dark rounded-full w-48 lg:w-64 pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary text-sm"
              aria-label="Buscar en la aplicación"
            />
          </div>

          {/* Boton de busqueda en movil */}
          <button
            onClick={() => setShowSearch(!showSearch)}
            className="md:hidden text-muted-light dark:text-muted-dark hover:text-foreground-light dark:hover:text-foreground-dark flex items-center justify-center h-full"
            aria-label="Buscar"
          >
            <span className="material-symbols-outlined">search</span>
          </button>
          <button
            className="relative text-muted-light dark:text-muted-dark hover:text-foreground-light dark:hover:text-foreground-dark flex items-center justify-center h-full"
            aria-label="Notificaciones"
          >
            <span className="material-symbols-outlined">notifications</span>
            {notifications > 0 && (
              <span className="absolute -top-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
              </span>
            )}
          </button>

          <UserProfile />
        </div>
      </header>

      {/* Barra de busqueda en movil expandible */}
      {showSearch && (
        <div className="bg-card-light dark:bg-card-dark border-b border-border-light dark:border-border-dark p-4 md:hidden">
          <div className="relative">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-muted-light dark:text-muted-dark">search</span>
            <input
              type="text"
              placeholder="Buscar..."
              className="bg-background-light dark:bg-background-dark border border-border-light dark:border-border-dark rounded-full w-full pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary text-sm"
              aria-label="Buscar en la aplicación"
              autoFocus
            />
          </div>
        </div>
      )}
    </>
  );
}