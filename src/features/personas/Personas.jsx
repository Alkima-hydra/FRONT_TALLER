import { useEffect, useState } from 'react'
import Layout from '../../shared/components/layout/Layout';
import DuplicatesMergeModal from './components/DuplicatesMergeModal';

export default function Personas() {
  const [mergeOpen, setMergeOpen] = useState(false)
  const [activeTab, setActiveTab] = useState('agregar') // pestaña activa
  const [selectedPerson, setSelectedPerson] = useState(null)

  // parametros para consumir
  const [formAdd, setFormAdd] = useState({
    nombre: '',
    apellido_paterno: '',
    apellido_materno: '',
    carnet_identidad: '',
    fecha_nacimiento: '',
    lugar_nacimiento: '',
    nombre_padre: '',
    nombre_madre: '',
    activo: true,
    estado: '',
  })

  const [filters, setFilters] = useState({
    nombre: '',
    apellido_paterno: '',
    apellido_materno: '',
    carnet_identidad: '',
    fecha_nacimiento: '',
    lugar_nacimiento: '',
    nombre_padre: '',
    nombre_madre: '',
    activo: '', // '', 'true', 'false'
    estado: '',
  })

  const [people, setPeople] = useState([])
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  
  const handleCreate = (e) => {
    e.preventDefault()
    createPerson(formAdd)
  }

  const handleSearch = (e) => {
    if (e) e.preventDefault()
    fetchPeople(filters)
    setSelectedPerson(null)
  }

  const handleResetSearch = () => {
    const clean = { nombre: '', apellido_paterno: '', apellido_materno: '', carnet_identidad: '', fecha_nacimiento: '', lugar_nacimiento: '', nombre_padre: '', nombre_madre: '', activo: '', estado: '' }
    setFilters(clean)
    fetchPeople(clean)
  }

  const handleUpdate = (e) => {
    e.preventDefault()
    if (!selectedPerson?.id) return
    const { id, ...payload } = selectedPerson
    updatePerson(id, payload)
  }

  useEffect(() => {
    //para cargar datos iniciales
  }, [])

  return (
    <Layout title="Gestión de Personas">
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
          Agregar Persona
        </button>
        <button
          onClick={() => setActiveTab('buscar')}
          className={`px-5 py-2 text-sm font-medium rounded-t-lg border transition-colors focus:outline-none ${
            activeTab === 'buscar'
              ? 'bg-white dark:bg-background-dark text-primary border-gray-200 dark:border-gray-700 border-b-transparent -mb-px'
              : 'bg-gray-50 dark:bg-gray-800/40 text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white border-transparent'
          }`}
        >
          Buscar Persona
        </button>
      </div>

      {/* Contenido dinámico según la pestaña */}
      {activeTab === 'agregar' && (
        <div className="bg-white dark:bg-background-dark/50 rounded-xl shadow-sm">
          <div className="p-6 border-b border-gray-200 dark:border-gray-800">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Datos Personales</h3>
          </div>
          <form className="p-6" onSubmit={handleCreate}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" htmlFor="nombre">Nombre</label>
                <input
                  id="nombre"
                  placeholder="Ingrese el nombre"
                  type="text"
                  value={formAdd.nombre}
                  onChange={e => setFormAdd({ ...formAdd, nombre: e.target.value })}
                  className="w-full rounded-lg bg-background-light dark:bg-background-dark border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary p-3"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" htmlFor="apellido_paterno">Apellido paterno</label>
                <input
                  id="apellido_paterno"
                  placeholder="Ingrese el apellido paterno"
                  type="text"
                  value={formAdd.apellido_paterno}
                  onChange={e => setFormAdd({ ...formAdd, apellido_paterno: e.target.value })}
                  className="w-full rounded-lg bg-background-light dark:bg-background-dark border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary p-3"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" htmlFor="apellido_materno">Apellido materno</label>
                <input
                  id="apellido_materno"
                  placeholder="Ingrese el apellido materno"
                  type="text"
                  value={formAdd.apellido_materno}
                  onChange={e => setFormAdd({ ...formAdd, apellido_materno: e.target.value })}
                  className="w-full rounded-lg bg-background-light dark:bg-background-dark border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary p-3"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" htmlFor="carnet_identidad">Carnet de identidad</label>
                <input
                  id="carnet_identidad"
                  placeholder="Ingrese el CI"
                  type="text"
                  value={formAdd.carnet_identidad}
                  onChange={e => setFormAdd({ ...formAdd, carnet_identidad: e.target.value })}
                  className="w-full rounded-lg bg-background-light dark:bg-background-dark border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary p-3"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" htmlFor="fecha_nacimiento">Fecha de nacimiento</label>
                <input
                  id="fecha_nacimiento"
                  type="date"
                  value={formAdd.fecha_nacimiento}
                  onChange={e => setFormAdd({ ...formAdd, fecha_nacimiento: e.target.value })}
                  className="w-full rounded-lg bg-background-light dark:bg-background-dark border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary p-3"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" htmlFor="lugar_nacimiento">Lugar de nacimiento</label>
                <input
                  id="lugar_nacimiento"
                  placeholder="Ingrese el lugar"
                  type="text"
                  value={formAdd.lugar_nacimiento}
                  onChange={e => setFormAdd({ ...formAdd, lugar_nacimiento: e.target.value })}
                  className="w-full rounded-lg bg-background-light dark:bg-background-dark border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary p-3"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" htmlFor="nombre_padre">Nombre del padre</label>
                <input
                  id="nombre_padre"
                  placeholder="Ingrese el nombre del padre"
                  type="text"
                  value={formAdd.nombre_padre}
                  onChange={e => setFormAdd({ ...formAdd, nombre_padre: e.target.value })}
                  className="w-full rounded-lg bg-background-light dark:bg-background-dark border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary p-3"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" htmlFor="nombre_madre">Nombre de la madre</label>
                <input
                  id="nombre_madre"
                  placeholder="Ingrese el nombre de la madre"
                  type="text"
                  value={formAdd.nombre_madre}
                  onChange={e => setFormAdd({ ...formAdd, nombre_madre: e.target.value })}
                  className="w-full rounded-lg bg-background-light dark:bg-background-dark border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary p-3"
                />
              </div>
              <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-center gap-3">
                  <input
                    id="activo"
                    type="checkbox"
                    checked={formAdd.activo}
                    onChange={e => setFormAdd({ ...formAdd, activo: e.target.checked })}
                    className="h-4 w-4 border-gray-300 dark:border-gray-700 rounded"
                  />
                  <label htmlFor="activo" className="text-sm font-medium text-gray-700 dark:text-gray-300">Activo</label>
                </div>
                <div>
                  <label htmlFor="estado" className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-1">Estado de verificación</label>
                  <select
                    id="estado"
                    value={formAdd.estado}
                    onChange={e => setFormAdd({ ...formAdd, estado: e.target.value })}
                    className="w-full rounded-lg bg-background-light dark:bg-background-dark border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary p-2"
                  >
                    <option value="">Seleccione</option>
                    <option value="estado">Verificado</option>
                    <option value="No estado">No Verificado</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="mt-6 flex items-center gap-3">
              <button
                type="submit"
                className="inline-flex items-center px-5 py-2.5 rounded-lg bg-primary text-white font-medium hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              >
                Agregar Persona
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

      {activeTab === 'buscar' && (
        <>
          <div className="bg-white dark:bg-background-dark/50 rounded-xl shadow-sm mb-6">
            <div className="p-6 border-b border-gray-200 dark:border-gray-800">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Buscar Persona</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Use uno o más campos para filtrar y luego presione Buscar.</p>
            </div>
            <form className="p-6" onSubmit={handleSearch}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" htmlFor="f-nombre">Nombre</label>
                  <input
                    id="f-nombre"
                    placeholder="Nombre"
                    type="text"
                    value={filters.nombre}
                    onChange={e => setFilters({ ...filters, nombre: e.target.value })}
                    className="w-full rounded-lg bg-background-light dark:bg-background-dark border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary p-3"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" htmlFor="f-apellido_paterno">Apellido paterno</label>
                  <input
                    id="f-apellido_paterno"
                    placeholder="Apellido paterno"
                    type="text"
                    value={filters.apellido_paterno}
                    onChange={e => setFilters({ ...filters, apellido_paterno: e.target.value })}
                    className="w-full rounded-lg bg-background-light dark:bg-background-dark border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary p-3"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" htmlFor="f-apellido_materno">Apellido materno</label>
                  <input
                    id="f-apellido_materno"
                    placeholder="Apellido materno"
                    type="text"
                    value={filters.apellido_materno}
                    onChange={e => setFilters({ ...filters, apellido_materno: e.target.value })}
                    className="w-full rounded-lg bg-background-light dark:bg-background-dark border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary p-3"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" htmlFor="f-carnet_identidad">Carnet de identidad</label>
                  <input
                    id="f-carnet_identidad"
                    placeholder="CI"
                    type="text"
                    value={filters.carnet_identidad}
                    onChange={e => setFilters({ ...filters, carnet_identidad: e.target.value })}
                    className="w-full rounded-lg bg-background-light dark:bg-background-dark border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary p-3"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" htmlFor="f-fecha_nacimiento">Fecha de nacimiento</label>
                  <input
                    id="f-fecha_nacimiento"
                    type="date"
                    value={filters.fecha_nacimiento}
                    onChange={e => setFilters({ ...filters, fecha_nacimiento: e.target.value })}
                    className="w-full rounded-lg bg-background-light dark:bg-background-dark border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary p-3"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" htmlFor="f-lugar_nacimiento">Lugar de nacimiento</label>
                  <input
                    id="f-lugar_nacimiento"
                    placeholder="Lugar"
                    type="text"
                    value={filters.lugar_nacimiento}
                    onChange={e => setFilters({ ...filters, lugar_nacimiento: e.target.value })}
                    className="w-full rounded-lg bg-background-light dark:bg-background-dark border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary p-3"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" htmlFor="f-nombre_padre">Nombre del padre</label>
                  <input
                    id="f-nombre_padre"
                    placeholder="Padre"
                    type="text"
                    value={filters.nombre_padre}
                    onChange={e => setFilters({ ...filters, nombre_padre: e.target.value })}
                    className="w-full rounded-lg bg-background-light dark:bg-background-dark border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary p-3"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" htmlFor="f-nombre_madre">Nombre de la madre</label>
                  <input
                    id="f-nombre_madre"
                    placeholder="Madre"
                    type="text"
                    value={filters.nombre_madre}
                    onChange={e => setFilters({ ...filters, nombre_madre: e.target.value })}
                    className="w-full rounded-lg bg-background-light dark:bg-background-dark border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary p-3"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" htmlFor="f-activo">Estado</label>
                  <select
                    id="f-activo"
                    value={filters.activo}
                    onChange={e => setFilters({ ...filters, activo: e.target.value })}
                    className="w-full rounded-lg bg-background-light dark:bg-background-dark border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary p-3"
                  >
                    <option value="">Todos</option>
                    <option value="true">Activo</option>
                    <option value="false">Inactivo</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" htmlFor="f-estado">Estado de verificación</label>
                  <select
                    id="f-estado"
                    value={filters.estado}
                    onChange={e => setFilters({ ...filters, estado: e.target.value })}
                    className="w-full rounded-lg bg-background-light dark:bg-background-dark border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary p-3"
                  >
                    <option value="">Todos</option>
                    <option value="estado">Verificado</option>
                    <option value="No estado">No verificado</option>
                  </select>
                </div>
              </div>
              <div className="mt-6 flex items-center gap-3">
                <button type="submit" className="inline-flex items-center px-5 py-2.5 rounded-lg bg-primary text-white font-medium hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">Buscar</button>
                <button type="reset" onClick={handleResetSearch} className="px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800/40">Limpiar</button>
              </div>
            </form>
          </div>

          <div className="bg-white dark:bg-background-dark/50 rounded-xl shadow-sm">
            <div className="p-6 border-b border-gray-200 dark:border-gray-800">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Resultados</h3>
               <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Para editar alguno de los resultados, seleccione la fila deseada.</p>
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
                    <th className="px-6 py-3" scope="col">Estado de verificación</th>
                  </tr>
                </thead>
                <tbody>
                  {loading && (
                    <tr><td className="px-6 py-4" colSpan={8}>Cargando...</td></tr>
                  )}
                  {!loading && people.length === 0 && (
                    <tr><td className="px-6 py-4" colSpan={8}>Sin resultados</td></tr>
                  )}
                  {!loading && people.map((p) => (
                    <tr
                      key={p.id}
                      onClick={() => setSelectedPerson({ ...p })}
                      className="cursor-pointer bg-white dark:bg-background-dark/50 border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
                    >
                      <td className="px-6 py-4">{p.nombre}</td>
                      <td className="px-6 py-4">{p.apellido_paterno}</td>
                      <td className="px-6 py-4">{p.apellido_materno}</td>
                      <td className="px-6 py-4">{p.carnet_identidad}</td>
                      <td className="px-6 py-4">{p.fecha_nacimiento}</td>
                      <td className="px-6 py-4">{p.lugar_nacimiento}</td>
                      <td className="px-6 py-4">
                        {p.activo ? (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">Activo</span>
                        ) : (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300">Inactivo</span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        {p.estado === 'Verificado' ? (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">Verificado</span>
                        ) : (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300">No verificado</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {selectedPerson && (
              <div className="mt-8 bg-white dark:bg-background-dark/50 rounded-xl shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Editar Persona</h3>
                <form onSubmit={handleUpdate} className="grid grid-cols-1 md-grid-cols-2 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Nombre</label>
                    <input
                      type="text"
                      value={selectedPerson.nombre || ''}
                      onChange={e => setSelectedPerson({ ...selectedPerson, nombre: e.target.value })}
                      className="w-full rounded-lg border border-gray-300 dark:border-gray-700 p-3 bg-background-light dark:bg-background-dark"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Apellido paterno</label>
                    <input
                      type="text"
                      value={selectedPerson.apellido_paterno || ''}
                      onChange={e => setSelectedPerson({ ...selectedPerson, apellido_paterno: e.target.value })}
                      className="w-full rounded-lg border border-gray-300 dark:border-gray-700 p-3 bg-background-light dark:bg-background-dark"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Apellido materno</label>
                    <input
                      type="text"
                      value={selectedPerson.apellido_materno || ''}
                      onChange={e => setSelectedPerson({ ...selectedPerson, apellido_materno: e.target.value })}
                      className="w-full rounded-lg border border-gray-300 dark:border-gray-700 p-3 bg-background-light dark:bg-background-dark"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Carnet de identidad</label>
                    <input
                      type="text"
                      value={selectedPerson.carnet_identidad || ''}
                      onChange={e => setSelectedPerson({ ...selectedPerson, carnet_identidad: e.target.value })}
                      className="w-full rounded-lg border border-gray-300 dark:border-gray-700 p-3 bg-background-light dark:bg-background-dark"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Fecha de nacimiento</label>
                    <input
                      type="date"
                      value={selectedPerson.fecha_nacimiento || ''}
                      onChange={e => setSelectedPerson({ ...selectedPerson, fecha_nacimiento: e.target.value })}
                      className="w-full rounded-lg border border-gray-300 dark:border-gray-700 p-3 bg-background-light dark:bg-background-dark"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Lugar de nacimiento</label>
                    <input
                      type="text"
                      value={selectedPerson.lugar_nacimiento || ''}
                      onChange={e => setSelectedPerson({ ...selectedPerson, lugar_nacimiento: e.target.value })}
                      className="w-full rounded-lg border border-gray-300 dark:border-gray-700 p-3 bg-background-light dark:bg-background-dark"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Nombre del padre</label>
                    <input
                      type="text"
                      value={selectedPerson.nombre_padre || ''}
                      onChange={e => setSelectedPerson({ ...selectedPerson, nombre_padre: e.target.value })}
                      className="w-full rounded-lg border border-gray-300 dark:border-gray-700 p-3 bg-background-light dark:bg-background-dark"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Nombre de la madre</label>
                    <input
                      type="text"
                      value={selectedPerson.nombre_madre || ''}
                      onChange={e => setSelectedPerson({ ...selectedPerson, nombre_madre: e.target.value })}
                      className="w-full rounded-lg border border-gray-300 dark:border-gray-700 p-3 bg-background-light dark:bg-background-dark"
                    />
                  </div>
                  <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex items-center gap-3">
                      <input
                        id="e-activo"
                        type="checkbox"
                        checked={!!selectedPerson.activo}
                        onChange={e => setSelectedPerson({ ...selectedPerson, activo: e.target.checked })}
                        className="h-4 w-4 border-gray-300 dark:border-gray-700 rounded"
                      />
                      <label htmlFor="e-activo" className="text-sm font-medium text-gray-700 dark:text-gray-300">Activo</label>
                    </div>
                    <div>
                      <label htmlFor="e-estado" className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-1">Estado de verificación</label>
                      <select
                        id="e-estado"
                        value={selectedPerson.estado || ''}
                        onChange={e => setSelectedPerson({ ...selectedPerson, estado: e.target.value })}
                        className="w-full rounded-lg bg-background-light dark:bg-background-dark border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary p-2"
                      >
                        <option value="">Seleccione</option>
                        <option value="Verificado">Verificado</option>
                        <option value="No verificado">No verificado</option>
                      </select>
                    </div>
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

      <DuplicatesMergeModal open={mergeOpen} onClose={() => setMergeOpen(false)} />
    </Layout>
  )
}