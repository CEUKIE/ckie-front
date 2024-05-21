interface Record {
  name: string;
  color: string;
  memo?: string;
}

interface Plan {
  target: string;
  record: Record[];
}

export const plans: Plan[] = [
  {
    target: '2024-04-20',
    record: [
      {name: '피딩', color: '#DDFFE1', memo: '안녕'},
      {name: '응가', color: '#DEDDFF', memo: '안녕'},
      {name: '줌', color: '#FFDDE0', memo: '안녕'},
    ],
  },
  {
    target: '2024-05-25',
    record: [
      {name: '피딩', color: '#DDFFE1', memo: '안녕'},
      {name: '응가', color: '#DEDDFF', memo: '안녕'},
    ],
  },
  {
    target: '2024-05-29',
    record: [
      {name: '피딩', color: '#DDFFE1', memo: '안녕'},
      {name: '줌', color: '#FFDDE0', memo: '안녕'},
    ],
  },
];
