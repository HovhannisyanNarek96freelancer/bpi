import axios from 'axios';

export const fetchBP = async () => {
    const response = await axios.get('https://api.coindesk.com/v1/bpi/currentprice.json');
    return response.data;
};
