import axios from "axios";

export const getUserById = (url) => axios.get(url).then((res) => res.data.data);

export const getQuotes = async (quoteString) => {
  // const url = `/finance/quote?symbols=${quoteString}`;
  const stocksResponse = await axios({
    baseURL: process.env.NEXT_PUBLIC_IMAGE_SERVER,
    method: "GET",
    url: "/yahooapi/quotes",
    params: {
      symbols: quoteString,
    },
  });

  console.log("request", stocksResponse);
  return await await stocksResponse.data.data;
};
