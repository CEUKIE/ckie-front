import {create} from 'zustand';

type State = {
  name: string;
  speciesId: string;
};

type Action = {
  updateName: (name: State['name']) => void;
  updateSpeciesId: (name: State['speciesId']) => void;
};

const useCageRegistrationStore = create<State & Action>(set => ({
  name: '',
  speciesId: '',
  updateName: name => set({name}),
  updateSpeciesId: speciesId => set({speciesId}),
}));

export default useCageRegistrationStore;
