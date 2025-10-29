import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Layout from '../../shared/components/layout/Layout';
import DuplicatesMergeModal from './components/DuplicatesMergeModal';

import {
  fetchParroquias,
  fetchParroquiaById,
  fetchAllParroquias,
} from './slices/parroquiasThunk';

import {
  selectParroquias,
  selectIsLoading,
  selectError,
  selectParroquiaSeleccionada,
  clearParroquiaSeleccionada,
} from './slices/parroquiasSlice';

export default function Parroquias() {
  const dispatch = useDispatch();

  // Estados locales
  const [mergeOpen, setMergeOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('agregar');
  const [formData, setFormData] = useState({
    nombre: '',
    direccion: '',
    telefono: '',
    email: '',
  });
  const [filters, setFilters] = useState({ nombre: '', direccion: '' });

  // Estados globales de Redux
  const parroquias = useSelector(selectParroquias);
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);
  const parroquiaSeleccionada = useSelector(selectParroquiaSeleccionada);

  // Al abrir la pestaña de búsqueda, cargar parroquias
  useEffect(() => {
    if (activeTab === 'buscar') {
      dispatch(fetchParroquias(filters));
    }
  }, [activeTab, filters, dispatch]);

  // Manejadores?
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.id.replace('f-', '')]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Formulario a enviar:', formData);
    // Aquí podrías despachar un thunk para crear una parroquia:
    // dispatch(createParroquia(formData));
  };

  const handleBuscar = () => {
    dispatch(fetchParroquias(filters));
  };

  const handleSelectParroquia = (p) => {
    dispatch(fetchParroquiaById(p.id));
  };

  const handleCancelarEdicion = () => {
    dispatch(clearParroquiaSeleccionada());
  };

  return (
    <Layout title="Gestión de Parroquias">
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
          Agregar Parroquia
        </button>
        <button
          onClick={() => setActiveTab('buscar')}
          className={`px-5 py-2 text-sm font-medium rounded-t-lg border transition-colors focus:outline-none ${
            activeTab === 'buscar'
              ? 'bg-white dark:bg-background-dark text-primary border-gray-200 dark:border-gray-700 border-b-transparent -mb-px'
              : 'bg-gray-50 dark:bg-gray-800/40 text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white border-transparent'
          }`}
        >
          Buscar Parroquia
        </button>
      </div>

      {/* TAB: Agregar */}
      {activeTab === 'agregar' && (
        <div className="bg-white dark:bg-background-dark/50 rounded-xl shadow-sm">
          <div className="p-6 border-b border-gray-200 dark:border-gray-800">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Datos de la Parroquia</h3>
          </div>
          <form onSubmit={handleSubmit} className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {['nombre', 'direccion', 'telefono', 'email'].map((field) => (
                <div key={field}>
                  <label
                    htmlFor={field}
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  >
                    {field.charAt(0).toUpperCase() + field.slice(1)}
                  </label>
                  <input
                    id={field}
                    type={field === 'email' ? 'email' : 'text'}
                    value={formData[field]}
                    onChange={handleInputChange}
                    placeholder={`Ingrese ${field}`}
                    className="w-full rounded-lg bg-background-light dark:bg-background-dark border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-primary p-3"
                  />
                </div>
              ))}
            </div>
            <div className="mt-6 flex items-center gap-3">
              <button
                type="submit"
                className="inline-flex items-center px-5 py-2.5 rounded-lg bg-primary text-white font-medium hover:bg-primary/90 focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              >
                Agregar Parroquia
              </button>
              <button
                type="reset"
                className="px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800/40"
              >
                Limpiar
              </button>
            </div>
          </form>
        </div>
      )}

      {/* TAB: Buscar */}
      {activeTab === 'buscar' && (
        <>
          <div className="bg-white dark:bg-background-dark/50 rounded-xl shadow-sm mb-6">
            <div className="p-6 border-b border-gray-200 dark:border-gray-800">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Buscar Parroquia</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Use uno o más campos para filtrar y luego presione Buscar.
              </p>
            </div>
            <form className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" htmlFor="f-nombre">
                    Nombre
                  </label>
                  <input
                    id="f-nombre"
                    placeholder="Buscar por nombre"
                    type="text"
                    value={filters.nombre}
                    onChange={handleFilterChange}
                    className="w-full rounded-lg bg-background-light dark:bg-background-dark border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-primary p-3"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" htmlFor="f-direccion">
                    Dirección
                  </label>
                  <input
                    id="f-direccion"
                    placeholder="Buscar por dirección"
                    type="text"
                    value={filters.direccion}
                    onChange={handleFilterChange}
                    className="w-full rounded-lg bg-background-light dark:bg-background-dark border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-primary p-3"
                  />
                </div>
              </div>
              <div className="mt-6 flex items-center gap-3">
                <button
                  type="button"
                  onClick={handleBuscar}
                  className="inline-flex items-center px-5 py-2.5 rounded-lg bg-primary text-white font-medium hover:bg-primary/90 focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                >
                  Buscar
                </button>
                <button
                  type="reset"
                  onClick={() => setFilters({ nombre: '', direccion: '' })}
                  className="px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800/40"
                >
                  Limpiar
                </button>
              </div>
            </form>
          </div>

          {/* Tabla de resultados */}
          <div className="bg-white dark:bg-background-dark/50 rounded-xl shadow-sm">
            <div className="p-6 border-b border-gray-200 dark:border-gray-800">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Resultados</h3>
            </div>

            {isLoading ? (
              <div className="p-6 text-center text-gray-500 dark:text-gray-400">Cargando...</div>
            ) : error ? (
              <div className="p-6 text-center text-red-500">{error}</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700/50 dark:text-gray-400">
                    <tr>
                      <th className="px-6 py-3">Nombre</th>
                      <th className="px-6 py-3">Dirección</th>
                      <th className="px-6 py-3">Teléfono</th>
                      <th className="px-6 py-3">Email</th>
                    </tr>
                  </thead>
                  <tbody>
                    {parroquias.length > 0 ? (
                      parroquias.map((p) => (
                        <tr
                          key={p.id}
                          onClick={() => handleSelectParroquia(p)}
                          className="cursor-pointer bg-white dark:bg-background-dark/50 border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
                        >
                          <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{p.nombre}</td>
                          <td className="px-6 py-4">{p.direccion}</td>
                          <td className="px-6 py-4">{p.telefono}</td>
                          <td className="px-6 py-4">{p.email}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="4" className="px-6 py-4 text-center text-gray-500 dark:text-gray-400">
                          No se encontraron resultados
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}

            {/* Edición */}
            {parroquiaSeleccionada && (
              <div className="mt-8 bg-white dark:bg-background-dark/50 rounded-xl shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Editar Parroquia
                </h3>
                <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Nombre</label>
                    <input
                      type="text"
                      value={parroquiaSeleccionada.nombre || ''}
                      readOnly
                      className="w-full rounded-lg border border-gray-300 dark:border-gray-700 p-3 bg-background-light dark:bg-background-dark"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Dirección</label>
                    <input
                      type="text"
                      value={parroquiaSeleccionada.direccion || ''}
                      readOnly
                      className="w-full rounded-lg border border-gray-300 dark:border-gray-700 p-3 bg-background-light dark:bg-background-dark"
                    />
                  </div>
                  <div className="mt-4 col-span-2 flex justify-end gap-3">
                    <button
                      type="button"
                      onClick={handleCancelarEdicion}
                      className="px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800/40"
                    >
                      Cerrar
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </>
      )}

      <DuplicatesMergeModal open={mergeOpen} onClose={() => setMergeOpen(false)} />
    </Layout>
  );
}
