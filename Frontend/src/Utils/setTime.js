export const formatMessageTime = (createdAt) => {
  if (!createdAt) return "";

  const d = new Date(createdAt);
  if (isNaN(d.getTime())) return "";

  return d.toLocaleString("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
};
