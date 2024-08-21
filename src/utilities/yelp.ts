import { yelpBusinessInfo, appBusinessInfo } from "./interfaces";

const apiKey = import.meta.env.VITE_API_KEY;

if (!apiKey) {
  console.error('API key is missing.');
}

const cors = "https://cors-anywhere.herokuapp.com/";
const baseUrl = "https://api.yelp.com/v3";
const searchEndpoint = "/businesses/search";

const getSuggestions = async (
  keyword: string,
  location: string,
  sort: string
) => {
  const endpoint = `${cors}${baseUrl}${searchEndpoint}?term=${keyword}&location=${location}&sort_by=${sort}`;

  try {
    const response = await fetch(endpoint, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    });

    if (response.ok) {
      const jsonResponse = await response.json();
      const results: appBusinessInfo[] = jsonResponse.businesses.map(
        (business: yelpBusinessInfo) => ({
          id: business.id,
          name: business.name,
          img: business.image_url,
          url: business.url,
          rating: business.rating,
          reviews: business.review_count,
          address: business.location.display_address.join(", "),
          category:
            business.categories.length > 0
              ? business.categories[0].title
              : "Uncategorized",
        })
      );
      return results;
    } else {
      console.error("Error fetching data:", response.statusText);
      return [];
    }
  } catch (error) {
    console.error("Error:", error);
    return [];
  }
};

export default getSuggestions;
