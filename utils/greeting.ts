export const greeting = () => {
  var d = new Date();
  var time = d.getHours();

  if (time < 12) {
    return "morning";
  }
  if (time >= 12 && time < 18) {
    return "afternoon";
  }
  if (time >= 18) {
    return "evening";
  }
};
