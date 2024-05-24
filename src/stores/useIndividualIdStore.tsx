import {create} from 'zustand';

type State = {
  id: string;
};

type Action = {
  updateId: (id: State['id']) => void;
};

const useIndividualIdStore = create<State & Action>(set => ({
  id: '',
  updateId: id => set(() => ({id})),
}));

export default useIndividualIdStore;
