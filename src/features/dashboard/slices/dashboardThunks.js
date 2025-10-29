import { createAsyncThunk } from '@reduxjs/toolkit';
import { dashboardApi } from '../../../lib/api';
import { setLoading, setTotales } from '../slices/dashboardSlice';

export const fetchDashboardStats = createAsyncThunk(
  'dashboard/fetchStats',
  async (filters, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setLoading());
      const data = await dashboardApi.fetchStats(filters);
      dispatch(setTotales(data));
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);