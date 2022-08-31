<template>
  <div class="new-pfp">
    <h2>Upload a photo for your profile</h2>
    <label class="custom-file-upload">
      <input
        style="display: none"
        type="file"
        @change="previewMedia"
      />
      <UploadIcon class="upload-icon" :size="45"></UploadIcon>
      <p>Select photo</p>
    </label>
    <div class="pfp-preview" v-if="fileSelected">
      <p>Preview:</p>
      <div class="image-cropper big">
        <img :src="pfpPreview" class="horizontal center" />
      </div>
      <button v-touch class="upload-btn" @click="upload">
        <p>Upload Picture</p>
      </button>
    </div>
    <div v-if="showLoadingWheel" class="lds-dual-ring"></div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import UploadIcon from "../components/icons/UploadIcon.vue";
import getStoredLoginToken from "../methods/get/getStoredLoginToken";
import storePfp from "../methods/store/storePfp";
import uploadPfp from "../methods/uploadPfp";
import {useRouter} from "vue-router"

const router = useRouter();
var pfpFile;
const fileSelected = ref(false);
const pfpPreview = ref();
const showLoadingWheel = ref(false);

async function upload() {
  console.log("Uploading pfp...")
  showLoadingWheel.value = true;
  const formData = new FormData();
  formData.append("pfp", pfpFile);
  const authToken = await getStoredLoginToken();
  const uploadResponse = await uploadPfp(formData, authToken);
  if (uploadResponse.status == 200) {
    console.log("Profile pic uploaded successfully");
    console.log(uploadResponse);
    storePfp(uploadResponse.data.link)
    return router.push({ path: "/profile" });
  }
}
function previewMedia(event) {
  console.log("Media uploaded");
  const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
  const file = event.target.files[0];
  if (!allowedTypes.includes(file.type)) {
    console.log("Invalid file type");
    return;
  }
  if (file.size > 12000000) {
    console.log("File too large. Max 12mb");
    showFileTooLargeError.value = true;
    return;
  }
  pfpPreview.value = URL.createObjectURL(file);
  fileSelected.value = true;
  pfpFile = file;
}
</script>

<style scoped>
.new-pfp {
  display: flex;
  flex-direction: column;
  width: 100%;
}
.custom-file-upload {
  display: flex;
  flex-direction: column;
  width: 150px;
  height: 150px;
  border: 2px solid black;
  border-radius: 10px;
  margin: auto;
}
.upload-icon {
  margin: auto;
  margin-top: 25px;
  margin-bottom: 10px;
}
.pfp-preview {
  width: fit-content;
  margin: auto;
  margin-top: 50px;
}
.image-cropper.big {
  width: 150px;
  height: 253px;
  position: relative;
  overflow: hidden;
  border-radius: 50%/30%;
  margin: auto;
  margin-top: 10px;
  /* border: 2px solid #f00; */
}
/* Common img styles in web dev environments */
img {
  height: auto;
  max-width: 100%;
}
.avatar {
  vertical-align: middle;
  width: 65px;
  height: 65px;
  border-radius: 50%;
}
/* Center image inside of parent */
img.center {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
/* For horizontal rectangles */
img.horizontal {
  height: 100%;
  width: auto;
  max-width: 9999px; /* max-content fall back */
  max-width: max-content;
}
</style>
