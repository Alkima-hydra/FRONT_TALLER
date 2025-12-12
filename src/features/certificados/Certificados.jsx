import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ClipLoader } from "react-spinners"; // Asegúrate de tener esto o quita el componente si no lo usas
import Layout from '../../shared/components/layout/Layout';

// === IMPORTACIONES DE REDUX (El cerebro) ===
import {
  buscarSacramentos,
  fetchSacramentoCompleto
} from '../sacramentos/slices/sacramentosTrunk'; // Ajusta la ruta si 'sacramentos' está en otra carpeta hermana

export default function Certificados() {
  const dispatch = useDispatch();

  // === CONSTANTES DE MAPEO (Copiadas de Sacramentos.jsx para mantener lógica) ===
  const TIPO_SACRAMENTO_IDS = {
    Bautizo: 1,
    Matrimonio: 2,
    Comunion: 3, // O Confirmación, ajusta según tu DB (Confirmación suele ser ID 2 o 10 según tu otro archivo)
    Confirmacion: 10 // Asumiendo ID 10 basado en tu archivo anterior
  };

  const ROLES_SACRAMENTO_IDS = {
    Bautizo: 1,      // Bautizado
    Matrimonio: 3,   // Esposos (ajusta según tu DB, en el otro archivo era 3 o 11)
    Comunion: 10,    // Comulgante
    Confirmacion: 10 // Confirmado
  };

  // === ESTADOS ===
  // 1. Control del Tipo
  const [tipo, setTipo] = useState('Bautizo'); 
  
  // 2. Busqueda
  const [searchNombre, setSearchNombre] = useState('');
  const [searchCI, setSearchCI] = useState('');
  const [isLoadingSearch, setIsLoadingSearch] = useState(false);
  const [listaResultados, setListaResultados] = useState([]); // Resultados de la DB
  const [busquedaRealizada, setBusquedaRealizada] = useState(false);

  // 3. Sacramento Seleccionado (La data real de la DB)
  const [sacramentoSeleccionado, setSacramentoSeleccionado] = useState(null);

  // 4. Estados visuales para el PDF (Plantilla, etc)
  const [plantilla, setPlantilla] = useState('bautizo-rellenable');
  const [pdfUrl, setPdfUrl] = useState(null);
  const [loadingPdf, setLoadingPdf] = useState(false);
  const [loading, setLoading] = useState(false);

  const [persona, setPersona] = useState("");
  const previsualizarCertificado = async (nombre_certificado, nombre_estudiante) => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://generador-documentos.onrender.com/mostrar-certificado?filename=${plantilla}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            nombre_certificado,
            nombre_estudiante,
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
  const descargarCertificado = async (nombre_certificado, nombre_estudiante) => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://generador-documentos.onrender.com/descargar-certificado?filename=${plantilla}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            nombre_certificado,
            nombre_estudiante,
          }),
        }
      );

      if (!response.ok) throw new Error('Error al descargar certificado');

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);

      // Crear link temporal para forzar descarga
      const link = document.createElement('a');
      link.href = url;
      link.download = 'certificado.pdf';
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

  
  // === 1. FUNCIÓN DE BÚSQUEDA (Conectada a REDUX) ===
  const handleBuscarSacramento = (e) => {
    e.preventDefault();
    if (!searchNombre && !searchCI) {
      alert("Ingresa al menos un nombre o CI para buscar.");
      return;
    }

    setIsLoadingSearch(true);
    setSacramentoSeleccionado(null); // Reseteamos selección anterior
    setBusquedaRealizada(true);

    // Mapeamos el string del select a los IDs de la base de datos
    // Nota: Ajusta las keys 'Confirmacion'/'Comunion' según tus options del select
    let tipoKey = tipo; 
    if(tipo === 'Confirmación') tipoKey = 'Confirmacion';
    if(tipo === 'Primera Comunión') tipoKey = 'Comunion';

    const payload = {
      nombre: searchNombre,
      carnet_identidad: searchCI,
      activo: 'true', // Solo queremos certificados de registros activos
      tipo_sacramento_id_tipo: TIPO_SACRAMENTO_IDS[tipoKey] || 1, 
      // rol_principal: ROLES_SACRAMENTO_IDS[tipoKey] || 1, // Opcional si el backend filtra por rol
    };

    dispatch(buscarSacramentos(payload))
      .unwrap()
      .then((res) => {
        // Procesar resultados para mostrarlos en lista simple
        const resultadosProcesados = [];

        res.resultados.forEach((sac) => {
          // Buscamos la persona principal del sacramento
          sac.personaSacramentos.forEach((rel) => {
            if (!rel.persona) return;
            
            // Filtro visual: Mostrar solo al protagonista (no padrinos ni ministros) en la lista
            // Asumiendo que quieres ver el nombre del Bautizado/Novios
            // Si quieres ver todos, quita este if o ajusta los IDs
            const rolId = rel.rol_sacramento_id_rol_sacra;
            // IDs de protagonistas: 1(Bautizado), 2(Comulgado), 10(Confirmado), 11(Esposo), etc.
            if ([1, 2, 10, 11, 21].includes(rolId)) {
                resultadosProcesados.push({
                  id_sacramento: sac.id_sacramento,
                  nombre_completo: `${rel.persona.nombre} ${rel.persona.apellido_paterno} ${rel.persona.apellido_materno}`,
                  ci: rel.persona.carnet_identidad,
                  fecha: sac.fecha_sacramento,
                  foja: sac.foja,
                  numero: sac.numero,
                  rol: rolId === 11 ? 'Esposo/a' : 'Titular' 
                });
            }
          });
        });
        setListaResultados(resultadosProcesados);
      })
      .catch((err) => {
        console.error("Error buscando:", err);
        setListaResultados([]);
      })
      .finally(() => {
        setIsLoadingSearch(false);
      });
  };

  // === 2. FUNCIÓN AL SELECCIONAR UN RESULTADO ===
  const handleSeleccionar = (item) => {
    // Aquí traemos el sacramento COMPLETO (con todos los detalles) si hace falta
    // O usamos la data que ya tenemos en el item
    
    // OPCIÓN A: Usar lo que ya tenemos (rápido)
    setSacramentoSeleccionado(item);
    
    // OPCIÓN B: (Recomendada) Fetch detalle completo para tener Padrinos, Iglesia, etc.
    // dispatch(fetchSacramentoCompleto(item.id_sacramento))... 
    
    // LOG REQUERIDO POR EL USUARIO
    console.log("=== SACRAMENTO SELECCIONADO PARA CERTIFICADO ===");
    console.log(item); 
    
    // Limpiamos la lista visualmente para dar feedback de "Seleccionado"
    // setListaResultados([]); // Opcional, si quieres colapsar la lista
  };


  // === 3. PREVISUALIZAR (MOCK) ===
  const handlePrevisualizar = async () => {
    if (!sacramentoSeleccionado) {
      alert("Primero debes buscar y SELECCIONAR un sacramento de la lista.");
      return;
    }
    setLoadingPdf(true);
    
    console.log("Generando PDF para:", sacramentoSeleccionado.nombre_completo);
    
    const url = await previsualizarCertificado(sacramentoSeleccionado.nombre_completo, sacramentoSeleccionado.fecha);
    if (url) setPdfUrl(url);
    // Simulamos delay
    setTimeout(() => {
        setLoadingPdf(false);
        alert("Aquí se llamaría a la API de Python con los datos del sacramento seleccionado.");
    }, 1000);
  };

  
  const handleGenerar = async () => {
    
    console.log("Descargando PDF para:", sacramentoSeleccionado.nombre_completo);
    await descargarCertificado(sacramentoSeleccionado.nombre_completo, sacramentoSeleccionado.fecha);
    
  };
  return (
    <Layout title="Emisión de Certificados">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* === PANEL IZQUIERDO: BUSCADOR Y PARÁMETROS === */}
        <section className="lg:col-span-1 space-y-6">
          <div className="bg-white dark:bg-background-dark rounded-lg border border-border-light dark:border-border-dark p-4 shadow-sm">
            <h3 className="font-semibold text-lg mb-4 text-gray-800 dark:text-white">1. Buscar Sacramento</h3>
            
            <form onSubmit={handleBuscarSacramento} className="space-y-4">
              
              {/* Selector de Tipo */}
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-600 dark:text-gray-300">Tipo de Certificado</label>
                <select
                  value={tipo}
                  onChange={(e) => {
                    setTipo(e.target.value);
                    setSacramentoSeleccionado(null);
                    setListaResultados([]);
                    setBusquedaRealizada(false);
                  }}
                  className="w-full p-2.5 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                >
                  <option value="Bautizo">Bautizo</option>
                  <option value="Confirmación">Confirmación</option>
                  <option value="Matrimonio">Matrimonio</option>
                  <option value="Primera Comunión">Primera Comunión</option>
                </select>
              </div>

              {/* Inputs de Búsqueda */}
              <div className="grid grid-cols-2 gap-2">
                 <div className="col-span-2">
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Buscar por Nombre</label>
                    <input
                        type="text"
                        placeholder="Ej. Juan Perez"
                        value={searchNombre}
                        onChange={(e) => setSearchNombre(e.target.value)}
                        className="w-full p-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 focus:ring-2 focus:ring-primary outline-none"
                    />
                 </div>
                 <div className="col-span-2">
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">O por Carnet (CI)</label>
                    <input
                        type="text"
                        placeholder="Ej. 123456"
                        value={searchCI}
                        onChange={(e) => setSearchCI(e.target.value)}
                        className="w-full p-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 focus:ring-2 focus:ring-primary outline-none"
                    />
                 </div>
              </div>

              <button
                type="submit"
                disabled={isLoadingSearch}
                className="w-full py-2.5 rounded-lg bg-primary text-white font-medium hover:bg-primary/90 transition-colors flex justify-center items-center gap-2"
              >
                {isLoadingSearch ? <ClipLoader size={20} color="#fff" /> : <span className="material-symbols-outlined text-sm">search</span>}
                {isLoadingSearch ? 'Buscando...' : 'Buscar en Base de Datos'}
              </button>
            </form>
          </div>

          {/* === LISTA DE RESULTADOS === */}
          {busquedaRealizada && (
            <div className="bg-white dark:bg-background-dark rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden max-h-60 overflow-y-auto shadow-inner">
                {listaResultados.length === 0 && !isLoadingSearch ? (
                    <div className="p-4 text-center text-sm text-gray-500">
                        No se encontraron registros de <strong>{tipo}</strong> con esos datos.
                    </div>
                ) : (
                    <ul className="divide-y divide-gray-100 dark:divide-gray-800">
                        {listaResultados.map((item) => (
                            <li 
                                key={item.id_sacramento + item.nombre_completo}
                                onClick={() => handleSeleccionar(item)}
                                className={`p-3 cursor-pointer hover:bg-blue-50 dark:hover:bg-gray-800 transition-colors ${sacramentoSeleccionado?.id_sacramento === item.id_sacramento ? 'bg-blue-100 dark:bg-blue-900/30 border-l-4 border-primary' : ''}`}
                            >
                                <p className="font-bold text-sm text-gray-800 dark:text-gray-200">{item.nombre_completo}</p>
                                <div className="flex justify-between mt-1 text-xs text-gray-500">
                                    <span>CI: {item.ci || 'S/N'}</span>
                                    <span>{item.fecha}</span>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
          )}
        </section>

        {/* === PANEL DERECHO: VISTA PREVIA Y ACCIONES === */}
        <section className="lg:col-span-2 space-y-6">
          <div className="bg-white dark:bg-background-dark rounded-lg border border-border-light dark:border-border-dark p-6 min-h-[500px] flex flex-col">
            
            <div className="flex items-center justify-between mb-6 border-b border-gray-100 dark:border-gray-700 pb-4">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                2. Vista Previa del Certificado
              </h3>
              {sacramentoSeleccionado && (
                  <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">
                    Registro Verificado
                  </span>
              )}
            </div>

            {/* CONTENIDO PRINCIPAL */}
            <div className="flex-grow">
                {!sacramentoSeleccionado ? (
                    <div className="h-full flex flex-col items-center justify-center text-gray-400 border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-800/50">
                        <span className="material-symbols-outlined text-6xl mb-2 opacity-50">plagiarism</span>
                        <p>Busca y selecciona una persona a la izquierda</p>
                        <p className="text-sm">para cargar sus datos automáticamente.</p>
                    </div>
                ) : (
                    <div className="space-y-6 animate-fadeIn">
                        {/* TARJETA DE INFORMACIÓN SELECCIONADA */}
                        <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-100 dark:border-blue-800">
                            <h4 className="text-primary font-bold mb-3 flex items-center gap-2">
                                <span className="material-symbols-outlined">verified</span>
                                Datos Recuperados
                            </h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                                <div>
                                    <span className="block text-gray-500 text-xs uppercase">Nombre Completo</span>
                                    <span className="font-semibold text-gray-900 dark:text-white text-lg">{sacramentoSeleccionado.nombre_completo}</span>
                                </div>
                                <div>
                                    <span className="block text-gray-500 text-xs uppercase">Fecha del Sacramento</span>
                                    <span className="font-semibold text-gray-900 dark:text-white">{sacramentoSeleccionado.fecha}</span>
                                </div>
                                <div className="grid grid-cols-3 gap-2">
                                    <div>
                                        <span className="block text-gray-500 text-xs">Libro</span>
                                        <span className="font-medium">--</span>
                                    </div>
                                    <div>
                                        <span className="block text-gray-500 text-xs">Foja</span>
                                        <span className="font-medium">{sacramentoSeleccionado.foja}</span>
                                    </div>
                                    <div>
                                        <span className="block text-gray-500 text-xs">Número</span>
                                        <span className="font-medium">{sacramentoSeleccionado.numero}</span>
                                    </div>
                                </div>
                                <div>
                                    <span className="block text-gray-500 text-xs uppercase">Carnet (CI)</span>
                                    <span className="font-medium">{sacramentoSeleccionado.ci}</span>
                                </div>
                            </div>
                        </div>

                        {/* CONFIGURACIÓN DE PLANTILLA */}
                        <div>
                             <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Seleccionar Diseño / Plantilla</label>
                             <div className="grid grid-cols-2 gap-4">
                                <div 
                                    onClick={() => setPlantilla('bautizo-rellenable')}
                                    className={`cursor-pointer border rounded-lg p-3 flex items-center gap-3 ${plantilla === 'bautizo-rellenable' ? 'border-primary ring-1 ring-primary bg-primary/5' : 'border-gray-200 hover:border-gray-300'}`}
                                >
                                    <div className="h-10 w-8 bg-gray-200 rounded flex items-center justify-center text-xs">PDF</div>
                                    <div className="text-sm font-medium">Oficial {tipo}</div>
                                </div>
                                <div 
                                    onClick={() => setPlantilla('simple')}
                                    className={`cursor-pointer border rounded-lg p-3 flex items-center gap-3 ${plantilla === 'simple' ? 'border-primary ring-1 ring-primary bg-primary/5' : 'border-gray-200 hover:border-gray-300'}`}
                                >
                                    <div className="h-10 w-8 bg-gray-200 rounded flex items-center justify-center text-xs">PDF</div>
                                    
                                </div>
                             </div>
                        </div>
                    </div>
                )}
            </div>

            {/* FOOTER DE ACCIONES */}
            <div className="pt-6 mt-6 border-t border-gray-100 dark:border-gray-700 flex justify-end gap-3">
                <button
                    disabled={!sacramentoSeleccionado || loadingPdf}
                    onClick={handlePrevisualizar}
                    className="px-6 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-50 dark:hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Previsualizar
                </button>
                <button
                    disabled={!sacramentoSeleccionado || loadingPdf}
                    className="px-6 py-2.5 rounded-lg bg-primary text-white font-bold hover:bg-primary/90 shadow-lg shadow-primary/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                    onClick={handleGenerar}
                >
                     <span className="material-symbols-outlined text-lg">print</span>
                     Generar Certificado
                </button>
            </div>

          </div>
        </section>
      </div>
    </Layout>
  );
}