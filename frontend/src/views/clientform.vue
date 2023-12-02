<!-- This view allows a user to create client information. -->
<template>
  <main>
    <!--Header-->
    <h1
      class="font-bold text-4xl text-red-700 tracking-widest text-center mt-10"
    >
      Client Intake Form
    </h1>
    <div class="px-10 py-20">
      <!-- form field -->
      <!-- @submit.prevent stops the submit event from reloading the page-->
      <form @submit.prevent="submitForm">
        <!-- grid container -->
        <div
          class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10"
        >
          <h2 class="text-2xl font-bold">Personal Details</h2>
          <!--First Name Input Field-->
          <div class="flex flex-col">
            <label class="block">
              <span class="text-gray-700">First Name</span>
              <span style="color: #ff0000">*</span>
              <input
                type="text"
                class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                v-model="client.firstName"
              />
            </label>
            <!-- Validation error messages -->
            <span v-if="v$.client.firstName.$error" class="text-red-500">
              First Name is required
            </span>
          </div>
          <!--Middle Name Input Field-->
          <div class="flex flex-col">
            <label class="block">
              <span class="text-gray-700">Middle Name</span>
              <input
                type="text"
                class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                placeholder
                v-model="client.middleName"
              />
            </label>
          </div>

          <!--Last Name Input Field-->
          <div class="flex flex-col">
            <label class="block">
              <span class="text-gray-700">Last Name</span>
              <span style="color: #ff0000">*</span>
              <input
                type="text"
                class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                placeholder
                v-model="client.lastName"
              />
            </label>
            <!-- Validation error messages -->
            <span v-if="v$.client.lastName.$error" class="text-red-500">
              Last Name is required
            </span>
          </div>

          <div></div>
          <!--Email Input Field-->
          <div class="flex flex-col">
            <label class="block">
              <span class="text-gray-700">Email</span>
              <span style="color: #ff0000">*</span>
              <input
                type="email"
                class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                v-model="client.email"
              />
            </label>
            <!-- Validation error messages -->
            <span v-if="v$.client.email.$error" class="text-red-500">
              Valid Email is required
            </span>
          </div>
          <!-- Phone Number Input Field -->
          <div class="flex flex-col">
            <label class="block">
              <span class="text-gray-700">Phone Number</span>
              <span style="color: #ff0000">*</span>
              <input
                type="text"
                class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                pattern="[0-9]{3}[0-9]{3}[0-9]{4}"
                v-model="client.phoneNumber.primary"
              />
            </label>
            <!-- Validation error messages -->
            <span
              v-if="v$.client.phoneNumber.primary.$error"
              class="text-red-500"
            >
              <span v-if="v$.client.phoneNumber.primary.required.$invalid">
                Phone Number is required
              </span>
              <span
                v-else-if="
                  !v$.client.phoneNumber.primary.required.$invalid &&
                  v$.client.phoneNumber.primary.numeric.$invalid
                "
              >
                Phone Number must contain only digits
              </span>
              <span
                v-else-if="
                  !v$.client.phoneNumber.primary.required.$invalid &&
                  !v$.client.phoneNumber.primary.numeric.$invalid &&
                  (v$.client.phoneNumber.primary.minLength.$invalid ||
                    v$.client.phoneNumber.primary.maxLength.$invalid)
                "
              >
                Phone Number must be exactly 10 digits
              </span>
            </span>
          </div>

          <!-- Alternative Phone Number Input Field -->
          <div class="flex flex-col">
            <label class="block">
              <span class="text-gray-700">Alternative Phone Number</span>
              <input
                type="text"
                class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                pattern="[0-9]{3}[0-9]{3}[0-9]{4}"
                v-model="client.phoneNumber.alternate"
              />
            </label>
          </div>
        </div>

        <!-- grid container -->
        <div
          class="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10"
        >
          <h2 class="text-2xl font-bold">Address Details</h2>
          <!-- Address 1 Input Field -->
          <div class="flex flex-col">
            <label class="block">
              <span class="text-gray-700">Address Line 1</span>
              <input
                type="text"
                class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                v-model="client.address.line1"
              />
            </label>
          </div>

          <!-- Address 2 Input Field -->
          <div class="flex flex-col">
            <label class="block">
              <span class="text-gray-700">Address Line 2</span>
              <input
                type="text"
                class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                v-model="client.address.line2"
              />
            </label>
          </div>

          <!-- City Input Field -->
          <div class="flex flex-col">
            <label class="block">
              <span class="text-gray-700">City</span>
              <span style="color: #ff0000">*</span>
              <input
                type="text"
                class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                v-model="client.address.city"
              />
            </label>
            <!-- Validation error messages -->
            <span v-if="v$.client.address.city.$error" class="text-red-500">
              City is required
            </span>
          </div>
          <div></div>

          <!-- County Input Field -->
          <div class="flex flex-col">
            <label class="block">
              <span class="text-gray-700">County</span>
              <input
                type="text"
                class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                v-model="client.address.county"
              />
            </label>
          </div>

          <!-- Zip Code Input Field -->
          <div class="flex flex-col">
            <label class="block">
              <span class="text-gray-700">Zip Code</span>
              <input
                type="text"
                class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                v-model="client.address.zip"
              />
            </label>
          </div>
        </div>
        <div>
          <div
            class="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10"
          >
            <h2 class="text-2xl font-bold">Photo</h2>
            <div class="flex flex-col">
              <!-- photo upload section-->
              <div class="photo">
                <!-- <profile-photo v-model="client.profilePhoto" /> -->
                <div class="fileUpload">
                  <div
                    v-if="imagePreview || placeholderImage"
                    class="image-preview"
                  >
                    <img
                      :src="imagePreview || placeholderImage"
                      alt="Profile Picture Preview"
                      class="rounded-full"
                    />
                  </div>
                  <div class="mt-3">
                    <span style="color: #ff0000">
                      <input
                        type="file"
                        @change="handleFileChange"
                        accept="image/*"
                        :disabled="user.role === 'viewer'"
                      />
                    </span>
                  </div>
                  <div class="flex-1">
                    <button
                      class="bg-red-700 disabled:opacity-50 text-white rounded mr-2 mt-2"
                      @click.prevent="openImageInIframe"
                    >
                      View
                    </button>
                    <h6>Simply choose another photo if you want to change the current photo</h6>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          class="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10"
        ></div>
        <!-- Add Client Submit Button -->
        <div class="container">
          <div class="btn-holder">
            <button class="bg-red-700 text-white rounded" type="submit">
              Add Client
            </button>
          </div>
        </div>
      </form>
    </div>
  </main>
