import axios from 'axios';

async function getData(userId) {
  try {
    const userResponse = await axios.get(`https://jsonplaceholder.typicode.com/users/${userId}`);
    const userData = userResponse.data;

    const postsResponse = await axios.get(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`);
    const userPosts = postsResponse.data;

    const combinedData = {
      id: userData.id,
      name: userData.name,
      username: userData.username,
      email: userData.email,
      address: userData.address,
      phone: userData.phone,
      website: userData.website,
      company: userData.company,
      posts: userPosts,
    };

    return combinedData;
  } catch (error) {
    throw new Error('Veri alınamadı: ' + error.message);
  }
}

export default getData;