export async function handler(event, context) {
  const { username, password, setpassword } = event.queryStringParameters;

  if (!username || !password) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Missing username or password' })
    };
  }

  const url = `https://script.google.com/macros/s/AKfycbx538eGHClMVCTC4dwBAgniP8UT7jadzqdZnEsrgbCHnFAVBHKxpolTMXoJfZdpQfMmXw/exec?username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}&setpassword=${setpassword}`;

   try {
    const response = await fetch(url);
    const data = await response.json();  // parse directly as JSON now!

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type'
      },
      body: JSON.stringify(data)
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to fetch or parse from Google Apps Script', details: error.toString() })
    };
  }
}
