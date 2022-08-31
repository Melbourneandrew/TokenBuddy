const { default: axios } = require("axios");
var FormData = require("form-data");
require("dotenv").config();
const uploadURL = process.env.CLOUDFLARE_UPLOAD_URL;
const token = process.env.CLOUDFLARE_TOKEN;
const deliveryURL = process.env.CLOUDFLARE_DELIVERY_URL;

async function uploadImagesCloudflare(files, uploadName) {
  console.log("Uploading images to cloudflare");
  var cfResponses = [];
  //prepare requests
  for (var i = 0; i < files.length; i++) {
    var form = new FormData();
    form.append(
      "file",
      files[i].buffer,
      `${uploadName}n${i + 1}`
    );
    cfResponses[i] = await axios.post(uploadURL, form, {
      headers: {
        ...form.getHeaders(),
        Authorization:
          "Bearer F6UaZ1aUWIbkWCTKeN_kImyoInHvh1GQPgn92ZPr",
      },
    });
  }
  const imageURLs = cfResponses.map(
    (r) => `${deliveryURL}/${r.data.result.id}/public`
  );
  return imageURLs;
}

module.exports = { uploadImagesCloudflare };
