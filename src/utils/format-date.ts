export const formatDot = (date: Date) =>
  `${date.getFullYear()}.${date.getMonth() + 1}.${date.getDate()}`;

export const formatKorean = (date: Date) =>
  `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`;
