import {create} from 'zustand';

type State = {
  id: string;
  name: string;
  speciesId: string;
  avatarUrl: string;
};

type Action = {
  updateId: (id: State['id']) => void;
  updateName: (name: State['name']) => void;
  updateSpeciesId: (name: State['speciesId']) => void;
  updateAvatarUrl: (url: State['avatarUrl']) => void;
  clear: () => void;
};

const useCageRegistrationStore = create<State & Action>(set => ({
  id: '',
  name: '',
  speciesId: '',
  avatarUrl: 'https://image.ckie.store/images/individual-profile.jpeg',
  updateId: id => set({id}),
  updateName: name => set({name}),
  updateSpeciesId: speciesId => set({speciesId}),
  updateAvatarUrl: avatarUrl => set({avatarUrl}),
  clear: () =>
    set({
      id: '',
      name: '',
      speciesId: '',
      avatarUrl: 'https://image.ckie.store/images/individual-profile.jpeg',
    }),
}));

export default useCageRegistrationStore;
