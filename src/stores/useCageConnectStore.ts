import {Device} from 'react-native-ble-plx';
import {create} from 'zustand';

type PairingStatus = 'IDLE' | 'START' | 'FAIL' | 'CONNECTED' | 'DISCONNECTED';

type State = {
  device: Device | null;
  pairingStatus: PairingStatus;
  wifiId: string;
  wifiPw: string;
  minTemp: number;
  maxTemp: number;
  minHumidity: number;
  maxHumidity: number;
};

type Action = {
  updateCage: <T extends keyof State>(key: T, value: State[T]) => void;
};

const useCageConnectStore = create<State & Action>(set => ({
  device: null,
  pairingStatus: 'IDLE',
  wifiId: '',
  wifiPw: '',
  minTemp: 0,
  maxTemp: 0,
  minHumidity: 0,
  maxHumidity: 0,
  updateCage: (key, value) =>
    set(state => ({
      ...state,
      [key]: value,
    })),
}));

export default useCageConnectStore;
