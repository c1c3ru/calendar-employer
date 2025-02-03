export const generateRandomTime = (
  startHour: number,
  startMinute: number,
  endHour: number,
  endMinute: number
): string => {
  const startTotal = startHour * 60 + startMinute;
  const endTotal = endHour * 60 + endMinute;
  
  if (startTotal === endTotal) {
    return `${startHour.toString().padStart(2, '0')}:${startMinute.toString().padStart(2, '0')}`;
  }

  const randomMinutes = Math.floor(Math.random() * (endTotal - startTotal + 1)) + startTotal;
  
  const hours = Math.floor(randomMinutes / 60);
  const minutes = randomMinutes % 60;
  
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
};