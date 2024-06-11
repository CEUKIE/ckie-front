import {useState} from 'react';

const useTimer = () => {
  const [timerId, setTimerId] = useState<NodeJS.Timeout | null>();

  const startTimer = (ms: number, callback: () => void | Promise<void>) => {
    const id = setTimeout(callback, ms);
    setTimerId(id);
  };

  const clearTimer = () => timerId && clearTimeout(timerId);

  return {startTimer, clearTimer};
};

export default useTimer;
