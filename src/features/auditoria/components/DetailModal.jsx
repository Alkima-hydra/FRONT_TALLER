import { X } from 'lucide-react';

export default function DetailModal({ isOpen, onClose, data }) {
  if (!isOpen || !data) return null;

  const parseRequestBody = (requestBody) => {
    if (!requestBody) return null;
    if (typeof requestBody === 'object') return requestBody;
    if (typeof requestBody === 'string') {
      try {
        return JSON.parse(requestBody);
      } catch {
        return { error: 'Invalid JSON', raw: requestBody };
      }
    }
    return null;
  };

  const requestBody = parseRequestBody(data.request_body || data.requestBody);

  const DetailRow = ({ label, value }) => (
    <div className="py-3">
      <dt className="text-sm font-medium text-muted-light dark:text-muted-dark">
        {label}
      </dt>
      <dd className="mt-1 text-sm text-foreground-light dark:text-foreground-dark break-words">
        {value || 'N/A'}
      </dd>
    </div>
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black bg-opacity-50 p-4">
      <div className="relative w-full max-w-3xl rounded-lg border border-border-light bg-card-light shadow-xl dark:border-border-dark dark:bg-card-dark">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border-light px-6 py-4 dark:border-border-dark">
          <h3 className="text-lg font-semibold text-foreground-light dark:text-foreground-dark">
            Detalle de Auditoría
          </h3>
          <button
            onClick={onClose}
            className="rounded-md p-1 text-muted-light transition-colors hover:bg-background-light dark:text-muted-dark dark:hover:bg-background-dark"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="max-h-[calc(100vh-200px)] overflow-y-auto px-6 py-4">
          <dl className="divide-y divide-border-light dark:divide-border-dark">
            <DetailRow 
              label="Nombre de la Aplicación" 
              value={data.application_name} 
            />
            
            <DetailRow 
              label="Fecha de Inicio" 
              value={data.fecha_inicio ? new Date(data.fecha_inicio).toLocaleString() : 'N/A'} 
            />
            
            <DetailRow 
              label="Fecha de Fin" 
              value={data.fecha_fin ? new Date(data.fecha_fin).toLocaleString() : 'N/A'} 
            />
            
            <DetailRow 
              label="Duración" 
              value={data.duracion_ms ? `${data.duracion_ms} ms` : 'N/A'} 
            />
            
            <DetailRow 
              label="Correo" 
              value={data.username} 
            />
            
            <DetailRow 
              label="Método HTTP" 
              value={data.http_method} 
            />
            
            <DetailRow 
              label="Estatus del Método HTTP" 
              value={data.http_status} 
            />
            
            <DetailRow 
              label="Dirección IP" 
              value={data.ip_address} 
            />
            
            <DetailRow 
              label="URL (Endpoint)" 
              value={data.url} 
            />
            
            <div className="py-3">
              <dt className="text-sm font-medium text-muted-light dark:text-muted-dark">
                ¿Tiene Excepción?
              </dt>
              <dd className="mt-1">
                <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                  data.has_exception 
                    ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' 
                    : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                }`}>
                  {data.hasException ? 'Sí' : 'No'}
                </span>
              </dd>
            </div>
            
            <DetailRow 
              label="ID de Correlación" 
              value={data.correlation_id} 
            />
            
            <DetailRow 
              label="Información del Navegador" 
              value={data.user_agent} 
            />
            
            <div className="py-3">
              <dt className="text-sm font-medium text-muted-light dark:text-muted-dark">
                Parámetros de la Petición (Cuerpo)
              </dt>
              <dd className="mt-1">
                <pre className="bg-gray-100 p-4 rounded overflow-auto">
                  {requestBody 
                    ? JSON.stringify(requestBody, null, 2) 
                    : 'No request body'}
                </pre>
              </dd>
            </div>
          </dl>
        </div>

        {/* Footer */}
        <div className="flex justify-end border-t border-border-light px-6 py-4 dark:border-border-dark">
          <button
            onClick={onClose}
            className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}