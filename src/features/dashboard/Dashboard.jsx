import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDashboardStats } from './slices/dashboardThunks';
import {
  selectKPIs,
  selectTimeline,
  selectCombinaciones,
  selectIsLoading
} from './slices/dashboardSlice';

import KPICards from './components/KPICards';
import DashboardFilters from './components/DashboardFilters';
import SacramentosTimeline from './components/SacramentosTimeline';
import PersonasPorSacramento from './components/PersonasPorSacramento';
import Layout from '../../shared/components/layout/Layout';

const SACRAMENTO_COLORS = {
  bautismo: '#0f49bd',
  confirmacion: '#c99c33',
  matrimonio: '#10b981',
  comunion: '#8b5cf6'
};

export default function Dashboard() {
  const dispatch = useDispatch();
  const { personas, sacramentos, parroquias } = useSelector(selectKPIs);
  const timelineData = useSelector(selectTimeline);
  const personasSacramentoData = useSelector(selectCombinaciones);
  const isLoading = useSelector(selectIsLoading);

  const [filters, setFilters] = React.useState({
    fechaInicio: '',
    fechaFin: '',
    sacramentos: []
  });

  const sacramentosList = [
    'Bautismo',
    'Primera Comunión',
    'Confirmación',
    'Matrimonio'
  ];

  useEffect(() => {
    const params = {};
    if (filters.fechaInicio) params.fechaInicio = filters.fechaInicio;
    if (filters.fechaFin) params.fechaFin = filters.fechaFin;
    if (filters.sacramentos.length > 0) {
      params.sacramentos = filters.sacramentos; // axios lo convierte en sacramentos[]
    }

    dispatch(fetchDashboardStats(params));
  }, [filters, dispatch]);

  if (isLoading) {
    return <Layout title="Dashboard"><div>Cargando...</div></Layout>;
  }

  return (
    <Layout title="Dashboard">
      <div className="max-w-7xl mx-auto space-y-8">

        <DashboardFilters
          filters={filters}
          onFilterChange={setFilters}
          sacramentosList={sacramentosList}
        />

        <KPICards 
          personas={personas}
          sacramentos={sacramentos}
          parroquias={parroquias}
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="lg:col-span-2">
            <SacramentosTimeline data={timelineData} />
          </div>

          <div className="lg:col-span-2">
            <PersonasPorSacramento data={personasSacramentoData} />
          </div>
        </div>
      </div>
    </Layout>
  );
}
