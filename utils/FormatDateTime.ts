import { format } from 'date-fns';

export const formatDateTime = (isoString: string) => {
  const date = new Date(isoString);
  return format(date, "dd MMMM yyyy | hh:mm a");
};