import { useState } from 'react'
import Layout from '../../shared/components/layout/Layout';

export default function Sacramentos() {
  const [mergeOpen, setMergeOpen] = useState(false)
  const [activeTab, setActiveTab] = useState('agregar') // pestaña activa
  const [selectedPerson, setSelectedPerson] = useState(null)
  const [tipoSacramento, setTipoSacramento] = useState('bautizo')

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
          <form className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" htmlFor="nombre">Nombre</label>
                <input id="nombre" placeholder="Ingrese el nombre" type="text"
                  className="w-full rounded-lg bg-background-light dark:bg-background-dark border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary p-3" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" htmlFor="apellido_paterno">Apellido paterno</label>
                <input id="apellido_paterno" placeholder="Ingrese el apellido paterno" type="text"
                  className="w-full rounded-lg bg-background-light dark:bg-background-dark border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary p-3" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" htmlFor="apellido_materno">Apellido materno</label>
                <input id="apellido_materno" placeholder="Ingrese el apellido materno" type="text"
                  className="w-full rounded-lg bg-background-light dark:bg-background-dark border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary p-3" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" htmlFor="carnet_identidad">Carnet de identidad</label>
                <input id="carnet_identidad" placeholder="Ingrese el CI" type="text"
                  className="w-full rounded-lg bg-background-light dark:bg-background-dark border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary p-3" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" htmlFor="fecha_nacimiento">Fecha de nacimiento</label>
                <input id="fecha_nacimiento" type="date"
                  className="w-full rounded-lg bg-background-light dark:bg-background-dark border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary p-3" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" htmlFor="lugar_nacimiento">Lugar de nacimiento</label>
                <input id="lugar_nacimiento" placeholder="Ingrese el lugar" type="text"
                  className="w-full rounded-lg bg-background-light dark:bg-background-dark border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary p-3" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" htmlFor="nombre_padre">Nombre del padre</label>
                <input id="nombre_padre" placeholder="Ingrese el nombre del padre" type="text"
                  className="w-full rounded-lg bg-background-light dark:bg-background-dark border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary p-3" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" htmlFor="nombre_madre">Nombre de la madre</label>
                <input id="nombre_madre" placeholder="Ingrese el nombre de la madre" type="text"
                  className="w-full rounded-lg bg-background-light dark:bg-background-dark border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary p-3" />
              </div>
              <div className="md:col-span-2 flex items-center gap-3">
                <input id="activo" type="checkbox" className="h-4 w-4 border-gray-300 dark:border-gray-700 rounded" />
                <label htmlFor="activo" className="text-sm font-medium text-gray-700 dark:text-gray-300">Activo</label>
              </div>
            </div>
            <div className="mt-6 flex items-center gap-3">
              <button
                type="submit"
                className="inline-flex items-center px-5 py-2.5 rounded-lg bg-primary text-white font-medium hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              >
                Registrar Sacramento
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
                  <input id="f-nombre" placeholder="Nombre" type="text" className="w-full rounded-lg bg-background-light dark:bg-background-dark border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary p-3" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" htmlFor="f-apellido_paterno">Apellido paterno</label>
                  <input id="f-apellido_paterno" placeholder="Apellido paterno" type="text" className="w-full rounded-lg bg-background-light dark:bg-background-dark border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary p-3" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" htmlFor="f-apellido_materno">Apellido materno</label>
                  <input id="f-apellido_materno" placeholder="Apellido materno" type="text" className="w-full rounded-lg bg-background-light dark:bg-background-dark border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary p-3" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" htmlFor="f-carnet_identidad">Carnet de identidad</label>
                  <input id="f-carnet_identidad" placeholder="CI" type="text" className="w-full rounded-lg bg-background-light dark:bg-background-dark border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary p-3" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" htmlFor="f-fecha_nacimiento">Fecha de nacimiento</label>
                  <input id="f-fecha_nacimiento" type="date" className="w-full rounded-lg bg-background-light dark:bg-background-dark border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary p-3" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" htmlFor="f-lugar_nacimiento">Lugar de nacimiento</label>
                  <input id="f-lugar_nacimiento" placeholder="Lugar" type="text" className="w-full rounded-lg bg-background-light dark:bg-background-dark border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary p-3" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" htmlFor="f-nombre_padre">Nombre del padre</label>
                  <input id="f-nombre_padre" placeholder="Padre" type="text" className="w-full rounded-lg bg-background-light dark:bg-background-dark border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary p-3" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" htmlFor="f-nombre_madre">Nombre de la madre</label>
                  <input id="f-nombre_madre" placeholder="Madre" type="text" className="w-full rounded-lg bg-background-light dark:bg-background-dark border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary p-3" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" htmlFor="f-activo">Estado</label>
                  <select id="f-activo" className="w-full rounded-lg bg-background-light dark:bg-background-dark border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary p-3">
                    <option value="">Todos</option>
                    <option value="true">Activo</option>
                    <option value="false">Inactivo</option>
                  </select>
                </div>
              </div>
              <div className="mt-6 flex items-center gap-3">
                <button type="button" className="inline-flex items-center px-5 py-2.5 rounded-lg bg-primary text-white font-medium hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">Buscar</button>
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
                  <tr
                    onClick={() => setSelectedPerson({ id: 1, nombre: 'Carlos', apellido_paterno: 'Mendoza', apellido_materno: 'Pérez', carnet_identidad: '6789012 LP', fecha_nacimiento: '1990-01-10', lugar_nacimiento: 'La Paz', nombre_padre: 'Juan Mendoza', nombre_madre: 'María Pérez', activo: true })}
                    className="cursor-pointer bg-white dark:bg-background-dark/50 border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
                  >
                    <td className="px-6 py-4">Carlos</td>
                    <td className="px-6 py-4">Mendoza</td>
                    <td className="px-6 py-4">Pérez</td>
                    <td className="px-6 py-4">6789012 LP</td>
                    <td className="px-6 py-4">1990-01-10</td>
                    <td className="px-6 py-4">La Paz</td>
                    <td className="px-6 py-4"><span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">Activo</span></td>
                  </tr>
                  <tr
                    onClick={() => setSelectedPerson({ id: 2, nombre: 'Ana', apellido_paterno: 'Rodríguez', apellido_materno: 'Guzmán', carnet_identidad: '3456789 CB', fecha_nacimiento: '1995-04-18', lugar_nacimiento: 'Cochabamba', nombre_padre: 'Pedro Rodríguez', nombre_madre: 'Elena Guzmán', activo: false })}
                    className="cursor-pointer bg-white dark:bg-background-dark/50 hover:bg-gray-50 dark:hover:bg-gray-800"
                  >
                    <td className="px-6 py-4">Ana</td>
                    <td className="px-6 py-4">Rodríguez</td>
                    <td className="px-6 py-4">Guzmán</td>
                    <td className="px-6 py-4">3456789 CB</td>
                    <td className="px-6 py-4">1995-04-18</td>
                    <td className="px-6 py-4">Cochabamba</td>
                    <td className="px-6 py-4"><span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300">Inactivo</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
            {selectedPerson && (
              <div className="mt-8 bg-white dark:bg-background-dark/50 rounded-xl shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Editar Sacramento</h3>
                <form className="grid grid-cols-1 md-grid-cols-2 md:grid-cols-2 gap-6">
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
                    <input type="text" value={selectedPerson.nombre_padre} onChange={() => {}} className="w-full rounded-lg border border-gray-300 dark:border-gray-700 p-3 bg-background-light dark:bg-background-dark" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Nombre de la madre</label>
                    <input type="text" value={selectedPerson.nombre_madre} onChange={() => {}} className="w-full rounded-lg border border-gray-300 dark:border-gray-700 p-3 bg-background-light dark:bg-background-dark" />
                  </div>
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