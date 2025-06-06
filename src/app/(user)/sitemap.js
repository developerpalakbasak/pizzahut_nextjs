import axios from "axios";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

export default async function sitemap() {
  // Fetch pizzas from the backend
  const fetchPizzas = async () => {
    try {
      const response = await axios.get(`${siteUrl}/api/pizza`);
      return response.data.allPizza;
    } catch (error) {
      console.error("Error fetching pizzas:", error.message);
      return [];
    }
  };

  const pizzas = await fetchPizzas();

  // Generate the sitemap entries for pizzas
  const pizzaEntries = pizzas.map((pizza) => ({
    url: `${siteUrl}/pizza/${pizza._id}`, // Using MongoDB _id
    lastModified: new Date(pizza.date).toISOString(),
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  // Static pages
  const staticPages = [
    {
      url: siteUrl,
      lastModified: new Date().toISOString(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    // Add more static pages if needed
  ];

  return [...staticPages, ...pizzaEntries];
}

export const dynamic = 'force-dynamic';