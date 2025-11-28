import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Layout from '../../shared/components/layout/Layout';

//import de slices y trunk
import {
  fetchPersonasParaSacramento,
} from './slices/sacramentosTrunk';

import {
  selectIsLoading,
  selectPersonasBusqueda,     // ← usamos el nuevo selector
  selectIsCreating,
  selectIsUpdating,
  selectIsDeleting
} from './slices/sacramentosSlices';

export default function Sacramentos() {
  //para empezar a consumir
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);
  const personas = useSelector(selectPersonasBusqueda);
  const isCreating = useSelector(selectIsCreating);
  const isUpdating = useSelector(selectIsUpdating);
  const isDeleting = useSelector(selectIsDeleting);

  //busqueda inicial de persona
  const [queryPersona, setQueryPersona] = useState("");
  const [listaPersonas, setListaPersonas] = useState([]);
  const [openPersonaList, setOpenPersonaList] = useState(false);

  // --- Estados locales ---
  const [mergeOpen, setMergeOpen] = useState(false)
  const [activeTab, setActiveTab] = useState('agregar') // pestaña activa
  const [selectedPerson, setSelectedPerson] = useState(null)
  const [tipoSacramento, setTipoSacramento] = useState('bautizo')

  // --- Estados base para consumo (sin endpoints aún) ---
  const [form, setForm] = useState({
    // comunes a todos los sacramentos
    personaId: null,                // persona que recibe el sacramento
    padrinoId: null,                // persona seleccionada como padrino (opcional)
    ministroId: null,                   // ministro en texto por ahora
    parroquiaId: null,              // institucion_parroquia_id
    foja: '',
    numero: '',
    fecha_sacramento: '',           // yyyy-mm-dd
    activo: true,
  });

  // Extras sólo para matrimonio (tabla matrimonio_detalle)
  const [matrimonio, setMatrimonio] = useState({
    esposoId: null,
    esposaId: null,
    lugar_ceremonia: '',
    reg_civil: '',
    numero_acta: '',
  });

  // Filtros para buscar/editar
  const [filters, setFilters] = useState({
    nombre: '',
    apellido_paterno: '',
    apellido_materno: '',
    carnet_identidad: '',
    fecha_nacimiento: '',
    lugar_nacimiento: '',
    activo: '',
  });

  // Resultados de búsqueda para la persona
  const [results, setResults] = useState([]);

  // para toast
  const [toast, setToast] = useState(null); // { type: 'success'|'error', message: string }
    useEffect(() => {
      if (!toast) return;
      const t = setTimeout(() => setToast(null), 3000);
      return () => clearTimeout(t);
  }, [toast]);

  // --- Helpers ---
  const handleChange = (key, value) => setForm(prev => ({ ...prev, [key]: value }));
  const handleMatChange = (key, value) => setMatrimonio(prev => ({ ...prev, [key]: value }));

  const resetForm = () => {
    setForm({ personaId: null, padrinoId: null, ministro: '', parroquiaId: null, foja: '', numero: '', fecha_sacramento: '', activo: true });
    setMatrimonio({ esposoId: null, esposaId: null, lugar_ceremonia: '', reg_civil: '', numero_acta: '' });
  };

  //para los filtros
  useEffect(() => {
    if (queryPersona.trim().length < 2) {
      setListaPersonas([]);
      return;
    }

    const delay = setTimeout(() => {
      dispatch(fetchPersonasParaSacramento({
        search: queryPersona,
        rol: tipoSacramento
      }))
        .unwrap()
        .then((data) => {
          setListaPersonas(data.personas || []);
          setOpenPersonaList(true);
        })
        .catch((e) => {
          console.error(">>> ERROR buscando:", e);
          setListaPersonas([]);
        });

    }, 300);

    return () => clearTimeout(delay);
  }, [queryPersona, tipoSacramento]);

  // Construye el payload listo para enviar según el tipo
  const buildPayload = () => {
    const base = {
      sacramento: {
        fecha_sacramento: form.fecha_sacramento || null,
        foja: form.foja || null,
        numero: form.numero || null,
        tipo_sacramento_id: tipoSacramento,           // por ahora guardamos la clave tal cual (bautizo/comunion/matrimonio)
        institucion_parroquia_id: form.parroquiaId || null,
        activo: !!form.activo,
      },
      relaciones: {
        persona_principal_id: form.personaId,
        padrino_id: form.padrinoId || null,
        ministro: form.ministro || null,
      },
    };
    if (tipoSacramento === 'matrimonio') {
      base.relaciones.persona_principal_id = null; // en matrimonio usamos esposo/esposa
      base.matrimonio_detalle = {
        esposo_id: matrimonio.esposoId,
        esposa_id: matrimonio.esposaId,
        lugar_ceremonia: matrimonio.lugar_ceremonia || null,
        reg_civil: matrimonio.reg_civil || null,
        numero_acta: matrimonio.numero_acta || null,
      };
    }
    return base;
  };

  // Envío de Agregar (simulado)
  const handleSubmitAgregar = (e) => {
    e.preventDefault();
    const payload = buildPayload();
    console.log('[SACRAMENTOS] Crear payload →', payload);
    // TODO: dispatch thunk createSacramento(payload)
  };

  // Buscar (simulado)
  const handleBuscar = (e) => {
    e?.preventDefault?.();
    console.log('[SACRAMENTOS] Buscar con filtros:', filters, 'tipo:', tipoSacramento);
    // TODO: dispatch thunk fetchSacramentos({ ...filters, tipo: tipoSacramento })
    // Simulación de resultados
    setResults([
      { id: 1, nombre: 'Carlos', apellido_paterno: 'Mendoza', apellido_materno: 'Pérez', carnet_identidad: '6789012 LP', fecha_nacimiento: '1990-01-10', lugar_nacimiento: 'La Paz', activo: true },
      { id: 2, nombre: 'Ana', apellido_paterno: 'Rodríguez', apellido_materno: 'Guzmán', carnet_identidad: '3456789 CB', fecha_nacimiento: '1995-04-18', lugar_nacimiento: 'Cochabamba', activo: false },
    ]);
  };

  const handleSelectResultado = (row) => {
    setSelectedPerson(row);
    // TODO: cargar datos específicos del sacramento seleccionado si es necesario
  };

  const handleGuardarEdicion = (e) => {
    e.preventDefault();
    console.log('[SACRAMENTOS] Guardar edición de', selectedPerson, '→ payload aún por definir según API');
    // TODO: dispatch thunk updateSacramento(id, data)
  };

  return (
    <Layout title="Gestión de Sacramentos">
      {/* Selector de tipo de sacramento */}
      <div className="flex items-center justify-end mb-3">
        <div className="flex items-center gap-2">
          {[
            { key: 'bautizo', label: 'Bautizo' },
            { key: 'comunion', label: 'Primera Comunión' },
            { key: 'matrimonio', label: 'Matrimonio' },
          ].map((opt) => (
            <label
              key={opt.key}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border cursor-pointer transition-colors select-none ${
                tipoSacramento === opt.key
                  ? 'bg-primary/10 border-primary text-primary'
                  : 'bg-gray-50 dark:bg-gray-800/40 border-gray-300 dark:border-gray-700 text-gray-600 dark:text-gray-300'
              }`}
            >
              <input
                type="radio"
                name="tipoSacramento"
                value={opt.key}
                checked={tipoSacramento === opt.key}
                onChange={() => setTipoSacramento(opt.key)}
                className="hidden"
              />
              <span className="material-symbols-outlined text-base">folder</span>
              <span className="text-sm whitespace-nowrap">{opt.label}</span>
            </label>
          ))}
        </div>
      </div>
      {/* Tabs */}
      <div className="flex gap-1 mb-6 border-b border-gray-200 dark:border-gray-700">
        <button
          onClick={() => setActiveTab('agregar')}
          className={`px-5 py-2 text-sm font-medium rounded-t-lg border transition-colors focus:outline-none ${
            activeTab === 'agregar'
              ? 'bg-white dark:bg-background-dark text-primary border-gray-200 dark:border-gray-700 border-b-transparent -mb-px'
              : 'bg-gray-50 dark:bg-gray-800/40 text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white border-transparent'
          }`}
        >
          Agregar Sacramento
        </button>
        <button
          onClick={() => setActiveTab('buscar')}
          className={`px-5 py-2 text-sm font-medium rounded-t-lg border transition-colors focus:outline-none ${
            activeTab === 'buscar'
              ? 'bg-white dark:bg-background-dark text-primary border-gray-200 dark:border-gray-700 border-b-transparent -mb-px'
              : 'bg-gray-50 dark:bg-gray-800/40 text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white border-transparent'
          }`}
        >
          Buscar / Editar
        </button>
      </div>

      {/* Contenido dinámico según la pestaña */}
      {activeTab === 'agregar' && (
        <div className="bg-white dark:bg-background-dark/50 rounded-xl shadow-sm">
          <div className="p-6 border-b border-gray-200 dark:border-gray-800">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Datos del Sacramento</h3>
              <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary">{tipoSacramento === 'comunion' ? 'Primera Comunión' : tipoSacramento.charAt(0).toUpperCase() + tipoSacramento.slice(1)}</span>
            </div>
          </div>
          <form className="p-6" onSubmit={handleSubmitAgregar}>
            {/* Campo para buscar la persona que recibió el sacramento (solo Bautizo y Primera Comunión) */}
            {(tipoSacramento === 'bautizo' || tipoSacramento === 'comunion') && (
              <div className="mt-2 mb-6">
                <h4 className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-3">
                  Persona que recibió el {tipoSacramento === 'comunion' ? 'Primera Comunión' : 'Bautizo'}
                </h4>
                <div className="mb-6 relative">
                  <input
                    type="search"
                    placeholder="Buscar persona (nombre o CI registrado)"
                    value={queryPersona}
                    onChange={(e) => {
                      setQueryPersona(e.target.value);
                      if (e.target.value.trim().length >= 2) {
                        setOpenPersonaList(true);
                      } else {
                        setOpenPersonaList(false);
                      }
                    }}
                    className="w-full rounded-lg bg-background-light dark:bg-background-dark border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary p-3 pr-10"
                  />
                  {/* DROPDOWN DE RESULTADOS */}
                  {openPersonaList && Array.isArray(personas) && personas.length > 0 && (
                    <div
                      style={{
                        position: "absolute",
                        background: "white",
                        border: "1px solid #dcdcdc",
                        borderRadius: "8px",
                        marginTop: "4px",
                        width: "95%",
                        maxHeight: "200px",
                        overflowY: "auto",
                        zIndex: 9999,
                        padding: "5px",
                      }}
                    >
                      {personas.map((p) => (
                        <div
                          key={p.id}
                          style={{
                            padding: "10px",
                            borderBottom: "1px solid #eee",
                            cursor: "pointer",
                          }}
                          onClick={() => {
                            handleChange("personaId", p.id);  
                            setQueryPersona(`${p.nombre} ${p.apellido_paterno} ${p.apellido_materno}`);
                            setOpenPersonaList(false);
                          }}
                        >
                          <strong>
                            {p.nombre} {p.apellido_paterno} {p.apellido_materno}
                          </strong>
                          <div style={{ fontSize: "13px", color: "#666" }}>
                            CI: {p.carnet_identidad}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                    search
                  </span>

                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Busque la persona registrada en la base de datos que se bautizó o realizó la comunión.
                </p>
              </div>
            )}
            {/* Campos específicos para Bautizo y Confirmación (sin foja) */}
            {(tipoSacramento === 'bautizo' || tipoSacramento === 'comunion') && (
              <div className="mt-6">
                <h4 className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-3">Detalles de {tipoSacramento === 'comunion' ? 'Primera Comunión' : 'Bautizo'}</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Padrino</label>
                    <div className="relative">
                      <input
                        type="search"
                        placeholder="Buscar padrino (persona registrada)"
                        value={form.padrinoId ? `ID seleccionado: ${form.padrinoId}` : ''}
                        onChange={() => handleChange('padrinoId', null)}
                        className="w-full rounded-lg bg-background-light dark:bg-background-dark border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary p-3 pr-10"
                      />
                      <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">search</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Escriba nombre o CI para buscar en Personas.</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Ministro</label>
                    <input
                      type="text"
                      placeholder="Nombre del ministro"
                      value={form.ministro}
                      onChange={e => handleChange('ministro', e.target.value)}
                      className="w-full rounded-lg bg-background-light dark:bg-background-dark border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary p-3"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Parroquia</label>
                    <div className="relative">
                      <input
                        type="search"
                        placeholder="Buscar parroquia (nombre registrada)"
                        value={form.parroquiaId ? `ID seleccionado: ${form.parroquiaId}` : ''}
                        onChange={() => handleChange('parroquiaId', null)}
                        className="w-full rounded-lg bg-background-light dark:bg-background-dark border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary p-3 pr-10"
                      />
                      <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">search</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Escriba el nombre para buscar en Parroquias registradas.</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Foja</label>
                    <input
                      type="text"
                      placeholder="Ej. 123-A"
                      value={form.foja}
                      onChange={e => handleChange('foja', e.target.value)}
                      className="w-full rounded-lg bg-background-light dark:bg-background-dark border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary p-3"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Número</label>
                    <input
                      type="text"
                      placeholder="Ej. 123-A"
                      value={form.numero}
                      onChange={e => handleChange('numero', e.target.value)}
                      className="w-full rounded-lg bg-background-light dark:bg-background-dark border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary p-3"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Fecha del Sacramento</label>
                    <input
                      type="date"
                      value={form.fecha_sacramento}
                      onChange={e => handleChange('fecha_sacramento', e.target.value)}
                      className="w-full rounded-lg bg-background-light dark:bg-background-dark border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary p-3"
                    />
                  </div>
                </div>
              </div>
            )}
            {/* Campos específicos para Matrimonio */}
            {tipoSacramento === 'matrimonio' && (
              <div className="mt-6">
                <h4 className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-3">Detalles del Matrimonio</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Esposo</label>
                    <div className="relative">
                      <input
                        type="search"
                        placeholder="Buscar esposo (persona registrada)"
                        value={matrimonio.esposoId ? `ID seleccionado: ${matrimonio.esposoId}` : ''}
                        onChange={() => handleMatChange('esposoId', null)}
                        className="w-full rounded-lg bg-background-light dark:bg-background-dark border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary p-3 pr-10"
                      />
                      <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">search</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Busque la persona registrada en la base de datos que corresponde al esposo.</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Esposa</label>
                    <div className="relative">
                      <input
                        type="search"
                        placeholder="Buscar esposa (persona registrada)"
                        value={matrimonio.esposaId ? `ID seleccionado: ${matrimonio.esposaId}` : ''}
                        onChange={() => handleMatChange('esposaId', null)}
                        className="w-full rounded-lg bg-background-light dark:bg-background-dark border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary p-3 pr-10"
                      />
                      <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">search</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Busque la persona registrada en la base de datos que corresponde a la esposa.</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Lugar de la Ceremonia</label>
                    <input
                      type="text"
                      placeholder="Lugar donde se realizó el matrimonio"
                      value={matrimonio.lugar_ceremonia}
                      onChange={e => handleMatChange('lugar_ceremonia', e.target.value)}
                      className="w-full rounded-lg bg-background-light dark:bg-background-dark border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary p-3"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Acta del Registro Civil</label>
                    <input
                      type="text"
                      placeholder="Ej. 123/2025 - Oficialía X"
                      value={matrimonio.reg_civil}
                      onChange={e => handleMatChange('reg_civil', e.target.value)}
                      className="w-full rounded-lg bg-background-light dark:bg-background-dark border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary p-3"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Número de Acta</label>
                    <input
                      type="text"
                      placeholder="Ej. 0456 / Libro 23"
                      value={matrimonio.numero_acta}
                      onChange={e => handleMatChange('numero_acta', e.target.value)}
                      className="w-full rounded-lg bg-background-light dark:bg-background-dark border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary p-3"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Padrino</label>
                    <div className="relative">
                      <input
                        type="search"
                        placeholder="Buscar padrino (persona registrada)"
                        value={form.padrinoId ? `ID seleccionado: ${form.padrinoId}` : ''}
                        onChange={() => handleChange('padrinoId', null)}
                        className="w-full rounded-lg bg-background-light dark:bg-background-dark border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary p-3 pr-10"
                      />
                      <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">search</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Escriba nombre o CI para buscar en Personas.</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Ministro</label>
                    <input
                      type="text"
                      placeholder="Nombre del ministro"
                      value={form.ministro}
                      onChange={e => handleChange('ministro', e.target.value)}
                      className="w-full rounded-lg bg-background-light dark:bg-background-dark border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary p-3"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Parroquia</label>
                    <div className="relative">
                      <input
                        type="search"
                        placeholder="Buscar parroquia (nombre registrada)"
                        value={form.parroquiaId ? `ID seleccionado: ${form.parroquiaId}` : ''}
                        onChange={() => handleChange('parroquiaId', null)}
                        className="w-full rounded-lg bg-background-light dark:bg-background-dark border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary p-3 pr-10"
                      />
                      <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">search</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Escriba el nombre para buscar en Parroquias registradas.</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Foja</label>
                    <input
                      type="text"
                      placeholder="Ej. 123-A"
                      value={form.foja}
                      onChange={e => handleChange('foja', e.target.value)}
                      className="w-full rounded-lg bg-background-light dark:bg-background-dark border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary p-3"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Número</label>
                    <input
                      type="text"
                      placeholder="Ej. 123-A"
                      value={form.numero}
                      onChange={e => handleChange('numero', e.target.value)}
                      className="w-full rounded-lg bg-background-light dark:bg-background-dark border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary p-3"
                    />
                  </div>
                   <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Fecha del Sacramento</label>
                    <input
                      type="date"
                      value={form.fecha_sacramento}
                      onChange={e => handleChange('fecha_sacramento', e.target.value)}
                      className="w-full rounded-lg bg-background-light dark:bg-background-dark border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary p-3"
                    />
                  </div>
                </div>
              </div>
            )}
            <div className="mt-6 flex items-center gap-3">
              <button
                type="submit"
                className="inline-flex items-center px-5 py-2.5 rounded-lg bg-primary text-white font-medium hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              >
                Registrar Sacramento
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800/40"
              >
                Limpiar
              </button>
            </div>
          </form>
        </div>
      )}

      {activeTab === 'buscar' && (
        <>
          <div className="bg-white dark:bg-background-dark/50 rounded-xl shadow-sm mb-6">
            <div className="p-6 border-b border-gray-200 dark:border-gray-800">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Buscar Sacramentos</h3>
                <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary">{tipoSacramento === 'comunion' ? 'Primera Comunión' : tipoSacramento.charAt(0).toUpperCase() + tipoSacramento.slice(1)}</span>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Use uno o más campos para filtrar y luego presione Buscar.</p>
            </div>
            <form className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" htmlFor="f-nombre">Nombre</label>
                  <input id="f-nombre" placeholder="Nombre" type="text"
                    value={filters.nombre}
                    onChange={e => setFilters(f => ({ ...f, nombre: e.target.value }))}
                    className="w-full rounded-lg bg-background-light dark:bg-background-dark border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary p-3" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" htmlFor="f-apellido_paterno">Apellido paterno</label>
                  <input id="f-apellido_paterno" placeholder="Apellido paterno" type="text"
                    value={filters.apellido_paterno}
                    onChange={e => setFilters(f => ({ ...f, apellido_paterno: e.target.value }))}
                    className="w-full rounded-lg bg-background-light dark:bg-background-dark border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary p-3" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" htmlFor="f-apellido_materno">Apellido materno</label>
                  <input id="f-apellido_materno" placeholder="Apellido materno" type="text"
                    value={filters.apellido_materno}
                    onChange={e => setFilters(f => ({ ...f, apellido_materno: e.target.value }))}
                    className="w-full rounded-lg bg-background-light dark:bg-background-dark border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary p-3" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" htmlFor="f-carnet_identidad">Carnet de identidad</label>
                  <input id="f-carnet_identidad" placeholder="CI" type="text"
                    value={filters.carnet_identidad}
                    onChange={e => setFilters(f => ({ ...f, carnet_identidad: e.target.value }))}
                    className="w-full rounded-lg bg-background-light dark:bg-background-dark border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary p-3" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" htmlFor="f-fecha_nacimiento">Fecha de nacimiento</label>
                  <input id="f-fecha_nacimiento" type="date"
                    value={filters.fecha_nacimiento}
                    onChange={e => setFilters(f => ({ ...f, fecha_nacimiento: e.target.value }))}
                    className="w-full rounded-lg bg-background-light dark:bg-background-dark border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary p-3" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" htmlFor="f-lugar_nacimiento">Lugar de nacimiento</label>
                  <input id="f-lugar_nacimiento" placeholder="Lugar" type="text"
                    value={filters.lugar_nacimiento}
                    onChange={e => setFilters(f => ({ ...f, lugar_nacimiento: e.target.value }))}
                    className="w-full rounded-lg bg-background-light dark:bg-background-dark border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary p-3" />
                </div>
                {/* Estos campos no están en filters de ejemplo, pero pueden añadirse si se desea */}
                {/* <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" htmlFor="f-nombre_padre">Nombre del padre</label>
                  <input id="f-nombre_padre" placeholder="Padre" type="text"
                    value={filters.nombre_padre || ''}
                    onChange={e => setFilters(f => ({ ...f, nombre_padre: e.target.value }))}
                    className="w-full rounded-lg bg-background-light dark:bg-background-dark border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary p-3" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" htmlFor="f-nombre_madre">Nombre de la madre</label>
                  <input id="f-nombre_madre" placeholder="Madre" type="text"
                    value={filters.nombre_madre || ''}
                    onChange={e => setFilters(f => ({ ...f, nombre_madre: e.target.value }))}
                    className="w-full rounded-lg bg-background-light dark:bg-background-dark border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary p-3" />
                </div> */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" htmlFor="f-activo">Estado</label>
                  <select id="f-activo"
                    value={filters.activo}
                    onChange={e => setFilters(f => ({ ...f, activo: e.target.value }))}
                    className="w-full rounded-lg bg-background-light dark:bg-background-dark border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary p-3">
                    <option value="">Todos</option>
                    <option value="true">Activo</option>
                    <option value="false">Inactivo</option>
                  </select>
                </div>
              </div>
              <div className="mt-6 flex items-center gap-3">
                <button type="button" onClick={handleBuscar} className="inline-flex items-center px-5 py-2.5 rounded-lg bg-primary text-white font-medium hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">Buscar</button>
                <button type="reset" className="px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800/40">Limpiar</button>
              </div>
            </form>
          </div>

          <div className="bg-white dark:bg-background-dark/50 rounded-xl shadow-sm">
            <div className="p-6 border-b border-gray-200 dark:border-gray-800">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Resultados</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Mostrando resultados de <strong>{tipoSacramento === 'comunion' ? 'Primera Comunión' : tipoSacramento}</strong>. Seleccione una fila para editar.</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700/50 dark:text-gray-400">
                  <tr>
                    <th className="px-6 py-3" scope="col">Nombre</th>
                    <th className="px-6 py-3" scope="col">Apellido paterno</th>
                    <th className="px-6 py-3" scope="col">Apellido materno</th>
                    <th className="px-6 py-3" scope="col">CI</th>
                    <th className="px-6 py-3" scope="col">Fecha nac.</th>
                    <th className="px-6 py-3" scope="col">Lugar nac.</th>
                    <th className="px-6 py-3" scope="col">Estado</th>
                  </tr>
                </thead>
                <tbody>
                  {results.map(row => (
                    <tr
                      key={row.id}
                      onClick={() => handleSelectResultado(row)}
                      className="cursor-pointer bg-white dark:bg-background-dark/50 border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
                    >
                      <td className="px-6 py-4">{row.nombre}</td>
                      <td className="px-6 py-4">{row.apellido_paterno}</td>
                      <td className="px-6 py-4">{row.apellido_materno}</td>
                      <td className="px-6 py-4">{row.carnet_identidad}</td>
                      <td className="px-6 py-4">{row.fecha_nacimiento}</td>
                      <td className="px-6 py-4">{row.lugar_nacimiento}</td>
                      <td className="px-6 py-4">
                        {row.activo ? (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">Activo</span>
                        ) : (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300">Inactivo</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {selectedPerson && (
              <div className="mt-8 bg-white dark:bg-background-dark/50 rounded-xl shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Editar Sacramento</h3>
                <form className="grid grid-cols-1 md-grid-cols-2 md:grid-cols-2 gap-6" onSubmit={handleGuardarEdicion}>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Nombre</label>
                    <input type="text" value={selectedPerson.nombre} onChange={() => {}} className="w-full rounded-lg border border-gray-300 dark:border-gray-700 p-3 bg-background-light dark:bg-background-dark" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Apellido paterno</label>
                    <input type="text" value={selectedPerson.apellido_paterno} onChange={() => {}} className="w-full rounded-lg border border-gray-300 dark:border-gray-700 p-3 bg-background-light dark:bg-background-dark" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Apellido materno</label>
                    <input type="text" value={selectedPerson.apellido_materno} onChange={() => {}} className="w-full rounded-lg border border-gray-300 dark:border-gray-700 p-3 bg-background-light dark:bg-background-dark" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Carnet de identidad</label>
                    <input type="text" value={selectedPerson.carnet_identidad} onChange={() => {}} className="w-full rounded-lg border border-gray-300 dark:border-gray-700 p-3 bg-background-light dark:bg-background-dark" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Fecha de nacimiento</label>
                    <input type="date" value={selectedPerson.fecha_nacimiento} onChange={() => {}} className="w-full rounded-lg border border-gray-300 dark:border-gray-700 p-3 bg-background-light dark:bg-background-dark" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Lugar de nacimiento</label>
                    <input type="text" value={selectedPerson.lugar_nacimiento} onChange={() => {}} className="w-full rounded-lg border border-gray-300 dark:border-gray-700 p-3 bg-background-light dark:bg-background-dark" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Nombre del padre</label>
                    <input type="text" value={selectedPerson.nombre_padre || ''} onChange={() => {}} className="w-full rounded-lg border border-gray-300 dark:border-gray-700 p-3 bg-background-light dark:bg-background-dark" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Nombre de la madre</label>
                    <input type="text" value={selectedPerson.nombre_madre || ''} onChange={() => {}} className="w-full rounded-lg border border-gray-300 dark:border-gray-700 p-3 bg-background-light dark:bg-background-dark" />
                  </div>
                  {/* Campos específicos para Bautizo y Confirmación (sin foja) en edición */}
                  {(tipoSacramento === 'bautizo' || tipoSacramento === 'comunion') && (
                    <div className="md:col-span-2 border-t border-gray-200 dark:border-gray-700 pt-4">
                      <h4 className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-3">Detalles de {tipoSacramento === 'comunion' ? 'Primera Comunión' : 'Bautizo'}</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Padrino</label>
                          <div className="relative">
                            <input
                              type="search"
                              placeholder="Buscar padrino (persona registrada)"
                              className="w-full rounded-lg bg-background-light dark:bg-background-dark border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary p-3 pr-10"
                            />
                            <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">search</span>
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Ministro</label>
                          <input type="text" placeholder="Nombre del ministro" className="w-full rounded-lg border border-gray-300 dark:border-gray-700 p-3 bg-background-light dark:bg-background-dark" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Parroquia</label>
                          <div className="relative">
                            <input
                              type="search"
                              placeholder="Buscar parroquia (nombre registrada)"
                              className="w-full rounded-lg bg-background-light dark:bg-background-dark border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary p-3 pr-10"
                            />
                            <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">search</span>
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Número de Acta</label>
                          <input type="text" placeholder="Ej. 123-A" className="w-full rounded-lg border border-gray-300 dark:border-gray-700 p-3 bg-background-light dark:bg-background-dark" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Fecha del Sacramento</label>
                          <input type="date" className="w-full rounded-lg border border-gray-300 dark:border-gray-700 p-3 bg-background-light dark:bg-background-dark" />
                        </div>
                      </div>
                    </div>
                  )}
                  <div className="md:col-span-2 flex items-center gap-3">
                    <input id="e-activo" type="checkbox" checked={!!selectedPerson.activo} onChange={() => {}} className="h-4 w-4 border-gray-300 dark:border-gray-700 rounded" />
                    <label htmlFor="e-activo" className="text-sm font-medium text-gray-700 dark:text-gray-300">Activo</label>
                  </div>
                  <div className="mt-4 col-span-2 flex justify-end gap-3">
                    <button type="button" onClick={() => setSelectedPerson(null)} className="px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800/40">Cancelar</button>
                    <button type="submit" className="inline-flex items-center px-5 py-2.5 rounded-lg bg-primary text-white font-medium hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">Guardar Cambios</button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </>
      )}
    </Layout>
  )
}