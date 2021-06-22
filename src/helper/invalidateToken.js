async function tokenInvalidated() {
  const authToken = localStorage.getItem("Authorization");
  localStorage.removeItem("Authorization");

  // invalidate authToken with network call
  if (authToken) {
    const url = process.env.REACT_APP_RAILS_API_URL + "/managers/sign_out.json";
    const options = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
        Authorization: authToken,
      },
    };

    const response = await fetch(url, options);
    return response.ok;
  }

  return true;
}

export default tokenInvalidated;
