export async function handler(event, context) {
  const { username, password, setpassword } = event.queryStringParameters;

  if (!username || !password) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Missing username or password' })
    };
  }

  const url = `https://script.google.com/macros/s/AKfycbyddGzZFn986Op3g5Bn-CeIlkR-7puveZeDeuVjQfeUZgh1UaxJCF09NkN2_atmjxmkUQ/exec?username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}&setpassword=${setpassword}`;

  try {
    const response = await fetch(url);
    const text = await response.text();

    // Attempt to parse <pre> wrapped JSON
    const jsonMatch = text.match(/<pre>([\s\S]*)<\/pre>/);
    let data;

    if (jsonMatch && jsonMatch[1]) {
      data = JSON.parse(jsonMatch[1]);
    } else {
      // fallback if response was plain JSON
      data = JSON.parse(text);
    }

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

