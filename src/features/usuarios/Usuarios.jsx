import { useState } from 'react'
import Layout from '../../shared/components/layout/Layout';

export default function Usuarios() {
  const [activeTab, setActiveTab] = useState('agregar')
  const [selectedUser, setSelectedUser] = useState(null)

  // ===== activos para preparar consumo de API (sin endpoints aún) =====
  const [formAdd, setFormAdd] = useState({
    nombre: '',
    email: '',
    rol: '',
    activo: '',
  })

  const [filters, setFilters] = useState({
    nombre: '',
    email: '',
    rol: '',
    activo: '',
  })

  const [users, setUsers] = useState([]) // lista de resultados
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)

  // ===== Handlers vacíos (listos para cablear luego) =====
  const handleCreate = (e) => {
    e.preventDefault()
    // TODO: conectar POST /usuarios
  }

  const handleSearch = (e) => {
    e.preventDefault()
    // TODO: conectar GET /usuarios con filtros
    setLoading(true)
    // por ahora, no hacemos nada; al integrar, llenar setUsers([...])
    setLoading(false)
    setSelectedUser(null)
  }

  const handleResetAdd = () => {
    setFormAdd({ nombre: '', email: '', rol: '', activo: '' })
  }

  const handleResetSearch = () => {
    setFilters({ nombre: '', email: '', rol: '', activo: '' })
    setUsers([])
  }

  const handleUpdate = (e) => {
    e.preventDefault()
    if (!selectedUser) return
    // TODO: conectar PUT /usuarios/:id
  }

  return (
    <Layout title="Gestión de Usuarios">
      <div className="space-y-8">
        {/* Tabs estilo carpeta */}
          <div className="flex gap-1 mb-6 border-b border-gray-200 dark:border-gray-700">
            <button
              onClick={() => setActiveTab('agregar')}
              className={`px-5 py-2 text-sm font-medium rounded-t-lg border transition-colors focus:outline-none ${
                activeTab === 'agregar'
            ? 'bg-white dark:bg-background-dark text-primary border-gray-200 dark:border-gray-700 border-b-transparent -mb-px'
            : 'bg-gray-50 dark:bg-gray-800/40 text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white border-transparent'
              }`}
            >
              Agregar Usuario
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

          {activeTab === 'agregar' && (
            <div className="bg-white dark:bg-background-dark p-6 rounded-xl shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Agregar Usuario</h3>
              <form className="grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={handleCreate}>
                <div>
            <label htmlFor="a-name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Nombre</label>
            <input
              id="a-name"
              type="text"
              placeholder="Nombre completo"
              className="bg-background-light dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5"
              value={formAdd.nombre}
              onChange={(e)=>setFormAdd({ ...formAdd, nombre: e.target.value })}
            />
                </div>
                <div>
            <label htmlFor="a-email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Email</label>
            <input
              id="a-email"
              type="email"
              placeholder="correo@dominio.com"
              className="bg-background-light dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5"
              value={formAdd.email}
              onChange={(e)=>setFormAdd({ ...formAdd, email: e.target.value })}
            />
                </div>
                <div>
            <label htmlFor="a-role" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Rol</label>
            <select
              id="a-role"
              className="bg-background-light dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5"
              value={formAdd.rol}
              onChange={(e)=>setFormAdd({ ...formAdd, rol: e.target.value })}
            >
              <option value="">Seleccione</option>
              <option value="Administrador">Administrador</option>
              <option value="Consultor">Consultor</option>
            </select>
                </div>
                <div>
            <label htmlFor="a-status" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Estado</label>
            <select
              id="a-status"
              className="bg-background-light dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5"
              value={formAdd.activo === '' ? '' : String(formAdd.activo)}
              onChange={(e)=>{
                const val = e.target.value === '' ? '' : (e.target.value === 'true');
                setFormAdd({ ...formAdd, activo: val })
              }}
            >
              <option value="">Seleccione</option>
              <option value="true">Activo</option>
              <option value="false">Inactivo</option>
            </select>
                </div>
                <div className="md:col-span-2 mt-2 flex gap-3">
            <button type="submit" className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90">Crear Usuario</button>
            <button type="reset" className="px-6 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600" onClick={handleResetAdd}>Limpiar</button>
                </div>
              </form>
            </div>
          )}

          {activeTab === 'buscar' && (
            <>
              {/* Filtros de búsqueda */}
                    <div className="bg-white dark:bg-background-dark p-6 rounded-xl shadow-sm mb-6">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Buscar Usuario</h3>
                      <form className="grid grid-cols-1 md:grid-cols-4 gap-6" onSubmit={handleSearch}>
                      <div>
                        <label className="block text-sm font-medium text-gray-900 dark:text-gray-300 mb-2" htmlFor="f-name">Nombre</label>
                        <input
                        id="f-name"
                        type="text"
                        placeholder="Nombre"
                        className="bg-background-light dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5"
                        value={filters.nombre}
                        onChange={(e)=>setFilters({ ...filters, nombre: e.target.value })}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-900 dark:text-gray-300 mb-2" htmlFor="f-email">Email</label>
                        <input
                        id="f-email"
                        type="email"
                        placeholder="correo@dominio.com"
                        className="bg-background-light dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5"
                        value={filters.email}
                        onChange={(e)=>setFilters({ ...filters, email: e.target.value })}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-900 dark:text-gray-300 mb-2" htmlFor="f-role">Rol</label>
                        <select
                        id="f-role"
                        className="bg-background-light dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5"
                        value={filters.rol}
                        onChange={(e)=>setFilters({ ...filters, rol: e.target.value })}
                        >
                        <option value="">Todos</option>
                        <option value="Administrador">Administrador</option>
                        <option value="Consultor">Consultor</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-900 dark:text-gray-300 mb-2" htmlFor="f-status">Estado</label>
                        <select
                        id="f-status"
                        className="bg-background-light dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5"
                        value={filters.activo === '' ? '' : String(filters.activo)}
                        onChange={(e)=>{
                          const val = e.target.value === '' ? '' : (e.target.value === 'true');
                          setFilters({ ...filters, activo: val })
                        }}
                        >
                        <option value="">Todos</option>
                        <option value="true">Activo</option>
                        <option value="false">Inactivo</option>
                        </select>
                      </div>
                      <div className="md:col-span-4 flex gap-3">
                        <button type="submit" className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90">Buscar</button>
                        <button type="reset" className="px-6 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600" onClick={handleResetSearch}>Limpiar</button>
                      </div>
                      </form>
                    </div>

                    {/* Resultados */}
            <div className="bg-white dark:bg-background-dark p-6 rounded-xl shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                  <thead className="text-xs text-gray-700 dark:text-gray-300 uppercase bg-gray-50 dark:bg-gray-700/50">
                    <tr>
                      <th scope="col" className="px-6 py-3">Nombre</th>
                      <th scope="col" className="px-6 py-3">Email</th>
                      <th scope="col" className="px-6 py-3">Rol</th>
                      <th scope="col" className="px-6 py-3">Estado</th>
                      <th scope="col" className="px-6 py-3 text-right">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {loading && (
                      <tr><td className="px-6 py-4" colSpan={5}>Cargando...</td></tr>
                    )}
                    {!loading && users.length === 0 && (
                      <tr><td className="px-6 py-4" colSpan={5}>Sin resultados</td></tr>
                    )}
                    {!loading && users.map((u) => (
                      <tr
                        key={u.id}
                        onClick={() => setSelectedUser({ ...u })}
                        className="cursor-pointer bg-white dark:bg-background-dark border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
                      >
                        <td className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">{u.nombre}</td>
                        <td className="px-6 py-4">{u.email}</td>
                        <td className="px-6 py-4"><span className="bg-primary/10 text-primary text-xs font-medium px-2.5 py-0.5 rounded-full">{u.rol}</span></td>
                        <td className="px-6 py-4">
                          {u.activo === 'Activo' ? (
                            <span className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300 text-xs font-medium px-2.5 py-0.5 rounded-full">Activo</span>
                          ) : (
                            <span className="bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-300 text-xs font-medium px-2.5 py-0.5 rounded-full">Inactivo</span>
                          )}
                        </td>
                        <td className="px-6 py-4 text-right"><button className="font-medium text-primary hover:underline">Editar</button></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {selectedUser && (
              <div className="grid grid-cols-1 md:grid-cols-1 gap-8 mt-8">
                <div className="bg-white dark:bg-background-dark p-6 rounded-xl shadow-sm">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Editar Usuario</h3>
                  <form className="space-y-4" onSubmit={handleUpdate}>
                    <div>
                      <label htmlFor="e-name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Nombre</label>
                      <input
                        id="e-name"
                        type="text"
                        value={selectedUser.nombre || ''}
                        onChange={(e)=>setSelectedUser({ ...selectedUser, nombre: e.target.value })}
                        className="bg-background-light dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5"
                      />
                    </div>
                    <div>
                      <label htmlFor="e-email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Email</label>
                      <input
                        id="e-email"
                        type="email"
                        value={selectedUser.email || ''}
                        onChange={(e)=>setSelectedUser({ ...selectedUser, email: e.target.value })}
                        className="bg-background-light dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5"
                      />
                    </div>
                    <div>
                      <label htmlFor="e-role" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Rol</label>
                      <select
                        id="e-role"
                        value={selectedUser.rol || ''}
                        onChange={(e)=>setSelectedUser({ ...selectedUser, rol: e.target.value })}
                        className="bg-background-light dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5"
                      >
                        <option value="Administrador">Administrador</option>
                        <option value="Consultor">Consultor</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="e-status" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Estado</label>
                      <select
                        id="e-status"
                        value={selectedUser.activo || ''}
                        onChange={(e)=>setSelectedUser({ ...selectedUser, activo: e.target.value })}
                        className="bg-background-light dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5"
                      >
                        <option value="Activo">Activo</option>
                        <option value="Inactivo">Inactivo</option>
                      </select>
                    </div>
                    <div className="flex justify-end gap-4 pt-2">
                      <button type="button" onClick={() => setSelectedUser(null)} className="px-6 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600">Cancelar</button>
                      <button type="submit" className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90">Guardar Cambios</button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </Layout>
  )
}
