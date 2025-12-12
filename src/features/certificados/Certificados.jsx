import React, { useState, useEffect } from 'react';
import Layout from '../../shared/components/layout/Layout';

export default function Certificados() {
  // === ESTADOS ===
  // "tipo" actúa como tu variable de control de sacramento
  const [tipo, setTipo] = useState('Bautizo'); 
  
  // Estados para los datos de las personas
  const [persona, setPersona] = useState(''); // Persona principal (o Esposo)
  const [persona2, setPersona2] = useState(''); // Segunda persona (solo para Matrimonio/Esposa)
  
  const [fecha, setFecha] = useState('24 de Marzo de 2025');
  const [plantilla, setPlantilla] = useState('bautizo-rellenable');
  const [pdfUrl, setPdfUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  // === EFECTO PARA CAMBIAR PLANTILLA AUTOMÁTICAMENTE ===
  // Opcional: Esto ayuda a que si cambias a Matrimonio, se sugiera otra plantilla si la tienes
  useEffect(() => {
    if (tipo === 'Matrimonio') {
        // Asumiendo que tengas una plantilla para esto, si no, deja la genérica
        // setPlantilla('matrimonio-rellenable'); 
    }
  }, [tipo]);

  // === HELPER PARA OBTENER EL NOMBRE FINAL A ENVIAR ===
  const obtenerNombreParaCertificado = () => {
    if (tipo === 'Matrimonio') {
      // Si es matrimonio, unimos los dos nombres
      return `${persona} y ${persona2}`;
    }
    // Si es Bautizo o Confirmación, solo el nombre principal
    return persona;
  };

  // === FUNCIÓN PARA OBTENER CERTIFICADO (previsualización) ===
  const previsualizarCertificado = async () => {
    const nombreFinal = obtenerNombreParaCertificado();

    try {
      setLoading(true);
      const response = await fetch(
        `https://generador-documentos.onrender.com/mostrar-certificado?filename=${plantilla}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            nombre_certificado: persona, // Usamos persona como nombre de archivo ref
            nombre_estudiante: nombreFinal, // Aquí enviamos "Juan" o "Juan y Maria"
          }),
        }
      );

      if (!response.ok) throw new Error('Error al obtener certificado');

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

  // === FUNCIÓN PARA DESCARGAR CERTIFICADO ===
  const descargarCertificado = async () => {
    const nombreFinal = obtenerNombreParaCertificado();

    try {
      setLoading(true);
      const response = await fetch(
        `https://generador-documentos.onrender.com/descargar-certificado?filename=${plantilla}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            nombre_certificado: persona,
            nombre_estudiante: nombreFinal,
          }),
        }
      );

      if (!response.ok) throw new Error('Error al descargar certificado');

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);

      // Crear link temporal para forzar descarga
      const link = document.createElement('a');
      link.href = url;
      link.download = `Certificado_${tipo}_${persona}.pdf`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error:', error);
      alert('No se pudo descargar el certificado');
    } finally {
      setLoading(false);
    }
  };

  // === EVENTOS DE BOTONES ===
  const handlePrevisualizar = async () => {
    if (!persona.trim()) {
      alert('Por favor ingresa al menos el primer nombre');
      return;
    }
    if (tipo === 'Matrimonio' && !persona2.trim()) {
        alert('Para matrimonio se requieren los dos nombres');
        return;
    }

    const url = await previsualizarCertificado();
    if (url) setPdfUrl(url);
  };

  const handleGenerar = async () => {
    if (!persona.trim()) {
      alert('Por favor ingresa el nombre');
      return;
    }
    if (tipo === 'Matrimonio' && !persona2.trim()) {
        alert('Para matrimonio se requieren los dos nombres');
        return;
    }

    await descargarCertificado();
  };

  return (
    <Layout title="Generación de Certificados">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* PANEL IZQUIERDO */}
        <section className="lg:col-span-1 space-y-6">
          <div className="bg-white dark:bg-background-dark rounded-lg border border-border-light dark:border-border-dark p-4">
            <h3 className="font-semibold text-lg mb-4">Parámetros</h3>
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              
              {/* 🔵 SECCIÓN 1: BÚSQUEDA Y TIPO */}
              <div className="border-b border-border-light dark:border-border-dark pb-4 mb-4">
                <h4 className="font-semibold text-primary mb-2">Datos del Sacramento</h4>

                <div className="space-y-3">
                  <div>
                    <label htmlFor="tipo" className="block text-sm font-medium mb-1">
                      Tipo de Sacramento
                    </label>
                    <select
                      id="tipo"
                      value={tipo}
                      onChange={(e) => {
                          setTipo(e.target.value);
                          setPersona2(''); // Limpiamos la segunda persona al cambiar
                      }}
                      className="w-full p-2 rounded-lg bg-background-light dark:bg-background-dark border border-border-light dark:border-border-dark focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      <option value="Bautizo">Bautizo</option>
                      <option value="Confirmación">Confirmación</option>
                      <option value="Matrimonio">Matrimonio</option>
                      <option value="Defunción">Defunción</option>
                    </select>
                  </div>

                  {/* LOGICA CONDICIONAL DE INPUTS */}
                  {tipo === 'Matrimonio' ? (
                    // --- VISTA PARA MATRIMONIO (2 INPUTS) ---
                    <div className="space-y-3 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-dashed border-gray-300 dark:border-gray-700">
                        <p className="text-xs text-primary font-bold uppercase">Contrayentes</p>
                        <div>
                            <label className="block text-sm font-medium mb-1">Esposo / Parte A</label>
                            <input
                                type="text"
                                placeholder="Nombre del esposo..."
                                value={persona}
                                onChange={(e) => setPersona(e.target.value)}
                                className="w-full p-2 rounded-lg bg-background-light dark:bg-background-dark border border-border-light dark:border-border-dark focus:outline-none focus:ring-2 focus:ring-primary"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Esposa / Parte B</label>
                            <input
                                type="text"
                                placeholder="Nombre de la esposa..."
                                value={persona2}
                                onChange={(e) => setPersona2(e.target.value)}
                                className="w-full p-2 rounded-lg bg-background-light dark:bg-background-dark border border-border-light dark:border-border-dark focus:outline-none focus:ring-2 focus:ring-primary"
                            />
                        </div>
                    </div>
                  ) : (
                    // --- VISTA PARA BAUTIZO / CONFIRMACIÓN (1 INPUT) ---
                    <div>
                        <label htmlFor="persona" className="block text-sm font-medium mb-1">
                        Nombre de la Persona
                        </label>
                        <input
                        id="persona"
                        type="text"
                        placeholder="Nombre completo..."
                        value={persona}
                        onChange={(e) => setPersona(e.target.value)}
                        className="w-full p-2 rounded-lg bg-background-light dark:bg-background-dark border border-border-light dark:border-border-dark focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                        <p className="text-xs text-muted-foreground-light dark:text-muted-foreground-dark mt-1">
                        Sugerencia: escribe nombre y apellido
                        </p>
                    </div>
                  )}

                  <div>
                    <label htmlFor="libro" className="block text-sm font-medium mb-1">
                      Libro / Foja / Número
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="text"
                        placeholder="Foja"
                        className="p-2 rounded-lg bg-background-light dark:bg-background-dark border border-border-light dark:border-border-dark focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                      <input
                        type="text"
                        placeholder="Número"
                        className="p-2 rounded-lg bg-background-light dark:bg-background-dark border border-border-light dark:border-border-dark focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* 🟢 SECCIÓN 2: CONFIRMACIÓN */}
              <div>
                <h4 className="font-semibold text-primary mb-2">Confirmación de datos</h4>
                <div className="space-y-3">
                  <div>
                    <label htmlFor="plantilla" className="block text-sm font-medium mb-1">
                      Plantilla
                    </label>
                    <select
                      id="plantilla"
                      value={plantilla}
                      onChange={(e) => setPlantilla(e.target.value)}
                      className="w-full p-2 rounded-lg bg-background-light dark:bg-background-dark border border-border-light dark:border-border-dark focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      <option value="bautizo-rellenable">bautizo-rellenable</option>
                      <option value="iglesia-rellenable">iglesia-rellenable</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">
                        {tipo === 'Matrimonio' ? 'Nombres a imprimir' : 'Nombre Persona'}
                    </label>
                    <input
                      type="text"
                      // Visualmente mostramos cómo quedará concatenado
                      value={tipo === 'Matrimonio' ? `${persona} y ${persona2}` : persona}
                      readOnly
                      className="w-full p-2 rounded-lg bg-gray-100 dark:bg-gray-800 border border-border-light dark:border-border-dark text-gray-500 dark:text-gray-400 cursor-not-allowed"
                    />
                  </div>

                  <div>
                    <label htmlFor="fecha" className="block text-sm font-medium mb-1">Fecha Sacramento</label>
                    <input
                      id="fecha"
                      type="text"
                      value={fecha}
                      readOnly
                      className="w-full p-2 rounded-lg bg-gray-100 dark:bg-gray-800 border border-border-light dark:border-border-dark text-gray-500 dark:text-gray-400 cursor-not-allowed"
                    />
                  </div>
                </div>
              </div>

              {/* BOTONES */}
              <div className="grid grid-cols-2 gap-3 pt-4">
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
                  onClick={handleGenerar}
                  className="px-3 py-2 rounded-lg bg-primary text-white hover:bg-primary/90"
                  disabled={loading}
                >
                  {loading ? 'Generando...' : 'Generar'}
                </button>
              </div>
            </form>
          </div>

          {/* Metadatos */}
          <div className="bg-white dark:bg-background-dark rounded-lg border border-border-light dark:border-border-dark p-4">
            <h4 className="font-semibold mb-2">Metadatos</h4>
            <ul className="text-sm space-y-1 text-muted-foreground-light dark:text-muted-foreground-dark">
              <li>Tipo Actual: <span className="font-medium text-primary">{tipo}</span></li>
              <li>Fecha: 2024-03-21</li>
              <li>Parroquia: N. Sra. de la Paz</li>
            </ul>
          </div>
        </section>

        {/* PANEL DERECHO */}
        <section className="lg:col-span-2 space-y-6">
          <div className="bg-white dark:bg-background-dark rounded-lg border border-border-light dark:border-border-dark p-6">
            <div className="flex items-start justify-between mb-4">
              <h3 className="text-xl font-bold">Vista Previa ({tipo})</h3>
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
                <div className="flex flex-col items-center justify-center py-12 text-center text-muted-foreground-light dark:text-muted-foreground-dark">
                  <p className="mb-2">Selecciona <strong>{tipo}</strong> y completa los campos.</p>
                  <p className="text-sm">
                     {tipo === 'Matrimonio' 
                        ? 'Se requiere el nombre de ambos contrayentes.' 
                        : 'Se requiere el nombre de la persona.'}
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}