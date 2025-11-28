import { Eye } from 'lucide-react';

export default function AuditTable({ data, onViewDetails }) {
  const getStatusColor = (http_status) => {
    if (http_status >= 200 && http_status < 300) return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
    if (http_status >= 400 && http_status < 500) return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
    if (http_status >= 500) return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
    return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
  };

  const getMethodColor = (http_method) => {
    const colors = {
      GET: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
      POST: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
      PUT: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
      PATCH: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
      DELETE: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
    };
    return colors[http_method] || 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
  };

  const translateMethod = (method) =>{
    const translations = {
      GET: "Obtiene",
      POST: "Crea",
      PUT: "Modifica",
      PATCH: "Actualiza parcialmente",
      DELETE: "Elimina",
    };
  
    return translations[method?.toUpperCase()] || "Desconocido";
  }
  

  return (
    <div className="overflow-hidden rounded-lg border border-border-light bg-card-light dark:border-border-dark dark:bg-card-dark">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-border-light dark:divide-border-dark">
          <thead className="bg-background-light dark:bg-background-dark">
            <tr>
              <th className="w-1/3 px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-light dark:text-muted-dark">
                Petición HTTP
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-light dark:text-muted-dark">
                Nombre
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-light dark:text-muted-dark">
                Correo
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-light dark:text-muted-dark">
                Cambio 
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-light dark:text-muted-dark">
                Fecha
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-light dark:text-muted-dark">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-light bg-card-light dark:divide-border-dark dark:bg-card-dark">
            {data.length === 0 ? (
              <tr>
                <td colSpan="5" className="px-6 py-8 text-center text-sm text-muted-light dark:text-muted-dark">
                  No hay registros de auditoría disponibles
                </td>
              </tr>
            ) : (
              data.map((item) => (
                <tr key={item.id_log} className="hover:bg-background-light dark:hover:bg-background-dark">
                  <td className="px-6 py-4">
                    <div className="flex flex-col gap-2">
                      <div className="flex flex-wrap gap-2">
                        <span className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${getStatusColor(item.http_status)}`}>
                          {item.http_status}
                        </span>
                        <span className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${getMethodColor(item.http_method)}`}>
                          {translateMethod(item.http_method)}
                        </span>
                      </div>
                      <span className="text-sm text-foreground-light dark:text-foreground-dark">
                        {item.url}
                      </span>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-foreground-light dark:text-foreground-dark">
                    {item.name || "Nombre desconocido"}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-foreground-light dark:text-foreground-dark">
                    {item.username}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-muted-light dark:text-muted-dark">
                    {item.ip_address}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-muted-light dark:text-muted-dark">
                    {new Date(item.created_at).toLocaleString()}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm">
                    <button
                      onClick={() => onViewDetails(item)}
                      className="inline-flex items-center gap-2 rounded-md bg-primary px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                    >
                      <Eye className="h-4 w-4" />
                      Ver Detalle
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}