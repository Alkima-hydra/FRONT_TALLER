import { useState } from 'react'
import Layout from '../../shared/components/layout/Layout';
import DuplicatesMergeModal from './components/DuplicatesMergeModal';

export default function Parroquias() {
  const [mergeOpen, setMergeOpen] = useState(false)
  const [activeTab, setActiveTab] = useState('agregar')
  const [selectedParroquia, setSelectedParroquia] = useState(null)

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

      {/* Contenido dinámico */}
      {activeTab === 'agregar' && (
        <div className="bg-white dark:bg-background-dark/50 rounded-xl shadow-sm">
          <div className="p-6 border-b border-gray-200 dark:border-gray-800">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Datos de la Parroquia</h3>
          </div>
          <form className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" htmlFor="nombre">Nombre</label>
                <input id="nombre" placeholder="Ingrese el nombre de la parroquia" type="text"
                  className="w-full rounded-lg bg-background-light dark:bg-background-dark border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-primary p-3" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" htmlFor="direccion">Dirección</label>
                <input id="direccion" placeholder="Ingrese la dirección" type="text"
                  className="w-full rounded-lg bg-background-light dark:bg-background-dark border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-primary p-3" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" htmlFor="telefono">Teléfono</label>
                <input id="telefono" placeholder="Ingrese el teléfono" type="tel"
                  className="w-full rounded-lg bg-background-light dark:bg-background-dark border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-primary p-3" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" htmlFor="email">Email</label>
                <input id="email" placeholder="Ingrese el correo electrónico" type="email"
                  className="w-full rounded-lg bg-background-light dark:bg-background-dark border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-primary p-3" />
              </div>
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

      {activeTab === 'buscar' && (
        <>
          <div className="bg-white dark:bg-background-dark/50 rounded-xl shadow-sm mb-6">
            <div className="p-6 border-b border-gray-200 dark:border-gray-800">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Buscar Parroquia</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Use uno o más campos para filtrar y luego presione Buscar.</p>
            </div>
            <form className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" htmlFor="f-nombre">Nombre</label>
                  <input id="f-nombre" placeholder="Buscar por nombre" type="text"
                    className="w-full rounded-lg bg-background-light dark:bg-background-dark border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-primary p-3" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" htmlFor="f-direccion">Dirección</label>
                  <input id="f-direccion" placeholder="Buscar por dirección" type="text"
                    className="w-full rounded-lg bg-background-light dark:bg-background-dark border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-primary p-3" />
                </div>
              </div>
              <div className="mt-6 flex items-center gap-3">
                <button type="button" className="inline-flex items-center px-5 py-2.5 rounded-lg bg-primary text-white font-medium hover:bg-primary/90 focus:ring-2 focus:ring-offset-2 focus:ring-primary">Buscar</button>
                <button type="reset" className="px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800/40">Limpiar</button>
              </div>
            </form>
          </div>

          {/* Tabla de resultados */}
          <div className="bg-white dark:bg-background-dark/50 rounded-xl shadow-sm">
            <div className="p-6 border-b border-gray-200 dark:border-gray-800">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Resultados</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700/50 dark:text-gray-400">
                  <tr>
                    <th className="px-6 py-3" scope="col">Nombre</th>
                    <th className="px-6 py-3" scope="col">Dirección</th>
                    <th className="px-6 py-3" scope="col">Teléfono</th>
                    <th className="px-6 py-3" scope="col">Email</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    onClick={() => setSelectedParroquia({
                      nombre: 'Parroquia San Juan',
                      direccion: 'Av. Bolívar 123',
                      telefono: '22234567',
                      email: 'contacto@sanjuan.org'
                    })}
                    className="cursor-pointer bg-white dark:bg-background-dark/50 border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
                  >
                    <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">Parroquia San Juan</td>
                    <td className="px-6 py-4">Av. Bolívar 123</td>
                    <td className="px-6 py-4">22234567</td>
                    <td className="px-6 py-4">contacto@sanjuan.org</td>
                  </tr>
                  <tr
                    onClick={() => setSelectedParroquia({
                      nombre: 'Parroquia El Carmen',
                      direccion: 'Calle 10 N°45',
                      telefono: '22456789',
                      email: 'elcarmen@iglesia.org'
                    })}
                    className="cursor-pointer bg-white dark:bg-background-dark/50 hover:bg-gray-50 dark:hover:bg-gray-800"
                  >
                    <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">Parroquia El Carmen</td>
                    <td className="px-6 py-4">Calle 10 N°45</td>
                    <td className="px-6 py-4">22456789</td>
                    <td className="px-6 py-4">elcarmen@iglesia.org</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Edición */}
            {selectedParroquia && (
              <div className="mt-8 bg-white dark:bg-background-dark/50 rounded-xl shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Editar Parroquia</h3>
                <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Nombre</label>
                    <input type="text" value={selectedParroquia.nombre} onChange={() => {}} className="w-full rounded-lg border border-gray-300 dark:border-gray-700 p-3 bg-background-light dark:bg-background-dark" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Dirección</label>
                    <input type="text" value={selectedParroquia.direccion} onChange={() => {}} className="w-full rounded-lg border border-gray-300 dark:border-gray-700 p-3 bg-background-light dark:bg-background-dark" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Teléfono</label>
                    <input type="text" value={selectedParroquia.telefono} onChange={() => {}} className="w-full rounded-lg border border-gray-300 dark:border-gray-700 p-3 bg-background-light dark:bg-background-dark" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
                    <input type="email" value={selectedParroquia.email} onChange={() => {}} className="w-full rounded-lg border border-gray-300 dark:border-gray-700 p-3 bg-background-light dark:bg-background-dark" />
                  </div>
                  <div className="mt-4 col-span-2 flex justify-end gap-3">
                    <button type="button" onClick={() => setSelectedParroquia(null)} className="px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800/40">Cancelar</button>
                    <button type="submit" className="inline-flex items-center px-5 py-2.5 rounded-lg bg-primary text-white font-medium hover:bg-primary/90 focus:ring-2 focus:ring-offset-2 focus:ring-primary">Guardar Cambios</button>
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
