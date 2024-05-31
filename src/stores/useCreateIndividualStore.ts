import {create} from 'zustand';
import {Gender, IndividualType, WeightUnit} from '../api/types';

type State = {
  name: string;
  avatarUrl: string;
  weight?: number | null;
  weightUnit: WeightUnit;
  gender: Gender;
  hatchedAt?: Date | null;
  speciesId?: string | null;
  memo?: string | null;
  cageId?: string | null;
};

type Action = {
  updateIndividual: <T extends keyof IndividualType.CreateIndividualRequest>(
    key: T,
    value: IndividualType.CreateIndividualRequest[T],
  ) => void;
  clear: () => void;
};

const initialStates: State = {
  name: '',
  avatarUrl: 'https://image.ckie.store/images/individual-profile.jpeg',
  gender: 'FEMALE',
  weightUnit: 'G',
  memo: '',
};

const useCreateIndividualStore = create<State & Action>(set => ({
  ...initialStates,
  updateIndividual: (key, value) =>
    set(state => ({
      ...state,
      [key]: value,
    })),
  clear: () =>
    set(() => ({
      ...initialStates,
    })),
}));

export default useCreateIndividualStore;
