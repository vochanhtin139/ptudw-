document
  .querySelector("#editUserModal")
  .addEventListener("shown.bs.modal", () => {
    document.querySelector("#firstNameEdit").focus();
  });

document
  .querySelector("#addUserModal")
  .addEventListener("shown.bs.modal", () => {
    document.querySelector("#firstName").focus();
  });

document.querySelectorAll(".delete-btn").forEach((btnConfirm) => {
  btnConfirm.addEventListener("click", (e) => {
    let id = e.target.dataset.id;
    const options = {
      title: "Are you sure?",
      type: "danger",
      btnOkText: "Yes",
      btnCancelText: "No",
      onConfirm: () => {
        console.log(id);
        deleteUser(id);
      },
      onCancel: () => {
        console.log("Cancel");
      },
    };
    const {
      el,
      content,
      options: confirmedOptions,
    } = bs5dialog.confirm("Do you really want to delete this user?", options);
  });
});

async function deleteUser(id) {
  let res = await fetch(`/users/${id}`, {
    method: "DELETE",
  });

  location.reload();
}

function showEditUserModal(btn) {
  document.querySelector("#id").value = btn.dataset.id;
  document.querySelector("#usernameEdit").value = btn.dataset.username
  document.querySelector("#firstNameEdit").value = btn.dataset.firstName
  document.querySelector("#lastNameEdit").value = btn.dataset.lastName
  document.querySelector("#mobileEdit").value = btn.dataset.mobile
  document.querySelector("#isAdminEdit").checked = btn.dataset.isAdmin ? true : false
}

async function editUser(e) {
  e.preventDefault()

  const formData = new FormData(document.getElementById("editUserForm"))
  const data = Object.fromEntries(formData.entries())

  let res = await fetch('/users', {
    method: 'PUT',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data)
  })

  location.reload()
}

// document
//   .querySelector("#editUserModal")
//   .addEventListener("shown.bs.modal", () => {
//     document.querySelector("#firstNameEdit").focus();
//   });

// document
//   .querySelector("#addUserModal")
//   .addEventListener("shown.bs.modal", () => {
//     document.querySelector("#firstName").focus();
//   });

// document.querySelectorAll(".delete-btn").forEach((btnConfirm) => {
//   btnConfirm.addEventListener("click", (e) => {
//     const options = {
//       title: "Are you sure?",
//       type: "danger",
//       btnOkText: "Yes",
//       btnCancelText: "No",
//       onConfirm: () => {
//         console.log("Confirm");
//       },
//       onCancel: () => {
//         console.log("Cancel");
//       },
//     };
//     const {
//       el,
//       content,
//       options: confirmedOptions,
//     } = bs5dialog.confirm("Do you really want to delete this user?", options);
//   });
// });
