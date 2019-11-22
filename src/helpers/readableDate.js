export const readableDate = unixTime => {
  const rawDate = new Date(unixTime);
  const day = rawDate.getDate();
  const month = rawDate.getMonth();
  const year = rawDate
    .getFullYear()
    .toString()
    .slice(2);
  return `${day}/${month}/${year}`;
};

export default readableDate;
