import {create} from 'zustand';

export interface WeightRecord {
  targetDate: Date;
  weight: number;
}

type State = {
  weightUnit: 'g' | 'kg';
  weightRecords: WeightRecord[];
};

type Action = {
  updateWeightUnit: (weightUnit: State['weightUnit']) => void;
  updateWeightRecords: (weightRecords: State['weightRecords']) => void;
};

const useWeightRecordsStore = create<State & Action>(set => ({
  weightUnit: 'g',
  weightRecords: [],
  updateWeightUnit: weightUnit => set(() => ({weightUnit})),
  updateWeightRecords: weightRecords => set(() => ({weightRecords})),
}));

export default useWeightRecordsStore;
