export const fetchCryptoPrices = async (
  symbols: string[] = ["ethereum", "bitcoin"]
) => {
  try {
    const ids = symbols.join(",");
    const response = await fetch(
      `https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd`
    );
    if (!response.ok) throw new Error("Failed to fetch prices");

    const data = await response.json();
    return data; // e.g. { ethereum: { usd: 1882.42 }, bitcoin: { usd: 58000 } }
  } catch (error) {
    console.error("Price fetch error:", error);
    return null;
  }
};
