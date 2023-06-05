import axios from "axios";

export const getUserById = (url) => axios.get(url).then((res) => res.data.data);

export const getQuotes = async (quoteString) => {
  // const url = `/finance/quote?symbols=${quoteString}`;
  const stocksResponse = await axios({
    method: "GET",
    url: "/yahooapi/quote",
    params: {
      symbols: quoteString,
    },
  });

  console.log("request", stocksResponse);
  return await await stocksResponse.data.data;
};
