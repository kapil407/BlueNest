export const formatMessageTime = (createdAt) => {
  if (!createdAt) return "";

  const d = new Date(createdAt);
  if (isNaN(d.getTime())) return "";

  return d.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
};
