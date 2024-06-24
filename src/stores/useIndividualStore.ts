import {create} from 'zustand';
import {Gender, WeightUnit} from '../api/types';

type State = {
  id: string;
  name: string;
  avatarUrl: string;
  gender: Gender;
  hatchedAt?: string | null;
  memo?: string | null;
  weight: number;
  weightUnit: WeightUnit;
};

type Action = {
  updateIndividual: (individual: State) => void;
};

const useIndividualStore = create<State & Action>(set => ({
  id: '',
  name: '',
  avatarUrl: '',
  gender: 'FEMALE',
  hatchedAt: '',
  memo: '',
  weight: 0,
  weightUnit: 'G',
  updateIndividual: individual => set(() => individual),
}));

export default useIndividualStore;
