const SERVER_URL = process.env.REACT_APP_SERVER_URL;

async function httpGetPlanets() {
  const response = await fetch(`${SERVER_URL}/planets`);
  return response.json();
}

async function httpGetLaunches() {
  const response = await fetch(`${SERVER_URL}/launches`);
  const fetchedLaunches = await response.json();
  return fetchedLaunches.sort((a, b) => {
    return a.flightNumber - b.flightNumber;
  })
}

async function httpSubmitLaunch(launch) {
  try {
    return await fetch(`${SERVER_URL}/launches`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(launch)
    });
  } catch (error) {
    return {
      ok: false,
    }
  }
}

async function httpAbortLaunch(id) {
  try{
    return await fetch(`${SERVER_URL}/launches/${id}`, {
      method: "delete",
    });
  } catch(err) {
    console.log(err);
    return {
      ok:false,
    }
  }
}

export {
  httpGetPlanets,
  httpGetLaunches,
  httpSubmitLaunch,
  httpAbortLaunch,
};