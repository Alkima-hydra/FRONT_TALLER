import { navItems } from '../../config/navConfig';
import NavItem from './NavItem';

export default function Sidebar({ isOpen, onClose }) {
  return (
    <>
      {/* Overlay para mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:static inset-y-0 left-0 z-50
          w-64 flex-shrink-0 
          bg-card-light dark:bg-card-dark 
          border-r border-border-light dark:border-border-dark 
          flex flex-col
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        <div className="h-16 flex items-center justify-between border-b border-border-light dark:border-border-dark gap-3 px-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
              <span className="material-symbols-outlined text-white">health_cross</span>
            </div>
            <h1 className="text-lg font-bold">Sacramentos</h1>
          </div>
          {/* Boton cerrar en movil */}
          <button
            onClick={onClose}
            className="lg:hidden text-muted-light dark:text-muted-dark hover:text-foreground-light dark:hover:text-foreground-dark"
            aria-label="Cerrar menú"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => (
            <NavItem key={item.label} item={item} onClick={onClose} />
          ))}
        </nav>
      </aside>
    </>
  );
}