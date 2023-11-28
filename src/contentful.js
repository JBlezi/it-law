import { createClient } from 'contentful';


const client = createClient({
  space: 'mkun3ldptcy3',
  accessToken: 'YTl7TJpfiW108aEjrJ94I2GuHXqeMw63RTG0TZMBsLE'
});

export const fetchBlogPosts = async (locale = 'en-US') => {
  try {
    const response = await client.getEntries({
      content_type: 'blogPost',
      locale: locale, // Add locale parameter
    });
    return response.items;
  } catch (error) {
    console.error("Error fetching blog posts", error);
    return [];
  }
};

export const getLocalizedEntry = (entryId, locale) => {
  return client.getEntry(entryId, {
    locale: locale
  });
}

export const fetchPost = async (entryId, locale = 'en-US') => {
  try {
    return await client.getEntry(entryId, {
      locale: locale
    });
  } catch (error) {
    console.error("Error fetching blog post", error);
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
