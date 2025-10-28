import { useState } from 'react'
import Layout from '../../shared/components/layout/Layout';
import DuplicatesMergeModal from './components/DuplicatesMergeModal';

export default function Personas() {
  const [mergeOpen, setMergeOpen] = useState(false)
  const [activeTab, setActiveTab] = useState('agregar') // pestaña activa
  const [selectedPerson, setSelectedPerson] = useState(null)

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
          <form className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" htmlFor="nombres">Nombres</label>
                <input id="nombres" placeholder="Ingrese los nombres" type="text"
                  className="w-full rounded-lg bg-background-light dark:bg-background-dark border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary p-3" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" htmlFor="apellidos">Apellidos</label>
                <input id="apellidos" placeholder="Ingrese los apellidos" type="text"
                  className="w-full rounded-lg bg-background-light dark:bg-background-dark border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary p-3" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" htmlFor="fecha-nacimiento">Fecha de Nacimiento</label>
                <input id="fecha-nacimiento" type="date"
                  className="w-full rounded-lg bg-background-light dark:bg-background-dark border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary p-3" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" htmlFor="lugar-nacimiento">Lugar de Nacimiento</label>
                <input id="lugar-nacimiento" placeholder="Ingrese el lugar" type="text"
                  className="w-full rounded-lg bg-background-light dark:bg-background-dark border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary p-3" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" htmlFor="padre">Padre</label>
                <input id="padre" placeholder="Ingrese el nombre del padre" type="text"
                  className="w-full rounded-lg bg-background-light dark:bg-background-dark border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary p-3" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" htmlFor="madre">Madre</label>
                <input id="madre" placeholder="Ingrese el nombre de la madre" type="text"
                  className="w-full rounded-lg bg-background-light dark:bg-background-dark border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary p-3" />
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
            <form className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" htmlFor="f-nombres">Nombres</label>
                  <input id="f-nombres" placeholder="Buscar por nombres" type="text"
                    className="w-full rounded-lg bg-background-light dark:bg-background-dark border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary p-3" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" htmlFor="f-apellidos">Apellidos</label>
                  <input id="f-apellidos" placeholder="Buscar por apellidos" type="text"
                    className="w-full rounded-lg bg-background-light dark:bg-background-dark border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary p-3" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" htmlFor="f-fecha-nacimiento">Fecha de Nacimiento</label>
                  <input id="f-fecha-nacimiento" type="date"
                    className="w-full rounded-lg bg-background-light dark:bg-background-dark border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary p-3" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" htmlFor="f-lugar-nacimiento">Lugar de Nacimiento</label>
                  <input id="f-lugar-nacimiento" placeholder="Buscar por lugar" type="text"
                    className="w-full rounded-lg bg-background-light dark:bg-background-dark border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary p-3" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" htmlFor="f-padre">Padre</label>
                  <input id="f-padre" placeholder="Buscar por nombre del padre" type="text"
                    className="w-full rounded-lg bg-background-light dark:bg-background-dark border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary p-3" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" htmlFor="f-madre">Madre</label>
                  <input id="f-madre" placeholder="Buscar por nombre de la madre" type="text"
                    className="w-full rounded-lg bg-background-light dark:bg-background-dark border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary p-3" />
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
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700/50 dark:text-gray-400">
                  <tr>
                    <th className="px-6 py-3" scope="col">Sacramento</th>
                    <th className="px-6 py-3" scope="col">Fecha</th>
                    <th className="px-6 py-3" scope="col">Lugar</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    onClick={() => setSelectedPerson({ nombres: 'Carlos', apellidos: 'Mendoza', fechaNacimiento: '1990-01-10', lugarNacimiento: 'La Paz', padre: 'Juan Mendoza', madre: 'María Pérez' })}
                    className="cursor-pointer bg-white dark:bg-background-dark/50 border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
                  >
                    <th className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white" scope="row">Bautizo</th>
                    <td className="px-6 py-4">2000-05-15</td>
                    <td className="px-6 py-4">Parroquia San Juan</td>
                  </tr>
                  <tr
                    onClick={() => setSelectedPerson({ nombres: 'Carlos', apellidos: 'Mendoza', fechaNacimiento: '1990-01-10', lugarNacimiento: 'La Paz', padre: 'Juan Mendoza', madre: 'María Pérez' })}
                    className="cursor-pointer bg-white dark:bg-background-dark/50 border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
                  >
                    <th className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white" scope="row">Confirmación</th>
                    <td className="px-6 py-4">2015-08-20</td>
                    <td className="px-6 py-4">Catedral Metropolitana</td>
                  </tr>
                  <tr
                    onClick={() => setSelectedPerson({ nombres: 'Carlos', apellidos: 'Mendoza', fechaNacimiento: '1990-01-10', lugarNacimiento: 'La Paz', padre: 'Juan Mendoza', madre: 'María Pérez' })}
                    className="cursor-pointer bg-white dark:bg-background-dark/50 hover:bg-gray-50 dark:hover:bg-gray-800"
                  >
                    <th className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white" scope="row">Matrimonio</th>
                    <td className="px-6 py-4">2025-03-10</td>
                    <td className="px-6 py-4">Iglesia del Carmen</td>
                  </tr>
                </tbody>
              </table>
            </div>
            {selectedPerson && (
              <div className="mt-8 bg-white dark:bg-background-dark/50 rounded-xl shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Editar Persona</h3>
                <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Nombres</label>
                    <input type="text" value={selectedPerson.nombres} onChange={() => {}} className="w-full rounded-lg border border-gray-300 dark:border-gray-700 p-3 bg-background-light dark:bg-background-dark" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Apellidos</label>
                    <input type="text" value={selectedPerson.apellidos} onChange={() => {}} className="w-full rounded-lg border border-gray-300 dark:border-gray-700 p-3 bg-background-light dark:bg-background-dark" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Fecha de Nacimiento</label>
                    <input type="date" value={selectedPerson.fechaNacimiento} onChange={() => {}} className="w-full rounded-lg border border-gray-300 dark:border-gray-700 p-3 bg-background-light dark:bg-background-dark" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Lugar de Nacimiento</label>
                    <input type="text" value={selectedPerson.lugarNacimiento} onChange={() => {}} className="w-full rounded-lg border border-gray-300 dark:border-gray-700 p-3 bg-background-light dark:bg-background-dark" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Padre</label>
                    <input type="text" value={selectedPerson.padre} onChange={() => {}} className="w-full rounded-lg border border-gray-300 dark:border-gray-700 p-3 bg-background-light dark:bg-background-dark" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Madre</label>
                    <input type="text" value={selectedPerson.madre} onChange={() => {}} className="w-full rounded-lg border border-gray-300 dark:border-gray-700 p-3 bg-background-light dark:bg-background-dark" />
                  </div>
                  <div className="mt-4 col-span-2 flex justify-end gap-3">
                    <button type="button" onClick={() => setSelectedPerson(null)} className="px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800/40">Cancelar</button>
                    <button type="submit" className="inline-flex items-center px-5 py-2.5 rounded-lg bg-primary text-white font-medium hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">Guardar Cambios</button>
                  </div>
                </form>
              </div>
            )}
          </div>

          <div className="mt-8 bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-400 dark:border-yellow-500 p-4 rounded-r-lg">
            <div className="flex">
              <span className="material-symbols-outlined text-yellow-400 dark:text-yellow-500">warning</span>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-yellow-800 dark:text-yellow-200">Posibles Duplicados Encontrados</h3>
                <div className="mt-2 text-sm text-yellow-700 dark:text-yellow-300">
                  <div className="flex items-center gap-4 mt-4">
                    <div className="w-12 h-12 rounded-full bg-cover bg-center" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDYcBTrXWIsdp2l4-8KgVeJrDD4QEZ7LPp0U7mjXdAwrHKy_-V2iA4bzeWeTeGeJku_p9REbThgyunAwGsRm7FEtyeCNBmm_t9lFI3HwsBuleTrxnAitLPCQ1dMSyUwlmDRMZlql2CNwWKWLYn1qh_x5p5tiR7SmRttj7HjE6B1CIJxLmJWClIK2oVyjmPNnArv-9ZZ05LRffM3CUVcaFKfoxabNulrEF4HduPEmi06095SIcsfKEXUexAK5YzJtnyzTX3ZZZZBnG0")' }} />
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white">Carlos Mendoza</p>
                      <p className="text-gray-600 dark:text-gray-400">Fecha de Nacimiento: 1990-01-10</p>
                    </div>
                    <button
                      className="ml-auto px-4 py-2 rounded-lg bg-primary text-white text-sm font-medium hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                      onClick={() => setMergeOpen(true)}
                    >
                      Fusionar Registros
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      <DuplicatesMergeModal open={mergeOpen} onClose={() => setMergeOpen(false)} />
    </Layout>
  )
}