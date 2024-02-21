import axios from 'axios';
export const API = {
  registerAgent: async (symbol, faction) => {
    const res = await axios.post(
      'https://api.spacetraders.io/v2/register',
      JSON.stringify({symbol, faction}),
     {
       headers: { 'Content-Type': 'application/json' }
     } 
    );

    return res?.data?.data || res.data || res;
  },
};
