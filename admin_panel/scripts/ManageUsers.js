import { collection, getDocs, doc, deleteDoc, updateDoc, addDoc, query, orderBy } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-firestore.js";
import { firestoreDB } from './configurations.js';



// BACK BUTTON =====================================================================================
// Add an event listener to the back button
const backButton = document.getElementById("backButton");

backButton.addEventListener("click", () => {
    // Navigate to the previous page
    window.history.back();
});





// Function to open the "Add User" form
// function openAddUserForm() {
//     // Display the add form and hide the edit form
//     const addUserForm = document.getElementById("addUserForm");
//     addUserForm.style.display = "block";

//     // Clear the input fields in the "Add User" form
//     document.getElementById("addUsername").value = "";
//     document.getElementById("addEmail").value = "";
//     document.getElementById("addPhone").value = "";
//     document.getElementById("addAddress").value = "";
//     document.getElementById("addPassword").value = "";
// }

// // Function to add a new user
// function addUser() {
//     const username = document.getElementById("addUsername").value;
//     const email = document.getElementById("addEmail").value;
//     const phone = document.getElementById("addPhone").value;
//     const address = document.getElementById("addAddress").value;
//     const password = document.getElementById("addPassword").value;

//     if (username && email && phone && address && password) {
//         // Add the new user to Firestore
//         addDoc(collection(firestoreDB, "users"), {
//             userName: username,
//             email: email,
//             phoneNumber: phone,
//             residentialAddress: address,
//             password: password,
//         })
//             .then(() => {
//                 console.log("User added successfully");
//                 // Hide the add form after adding
//                 const addUserForm = document.getElementById("addUserForm");
//                 addUserForm.style.display = "none";

//                 // Refresh the user list
//                 getAllUsers();
//             })
//             .catch((error) => {
//                 console.error("Error adding user: ", error);
//             });
//     } else {
//         // Display an error message if any of the fields is empty
//         document.getElementById("addUserErrorMessage").textContent = "Please fill in all the fields.";
//     }
// }

// // Event listener for the "Add User" button
// const addUserButton = document.getElementById("addUserButton");
// addUserButton.addEventListener("click", openAddUserForm);

// // Event listener for the "Add" button in the "Add User" form
// const addUserFormSubmitButton = document.getElementById("addUserFormSubmitButton");
// addUserFormSubmitButton.addEventListener("click", addUser);

// // Event listener for the "Cancel" button in the "Add User" form
// const cancelAddUserButton = document.getElementById("cancelAddUserButton");
// cancelAddUserButton.addEventListener("click", () => {
//     const addUserForm = document.getElementById("addUserForm");
//     addUserForm.style.display = "none";
// });


function getAllUsers() {
    const inquiriesCollection = collection(firestoreDB, "users");

    getDocs(query(inquiriesCollection, orderBy("userName")))
        .then((querySnapshot) => {
            const inquiryList = document.getElementById("user-list");
            inquiryList.innerHTML = ""; // Clear existing content

            querySnapshot.forEach((doc) => {
                const userData = doc.data();
                const username = userData.userName;
                const uid = userData.uid;
                const address = userData.residentialAddress;
                const phone = userData.phoneNumber;
                const pw = userData.password;
                const email = userData.emailAddress;

                const inquiryItem = document.createElement("div");
                inquiryItem.classList.add("career-item");

                const userDetails = document.createElement("div");
                userDetails.classList.add("career-details");

                const usernameElement = document.createElement("p");
                usernameElement.innerHTML = `<strong>Username:</strong> ${username}`;

                const emailElement = document.createElement("p");
                emailElement.innerHTML = `<strong>Email:</strong> ${email}`;

                const phoneElement = document.createElement("p");
                phoneElement.innerHTML = `<strong>Phone:</strong> ${phone}`;

                const addressElement = document.createElement("p");
                addressElement.innerHTML = `<strong>Address:</strong> ${address}`;

                // const passwordElement = document.createElement("p");
                // passwordElement.innerHTML = `<strong>Password:</strong> ${pw}`;

                userDetails.appendChild(usernameElement);
                userDetails.appendChild(emailElement);
                userDetails.appendChild(phoneElement);
                userDetails.appendChild(addressElement);
                // userDetails.appendChild(passwordElement);

                const inquiryActions = document.createElement("div");
                inquiryActions.classList.add("career-actions");

                // const replyButton = document.createElement("button");
                // replyButton.classList.add("btn", "btn-primary");
                // replyButton.textContent = "Edit";
                // replyButton.addEventListener("click", () => {
                //     openEditModal(username, email, phone, address,pw, doc.id);
                // });
                

                const deleteButton = document.createElement("button");
                deleteButton.classList.add("btn", "btn-danger");
                deleteButton.textContent = "Delete";

                deleteButton.addEventListener("click", () => {
                    if (confirm("Are you sure you want to delete this User?")) {
                        const userId = doc.id;
                        deleteUser(userId);
                        inquiryItem.remove();
                    }
                });
  

                // inquiryActions.appendChild(replyButton);
                inquiryActions.appendChild(deleteButton);

                inquiryItem.appendChild(userDetails);
                inquiryItem.appendChild(inquiryActions);

                inquiryList.appendChild(inquiryItem);
            });
        })
        .catch((error) => {
            console.error("Error getting users:", error);
        });
}

// Function to delete a user by ID =========================================
function deleteUser(userId) {
    const inquiryRef = doc(firestoreDB, "users", userId);
    deleteDoc(inquiryRef)
    .then(() => {
        console.log("User deleted successfully");
    })
    .catch((error) => {
        console.error("Error deleting user: ", error);
    });
}    


// ======== EDIT ==============================================================
// function openEditModal(userName, email, phone, address, password, docId) {
//     const modal = document.getElementById("editModal");
//     modal.style.display = "block";

//     // Prefill the form with user data
//     document.getElementById("editUsername").value = userName;
//     document.getElementById("editEmail").value = email;
//     document.getElementById("editPhone").value = phone;
//     document.getElementById("editAddress").value = address;
//     document.getElementById("editPassword").value = password;
//     document.getElementById("edit-doc-id").value = docId;
// }

// // Close the Update modal
// document.getElementById("close-edit-modal").addEventListener("click", function() {
//     const modal = document.getElementById("editModal");
//     modal.style.display = "none";
// });

// // Form submission for editing
// document.getElementById("edit-user-form").addEventListener("submit", function(e) {
//     e.preventDefault();

//     const updatedUsername = document.getElementById("editUsername").value;
//     const updatedEmail = document.getElementById("editEmail").value;
//     const updatedPhone = document.getElementById("editPhone").value;
//     const updatedAddress = document.getElementById("editAddress").value;
//     const updatedPassword = document.getElementById("editPassword").value;
//     const docID = document.getElementById("edit-doc-id").value;

//     updateDataInFirestore(updatedUsername, updatedEmail, updatedPhone, updatedAddress, updatedPassword, docID);

//     const modal = document.getElementById("editModal");
//     modal.style.display = "none";
// });

// // Function to update a user item in Firestore
// function updateDataInFirestore(updatedUsername, updatedEmail, updatedPhone, updatedAddress, updatedPassword, docId) {
//     const docRef = doc(firestoreDB, "users", docId);
    
//     updateDoc(docRef, {
//         userName: updatedUsername,
//         email: updatedEmail,
//         phoneNumber: updatedPhone,
//         residentialAddress: updatedAddress,
//         password: updatedPassword,
//     })
//         .then(() => {
//             getAllUsers();
//         })
//         .catch((error) => {
//             console.error("Error updating User:", error);
//         });
// }



window.onload = function () {
    getAllUsers();
};