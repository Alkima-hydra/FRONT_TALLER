import React, { useState } from 'react';
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
  const [filters, setFilters] = useState({
    fechaInicio: '',
    fechaFin: '',
    sacramentos: []
  });

  // Sacramentos   
  const sacramentosList = [
    'Bautismo',
    'Primera Comunión',
    'Confirmación',
    'Matrimonio'
  ];

  // Datos de KPIs
  const kpiData = {
    personas: 3450,
    sacramentos: 5280,
    parroquias: 8
  };

  // Datos por año
  const timelineData = [
    { periodo: '2020', bautismo: 445, confirmacion: 112, matrimonio: 78, comunion: 332 },
    { periodo: '2021', bautismo: 512, confirmacion: 145, matrimonio: 95, comunion: 378 },
    { periodo: '2022', bautismo: 598, confirmacion: 178, matrimonio: 112, comunion: 421 },
    { periodo: '2023', bautismo: 645, confirmacion: 198, matrimonio: 128, comunion: 465 },
    { periodo: '2024', bautismo: 689, confirmacion: 215, matrimonio: 142, comunion: 502 },
  ];

  // Datos de personas por sacramento
  const personasSacramentoData = [
    { combinacion: 'Solo Bautismo', cantidad: 852, color: SACRAMENTO_COLORS.bautismo, sacramentos: ['bautismo'] },
    { combinacion: 'Bautismo + Comunión', cantidad: 645, color: SACRAMENTO_COLORS.comunion, sacramentos: ['bautismo', 'comunion'] },
    { combinacion: 'Bautismo + Comunión + Confirmación', cantidad: 412, color: SACRAMENTO_COLORS.confirmacion, sacramentos: ['bautismo', 'comunion', 'confirmacion'] },
    { combinacion: 'Todos los Sacramentos', cantidad: 287, color: SACRAMENTO_COLORS.matrimonio, sacramentos: ['bautismo', 'comunion', 'confirmacion', 'matrimonio'] },
    { combinacion: 'Bautismo + Confirmación', cantidad: 198, color: SACRAMENTO_COLORS.bautismo, sacramentos: ['bautismo', 'confirmacion'] },
    { combinacion: 'Solo Matrimonio', cantidad: 156, color: SACRAMENTO_COLORS.matrimonio, sacramentos: ['matrimonio'] },
  ];

  return (
    <Layout title="Dashboard">
      <div className="max-w-7xl mx-auto space-y-8">

        <DashboardFilters
          filters={filters}
          onFilterChange={setFilters}
          sacramentosList={sacramentosList}
        />

        <KPICards 
          personas={kpiData.personas}
          sacramentos={kpiData.sacramentos}
          parroquias={kpiData.parroquias}
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
