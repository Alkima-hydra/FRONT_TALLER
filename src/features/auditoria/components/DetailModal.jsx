import { X } from 'lucide-react';
import routeDescriptions from "../data/routeDescriptions.json";

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
  
  //Traduce el método HTTP al español
  const translateMethod = (method) =>{
    console.log(data[0]);

    const translations = {
      GET: "Obtiene",
      POST: "Crea",
      PUT: "Modifica",
      PATCH: "Actualiza parcialmente",
      DELETE: "Elimina",
    };
  
    return translations[method?.toUpperCase()] || "Desconocido";
  }
  
  //Traduccion router
  const translateRoute=(method, originalUrl) => {
    let url = originalUrl;

    // Detectar y extraer valor de search
    let searchValue = null;
    const searchMatch = url.match(/search=([^&]+)/);
    if (searchMatch) {
      searchValue = decodeURIComponent(searchMatch[1].replace(/\+/g, " "));
      url = url.replace(/\?.*$/, ""); // elimina query para buscar en JSON
    }

    // Quitar slash final
    url = url.replace(/\/$/, "");

    // Reemplaza cualquier número por :id
    const urlClean = url.replace(/\/\d+/g, "/:id");

    const routeObj = routeDescriptions[urlClean];
    console.log("Translating route:", { method, originalUrl, urlClean, routeObj });

    if (routeObj) {
      let translation = routeObj[method];

      // Caso especial de búsqueda
      if (!translation && searchValue && routeObj["GET?search"]) {
        translation = routeObj["GET?search"].replace("{search}", searchValue);
      }

      if (translation) return translation;
    }

    // Fallback cuando no existe en el JSON
    return `${translateMethod(method)} en ${urlClean}`;
  };
  

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
          
          <div className="mb-6 pb-4 border-b border-border-light dark:border-border-dark">
            <div className="text-sm font-semibold text-blue-600 dark:text-blue-400 mb-1">
              {data.application_name}
            </div>
          </div>

          {/* Primary Section - Action */}
          <div className="mb-6">
            <div className="text-2xl font-semibold text-foreground-light dark:text-foreground-dark mb-1">
              {translateRoute(data.http_method, data.url)}
            </div>
          </div>

          {/* Secondary Section - User Info */}
          <div className="mb-6 pb-6 border-b border-border-light dark:border-border-dark">
            <div className="text-base font-medium text-foreground-light dark:text-foreground-dark mb-1">
              {data.nombre_usuario}
            </div>
            <div className="text-sm text-muted-light dark:text-muted-dark">
              {data.username}
            </div>
          </div>

            <div className="py-3">
              <dt className="text-sm font-medium text-muted-light dark:text-muted-dark mb-2">
                Información Temporal
              </dt>
              <dd className="mt-1">
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 rounded-lg p-4 border border-blue-200 dark:border-blue-800">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex flex-col">
                      <span className="text-xs font-medium text-blue-600 dark:text-blue-400 mb-1">
                        Inicio
                      </span>
                      <span className="text-sm font-semibold text-foreground-light dark:text-foreground-dark">
                        {data.fecha_inicio ? new Date(data.fecha_inicio).toLocaleString() : 'N/A'}
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs font-medium text-blue-600 dark:text-blue-400 mb-1">
                        Fin
                      </span>
                      <span className="text-sm font-semibold text-foreground-light dark:text-foreground-dark">
                        {data.fecha_fin ? new Date(data.fecha_fin).toLocaleString() : 'N/A'}
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs font-medium text-blue-600 dark:text-blue-400 mb-1">
                        Duración
                      </span>
                      <span className="text-sm font-bold text-indigo-600 dark:text-indigo-400">
                        {data.duracion_ms ? `${data.duracion_ms} ms` : 'N/A'}
                      </span>
                    </div>
                  </div>
                </div>
              </dd>
            </div>
            
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