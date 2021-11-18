const fs = require('fs');
const sort = require('lodash/sortBy');
const queryString = require('querystring');
const axios = require('axios');
const FormData = require('form-data');
const { newModels } = require('../sequelize');

const API_BASE_URL = 'https://api.spacenextdoor.com';
const TOKEN = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjo4MTUsInJvbGVzIjpbIkNVU1RPTUVSIiwiUFJPVklERVIiXSwiaWF0IjoxNjE2NTE2MDM1LCJleHAiOjE2MTcxMjA4MzV9.-jGGP-j-mnm-z7JOeNSqVm0rEaIt1Z5ul5x2c7hZKbI';

(async () => {
  // Get all directories with site id
  console.log('[i] Reading images directory....');
  const directories = sort(fs.readdirSync('./images'));
  console.log(`[i] Found ${directories.length} images directories....`);
  console.log(directories);
  for (const dir of directories) {
    try {
      if (dir === '.DS_Store') {
        continue;
      }

      // loop over and upload them 
      console.log(`[i] Reading images of ${dir} directory....`);
      const images = fs.readdirSync(`./images/${dir}`);
  
      console.log(` [i] Found ${images.length} images inside ${dir} directory....`);
  
      const query = queryString.stringify({
        uploadType: 'site',
        compressImage: true,
        resizeWidth: 2200,
      });
      const url = `${API_BASE_URL}/media/upload_images?${query}`;
  
      console.log(` [i] Uploading ${images.length} images to media API....`);
      const sortedImages = sort(images).filter(s => s !== '.DS_Store');
      const result = [];

      for (const img of sortedImages) {
        const form = new FormData();
        // Second argument  can take Buffer or Stream (lazily read during the request) too.
        // Third argument is filename if you want to simulate a file upload. Otherwise omit.
        form.append('files', fs.createReadStream(`./images/${dir}/${img}`));
  
        const data = await axios.post(url, form, {
          headers: {
            ...form.getHeaders(),
            Authorization: TOKEN,
          },
        });
  
        if (data.data?.files?.[0]?.error) {
          console.log(` [e] Error occurred while uploading ${img} for dir: ${dir}`);
          return null;
        }
  
        result.push(`${data?.data?.bucketUrl}/${data.data?.files?.[0]?.key}`);
      }
  
      console.log(` [i] Uploaded ${images.length} images to media API....`);
  
      console.log(` [i] Saving images to Site ${dir}....`);
      await newModels.sites.update({ images: result.filter((s) => !!s) }, {where: { id: parseInt(dir, 10)}});
      console.log(` [i] Done!`);
    } catch (e) {
      console.log(` [e] Error occurred while migrating images for Site ${dir}`)
    }
  }

  console.log(`[i] All Done!`);
  process.exit(1);
})();