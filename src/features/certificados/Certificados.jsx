import React, { useState } from 'react';
import Layout from '../../shared/components/layout/Layout';

export default function Certificados() {
  const [persona, setPersona] = useState('');
  const [tipo, setTipo] = useState('Bautizo');
  const [pdfUrl, setPdfUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  // === FUNCIÓN PARA OBTENER CERTIFICADO (equivalente a previsualizarCertificado en Vue) ===
  const previsualizarCertificado = async (nombre_certificado, nombre_estudiante) => {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:3002/mostrar-certificado?filename=bautizo-rellenable`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nombre_certificado,
          nombre_estudiante,
        }),
      });

      if (!response.ok) {
        throw new Error('Error al obtener certificado');
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      return url;
    } catch (error) {
      console.error('Error:', error);
      alert('No se pudo generar el certificado');
    } finally {
      setLoading(false);
    }
  };

  // === EVENTO DEL BOTÓN ===
  const handlePrevisualizar = async () => {
    if (!persona.trim()) {
      alert('Por favor ingresa el nombre de la persona');
      return;
    }

    const url = await previsualizarCertificado(tipo.toLowerCase(), persona);
    if (url) setPdfUrl(url);
  };

  return (
    <Layout title="Generación de Certificados">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* PANEL IZQUIERDO */}
        <section className="lg:col-span-1 space-y-6">
          <div className="bg-white dark:bg-background-dark rounded-lg border border-border-light dark:border-border-dark p-4">
            <h3 className="font-semibold text-lg mb-4">Parámetros</h3>
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label htmlFor="tipo" className="block text-sm font-medium mb-1">
                  Tipo de Sacramento
                </label>
                <select
                  id="tipo"
                  value={tipo}
                  onChange={(e) => setTipo(e.target.value)}
                  className="w-full p-2 rounded-lg bg-background-light dark:bg-background-dark border border-border-light dark:border-border-dark focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option>Bautizo</option>
                  <option>Confirmación</option>
                  <option>Matrimonio</option>
                  <option>Defunción</option>
                </select>
              </div>

              <div>
                <label htmlFor="persona" className="block text-sm font-medium mb-1">
                  Persona
                </label>
                <input
                  id="persona"
                  type="text"
                  placeholder="Buscar persona..."
                  value={persona}
                  onChange={(e) => setPersona(e.target.value)}
                  className="w-full p-2 rounded-lg bg-background-light dark:bg-background-dark border border-border-light dark:border-border-dark focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <p className="text-xs text-muted-foreground-light dark:text-muted-foreground-dark mt-1">
                  Sugerencia: escribe nombre y apellido
                </p>
              </div>
              <div>
                <label htmlFor="libro" className="block text-sm font-medium mb-1">Libro / Foja / Número</label>
                <div className="grid grid-cols-3 gap-2">
                  <input type="text" placeholder="Libro" className="p-2 rounded-lg bg-background-light dark:bg-background-dark border border-border-light dark:border-border-dark focus:outline-none focus:ring-2 focus:ring-primary" />
                  <input type="text" placeholder="Foja" className="p-2 rounded-lg bg-background-light dark:bg-background-dark border border-border-light dark:border-border-dark focus:outline-none focus:ring-2 focus:ring-primary" />
                  <input type="text" placeholder="Número" className="p-2 rounded-lg bg-background-light dark:bg-background-dark border border-border-light dark:border-border-dark focus:outline-none focus:ring-2 focus:ring-primary" />
                </div>
              </div>
              <div>
                <label htmlFor="plantilla" className="block text-sm font-medium mb-1">Plantilla</label>
                <select id="plantilla" className="w-full p-2 rounded-lg bg-background-light dark:bg-background-dark border border-border-light dark:border-border-dark focus:outline-none focus:ring-2 focus:ring-primary">
                  <option>Certificado Simple</option>
                  <option>Certificado con Anotaciones</option>
                  <option>Certificado Internacional</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-3 pt-2">
                <button
                  type="button"
                  onClick={handlePrevisualizar}
                  className="px-3 py-2 rounded-lg border border-border-light dark:border-border-dark hover:bg-background-light dark:hover:bg-background-dark"
                  disabled={loading}
                >
                  {loading ? 'Cargando...' : 'Previsualizar'}
                </button>
                <button
                  type="button"
                  className="px-3 py-2 rounded-lg bg-primary text-white hover:bg-primary/90"
                >
                  Generar
                </button>
              </div>
            </form>
          </div>
          
          <div className="bg-white dark:bg-background-dark rounded-lg border border-border-light dark:border-border-dark p-4">
            <h4 className="font-semibold mb-2">Metadatos</h4>
            <ul className="text-sm space-y-1 text-muted-foreground-light dark:text-muted-foreground-dark">
              <li>Responsable: Admin</li>
              <li>Fecha: 2024-03-21</li>
              <li>Parroquia: N. Sra. de la Paz</li>
            </ul>
          </div>
        </section>

        {/* PANEL DERECHO */}
        <section className="lg:col-span-2 space-y-6">
          <div className="bg-white dark:bg-background-dark rounded-lg border border-border-light dark:border-border-dark p-6">
            <div className="flex items-start justify-between mb-4">
              <h3 className="text-xl font-bold">Vista Previa</h3>
            </div>

            <div className="rounded-lg border border-dashed border-border-light dark:border-border-dark p-6 bg-background-light dark:bg-background-dark">
              {pdfUrl ? (
                <iframe
                  src={pdfUrl}
                  title="Vista previa del certificado"
                  width="100%"
                  height="600px"
                  className="rounded-lg border"
                />
              ) : (
                <p className="text-center text-muted-foreground-light dark:text-muted-foreground-dark">
                  No hay certificado cargado. Completa los campos y haz clic en <strong>Previsualizar</strong>.
                </p>
              )}
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}
