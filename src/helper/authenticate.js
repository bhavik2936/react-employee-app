async function isAuthenticated(makeNetworkCall) {
  const authToken = localStorage.getItem("Authorization");

  // verify authToken via network call
  if (authToken && makeNetworkCall) {
    const url =
      process.env.REACT_APP_RAILS_API_URL + "/managers/authenticate.json";
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
        Authorization: authToken,
      },
    };

    const response = await fetch(url, options);
    return response.ok;
  }

  return Boolean(authToken);
}

export default isAuthenticated;
