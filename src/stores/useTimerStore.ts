import {create} from 'zustand';

type State = {
  timer: number;
};

type Action = {
  updateTimer: (timer: State['timer']) => void;
  decrementTime: () => void;
};

const useTimerStore = create<State & Action>(set => ({
  timer: 5,
  updateTimer: timer => set(() => ({timer})),
  decrementTime: () =>
    set(state => ({timer: state.timer > 0 ? state.timer - 1 : 5})),
}));

export default useTimerStore;
