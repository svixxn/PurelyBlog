const dateParse = (date: string) =>
  new Date(date).toLocaleString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    // hour: "numeric",
    // minute: "numeric",
  });
export default dateParse;
