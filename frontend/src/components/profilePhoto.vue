<template>
  <div class="fileUpload">
    <div v-if="imagePreview || placeholderImage" class="image-preview">
      <!-- Puts a placeholder photo when no photo is chosen/uploaded-->
      <img
        :src="imagePreview || placeholderImage"
        alt="Profile Picture Preview"
        class="rounded-full"
      />
    </div>
    <div class="mt-3">
      <span style="color: #ff0000">
        <!--Handles the file change when the editor chooses a photo, option disabled for viewer users-->
        <input
          type="file"
          @change="handleFileChange"
          accept=".jpg"
          :disabled="user.role === 'viewer'"
        />
      </span>
    </div>
    <div class="flex-1">
      <!--Button to view the chosen photo, will open in new tab, viewer user accessible-->
      <button
        class="bg-red-700 disabled:opacity-50 text-white rounded mr-2 mt-2"
        @click="openImageInIframe"
      >
        View
      </button>
      <!--Button for editors to upload the photo-->
      <button
        class="bg-red-700 disabled:opacity-50 text-white rounded mr-2 mt-2"
        @click="uploadImage"
        :disabled="user.role === 'viewer'"
      >
        Upload
      </button>
      <!--Button for editors to delete the photo-->
      <button
        class="bg-red-700 disabled:opacity-50 text-white rounded ml-2 mt-2"
        @click="clearImage"
        :disabled="user.role === 'viewer'"
      >
        Delete
      </button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { useLoggedInUserStore } from '../store/loggedInUser';
import useVuelidate from '@vuelidate/core';
import { useToast } from 'vue-toastification';
const toast = useToast();
export default {
  props: {
    selectedFile: File,
    phoneNumber: String, // declare phoneNumber as a prop
  },
  setup() {
    // register Vuelidate and loggedIn store
    const v$ = useVuelidate();
    const user = useLoggedInUserStore(); // determines the logged-in user role
    return { v$, user };
  },
  data() {
    return {
      selectedFile: null,
      imagePreview: null,
      placeholderImage: 'https://i.imgur.com/xCvzudW.png', // Placeholder image URL
      iframeUrl: null,
      clientId: null,
      client: null,
    };
  },
  methods: {
    // Method to see if file exists
    async checkFileExistance() {
      this.clientId = this.$route.params.id;
      const clientId = this.clientId;
      const imageUrl = `http://localhost:4000/backend/uploads/${this.clientId}.jpg`;
      console.log(imageUrl);
      try {
        const response = await fetch(imageUrl);
        // Show the profile photo if there is a valid URL
        if (response.ok) {
          this.imagePreview = imageUrl;
          // Otherwise show the placeholder image
        } else {
          this.imagePreview = this.placeholderImage;
        }
      } catch (error) {
        console.error('Error checking file existence:', error);
        this.imagePreview = this.placeholderImage;
      }
    },
    // Method to handle the file change when editor chooses a photo from local machine
    handleFileChange(event) {
      this.$emit('fileChange', event.target.files[0]);
      this.selectedFile = event.target.files[0];
      this.previewImage();
    },
    // Method to handle the upload function when the 'Upload' button is clicked on
    async uploadImage(clientId) {
      console.log('inside upload');
      this.clientId = this.$route.params.id; // Set the client ID

      const newFilename = this.clientId;
      const formData = new FormData();
      formData.append('file', this.selectedFile, newFilename + '.jpg');

      try {
        const res = await axios.post(
          'http://localhost:4000/backend/uploads',
          formData
        );
        console.log(res);
        toast.success(res.data);
        const newImageUrl = `http://localhost:4000/backend/uploads/${newFilename}.jpg`;
        console.log(newImageUrl);
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    },
    previewImage() {
      // Previews photo in the circle
      if (this.selectedFile) {
        const reader = new FileReader();
        reader.onload = () => {
          this.imagePreview = reader.result;
        };
        reader.onerror = (error) => {
          console.error('Error reading image file:', error);
        };
        reader.readAsDataURL(this.selectedFile);
        this.$emit('input', null); // Clear the profile picture URL when a new file is selected
      }
    },
    // deletes the current profile photo for client
    clearImage() {
      //declares the image url to delete backend/uploads/clientId.jpg
      const imageUrlToDelete = `http://localhost:4000/backend/uploads/${this.clientId}.jpg`;

      // if there is no such file, don't do anything
      if (!imageUrlToDelete) {
        return;
      }

      // makes request to the backend to delete file
      axios
        .delete(imageUrlToDelete)
        .then((response) => {
          toast.success(response.data.message);
          console.log('Image deleted successfully', response.data);
        })
        .catch((error) => {
          console.error('Error deleting image:', error);
        })
        .finally(() => {
          this.selectedFile = null;
          this.imagePreview = null;
          this.newImageUrl = null;
          this.$emit('input', null); // Clear the profile picture URL
        });
    },
    openImageInIframe() {
      // Opens uploaded photo in a new tab to see it larger
      if (
        this.imagePreview &&
        typeof this.imagePreview === 'string' &&
        this.imagePreview.length > 0
      ) {
        const newTab = window.open('', '_blank');
        newTab.document.write(
          '<iframe width="100%" height="100%" style="overflow: hidden;" src="' +
            this.imagePreview +
            '"></iframe>'
        );
      } else {
        console.error('Invalid imagePreview URL');
      }
    },
  },

  created() {
    this.checkFileExistance(this.clientId);
  },
};
</script>
