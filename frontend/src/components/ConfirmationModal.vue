<template>
    <div
        v-if="showModal"
        class="fixed inset-0 flex items-center justify-center z-50"
        ><div
            class="modal-overlay absolute inset-0 bg-gray-800 opacity-50 -z-10"
        ></div>

        <div class="modal-content bg-white w-96 p-6 rounded shadow-lg">
             <!-- Display the message passed as a prop -->
            <p class="text-lg">{{ message }}</p>
            <div class="flex justify-end mt-4">
                <!-- Button to confirm the action -->
                <button
                    @click="confirm"
                    class="px-4 py-2 bg-emerald-500 text-white rounded hover:bg-emerald-600 focus:outline-none mr-2"
                >
                    Confirm
                </button>
                <!-- Button to cancel the action and close the modal -->
                <button
                    @click="cancel"
                    class="px-4 py-2 bg-red-400 text-white rounded hover:bg-red-500 focus:outline-none"
                >
                    Cancel
                </button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        message: String, // Prop to receive the message to be displayed in the modal
    },
    data() {
        return {
            showModal: false, // Controls the visibility of the modal, in this case, it's hidden
        };
    },
    methods: {
        confirm() {
            this.$emit("confirmed"); // Method to confirm the action and emit an event
            this.showModal = false;
        },
        cancel() {
            this.showModal = false;  // Method to cancel the action and close the modal
        },
    },
};
</script>
