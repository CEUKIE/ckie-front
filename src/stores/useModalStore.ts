import {create} from 'zustand';

type State = {
  isFeedingModalVisible: boolean;
  isWeightModalVisible: boolean;
  isMoltingModalVisible: boolean;
  isMemoModalVisible: boolean;
};

type Action = {
  setFeedingModalVisible: (visible: State['isFeedingModalVisible']) => void;
  setWeightModalVisible: (visible: State['isFeedingModalVisible']) => void;
  setMoltingModalVisible: (visible: State['isFeedingModalVisible']) => void;
  setMemoModalVisible: (visible: State['isFeedingModalVisible']) => void;
};

const useModalStore = create<State & Action>(set => ({
  isFeedingModalVisible: false,
  isWeightModalVisible: false,
  isMoltingModalVisible: false,
  isMemoModalVisible: false,
  setFeedingModalVisible: visible => set({isFeedingModalVisible: visible}),
  setWeightModalVisible: visible => set({isWeightModalVisible: visible}),
  setMoltingModalVisible: visible => set({isMoltingModalVisible: visible}),
  setMemoModalVisible: visible => set({isMemoModalVisible: visible}),
}));

export default useModalStore;
