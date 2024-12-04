const axios = require('axios');

const searchAniList = async (req, res) => {
  const { query } = req.query;

  try {
    const response = await axios.post(
      'https://graphql.anilist.co',
      {
        query: `
          query ($search: String) {
            Media(search: $search, type: ANIME) {
              id
              title {
                english
                native
              }
              status
              episodes
              description
            }
          }
        `,
        variables: { search: query },
      }
    );

    res.status(200).json(response.data.data.Media);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { searchAniList };
