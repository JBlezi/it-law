import { createClient } from 'contentful';


const client = createClient({
  space: 'mkun3ldptcy3',
  accessToken: 'YTl7TJpfiW108aEjrJ94I2GuHXqeMw63RTG0TZMBsLE'
});

export const fetchBlogPosts = async () => {
  try {
    const response = await client.getEntries({
      content_type: 'blogPost', // Replace with your content type ID
      // Add other options if needed (ordering, limit, etc.)
    });
    return response.items;
  } catch (error) {
    console.error("Error fetching blog posts", error);
    return [];
  }
};

export const fetchSocial = async () => {
  try {
    const response = await client.getEntries({
      content_type: 'socialMedia', // Replace with your content type ID
    });
    return response.items;
  } catch (error) {
    console.error("Error fetching Social Media", error);
    return [];
  }
};


export default client;
