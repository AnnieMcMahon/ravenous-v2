export interface yelpBusinessInfo {
  id: string;
  name: string;
  image_url: string;
  url: string;
  rating: number;
  review_count: number;
  location: {
    display_address: string[];
  };
  categories: { title: string }[];
};

export interface appBusinessInfo {
  id: string;
  name: string;
  img: string;
  url: string;
  rating: number;
  reviews: number;
  address: string;
  category: string;
};


