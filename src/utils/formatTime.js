export default function formatTime(duration) {
  const hours = Math.floor(duration / 3600);
  const minutes = Math.floor((duration % 3600) / 60);
  const remainderSeconds = duration % 60;
  const formatTime =
    duration === undefined
      ? ""
      : hours <= 1
      ? `${minutes}:${remainderSeconds < 10 ? "0" : ""}${remainderSeconds}`
      : `${hours}:${minutes}:${
          remainderSeconds < 10 ? "0" : ""
        }${remainderSeconds}`;

  return formatTime;
}
