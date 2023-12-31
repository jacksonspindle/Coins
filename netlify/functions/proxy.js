const axios = require("axios");

exports.handler = async function (event, context) {
  const { imageUrl } = event.queryStringParameters;
  if (!imageUrl) {
    return {
      statusCode: 400,
      body: "No image URL provided",
    };
  }

  try {
    const response = await axios.get(imageUrl, {
      responseType: "arraybuffer",
    });

    return {
      statusCode: 200,
      body: Buffer.from(response.data).toString("base64"),
      headers: {
        "Content-Type": "image/png", // Adjust based on the image type
        "Content-Disposition": "inline",
        "Access-Control-Allow-Origin": "*", // Add this line
      },
      isBase64Encoded: true,
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: "Internal Server Error: " + error.message,
    };
  }
};
