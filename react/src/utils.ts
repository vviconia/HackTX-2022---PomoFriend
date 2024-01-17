export const MS_IN_SECOND = 1000;
export const MS_IN_MINUTE = 60 * MS_IN_SECOND;

export const formatTime = (timeInMs: number): string => {
  const seconds = Math.floor(timeInMs / MS_IN_SECOND) % 60;
  const minutes = Math.floor(timeInMs / MS_IN_MINUTE);

  return `${minutes}`.padStart(2, "0") + ":" + `${seconds}`.padStart(2, "0");
};
