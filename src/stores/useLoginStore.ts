import {create} from 'zustand';

type State = {
  isLogined: boolean;
};

type Action = {
  updateIsLogined: (isLogined: State['isLogined']) => void;
};

const useLoginStore = create<State & Action>(set => ({
  isLogined: false,
  updateIsLogined: isLogined => set(() => ({isLogined})),
}));

export default useLoginStore;
