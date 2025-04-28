export const formatTimeLeft = (endsAt: Date) => {
  const now = new Date();
  const timeLeft = endsAt.getTime() - now.getTime();
  const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));

  if (days <= 0) return "Ending today";
  if (days === 1) return "1 day left";
  return `${days} days left`;
};

export const formatPrice = (price: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
};