</template>

<script>
//import functionalities for validation
import useVuelidate from '@vuelidate/core';
import {
  required,
  email,
  numeric,
  minLength,
  maxLength,
} from '@vuelidate/validators';
import { createClient } from '../api/api';
import { useToast } from 'vue-toastification';
import profilePhoto from '../components/profilePhoto.vue';
import { useLoggedInUserStore } from '../store/loggedInUser';
import axios from 'axios';

//Notifications
const toast = useToast();

export default {
  data() {
    return {
      //client variable to hold new client information
      client: {
        firstName: '',
        middleName: '',
        lastName: '',
        email: '',
        phoneNumber: {
          primary: null,
          alternate: null,
        },
        address: {
          line1: null,
          line2: null,
          city: null,
          county: null,
          zip: null,
        },
      },
      selectedFile: null,
      imagePreview: null,
      placeholderImage: 'https://i.imgur.com/xCvzudW.png', // Placeholder image URL
      iframeUrl: null,
      clientId: null,
    };
  },

  components: {
    'profile-photo': profilePhoto,
  },

  setup() {
    // Register Vuelidate
    const v$ = useVuelidate();
    const user = useLoggedInUserStore(); // determines the logged-in user role

    return { v$, user };
  },
  validations() {
    // validations for client
    return {
      client: {
        firstName: { required },
        lastName: { required },
        email: { required, email },
        phoneNumber: {
          primary: {
            required,
            numeric,
            minLength: minLength(10),
            maxLength: maxLength(10),
          },
        },
        address: {
          city: { required },
        },
      },
      selectedFile: {},
    };
  },
  methods: {
    // method called when user submits the form
    async submitForm() {
      // Trigger validation
      this.v$.$validate();

      if (this.v$.$error) {
        console.log('something wrong with the validation')
        // Form is invalid, do not proceed
        return;
      }
      try {
        const response = await createClient(this.client); //Calls the create client function to create the client
        
        if (this.selectedFile){ //If there is a file uploaded, call the uploadImage function
          // Use the newly created client ID to create the photo
          await this.uploadImage(response.id);
        }
        this.$router.push('/findclient');
        toast.success(response.message);

      } catch (error) {
        toast.error(error);
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

    // Method to handle the file change when editor chooses a photo from local machine
    handleFileChange(event) {
      this.selectedFile = event.target.files[0];
      this.previewImage();
    },

    // Method to handle the upload function when the 'Upload' button is clicked on
    async uploadImage(clientId) {
      this.clientId = clientId; // Set the client ID

      const newFilename = this.clientId;
      const formData = new FormData();
      formData.append('file', this.selectedFile, newFilename + '.jpg'); 

      try {
        const res = await axios.post(
          'http://localhost:4000/backend/uploads',
          formData
        );
        console.log(res);
        const newImageUrl = `http://localhost:4000/backend/uploads/${newFilename}.jpg`;
        console.log(newImageUrl);
      } catch (error) {
        console.error('Error uploading image:', error);
        throw new Error('Failed to upload image');
      }
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
};
</script>
