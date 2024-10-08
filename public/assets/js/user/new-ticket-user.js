"use strict";
const fileContainer = document.getElementById("file-container");
const deleteModal = document.querySelector(".index-modal");
let fileToDelete = null;

const ticketDt = new DataTransfer();
var ticketObj = {};

document.querySelectorAll(".drop-zone__input").forEach((inputElement) => {
  const dropZoneElement = inputElement.closest(".drop-zone");
  const errorMessage = document.getElementById("error-message");
  dropZoneElement.addEventListener("click", (e) => {
    inputElement.click();
  });

  let isDropped = false;

  inputElement.addEventListener("change", (e) => {
    const files = inputElement.files;
    const validFiles = Array.from(files).filter((file) => {
      const fileExtension = getFileExtension(file.name);
      return isAllowedExtension(fileExtension);
    });

    if (validFiles.length === 0) {
      errorMessage.classList.remove("hidden");
      return;
    }
    errorMessage.classList.add("hidden");
    for (let i = 0; i < validFiles.length; i++) {
      var f = files[i];
      ticketDt.items.add(f);
      var rand = (Math.random() + 1).toString(36).substring(7);
      ticketObj[rand] = f;

      const fileDiv = document.createElement("div");
      fileDiv.classList.add("file-container");
      const fileElement = createFileElement(validFiles[i]);
      const closeButton = document.createElement("button");
      closeButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"><path fill-rule="evenodd" clip-rule="evenodd" d="M8 3C8 2.44772 8.44772 2 9 2H15C15.5523 2 16 2.44772 16 3C16 3.55228 15.5523 4 15 4H9C8.44772 4 8 3.55228 8 3ZM4.99224 5H3C2.44772 5 2 5.44772 2 6C2 6.55228 2.44772 7 3 7H4.06445L4.70614 16.6254C4.75649 17.3809 4.79816 18.006 4.87287 18.5149C4.95066 19.0447 5.07405 19.5288 5.33109 19.98C5.73123 20.6824 6.33479 21.247 7.06223 21.5996C7.52952 21.826 8.0208 21.917 8.55459 21.9593C9.06728 22 9.69383 22 10.4509 22H13.5491C14.3062 22 14.9327 22 15.4454 21.9593C15.9792 21.917 16.4705 21.826 16.9378 21.5996C17.6652 21.247 18.2688 20.6824 18.6689 19.98C18.926 19.5288 19.0493 19.0447 19.1271 18.5149C19.2018 18.006 19.2435 17.3808 19.2939 16.6253L19.9356 7H21C21.5523 7 22 6.55228 22 6C22 5.44772 21.5523 5 21 5H19.0078C19.0019 4.99995 18.9961 4.99995 18.9903 5H5.00974C5.00392 4.99995 4.99809 4.99995 4.99224 5ZM17.9311 7H6.06889L6.69907 16.4528C6.75274 17.2578 6.78984 17.8034 6.85166 18.2243C6.9117 18.6333 6.98505 18.8429 7.06888 18.99C7.26895 19.3412 7.57072 19.6235 7.93444 19.7998C8.08684 19.8736 8.30086 19.9329 8.71286 19.9656C9.13703 19.9993 9.68385 20 10.4907 20H13.5093C14.3161 20 14.863 19.9993 15.2871 19.9656C15.6991 19.9329 15.9132 19.8736 16.0656 19.7998C16.4293 19.6235 16.7311 19.3412 16.9311 18.99C17.015 18.8429 17.0883 18.6333 17.1483 18.2243C17.2102 17.8034 17.2473 17.2578 17.3009 16.4528L17.9311 7ZM10 9.5C10.5523 9.5 11 9.94772 11 10.5V15.5C11 16.0523 10.5523 16.5 10 16.5C9.44772 16.5 9 16.0523 9 15.5V10.5C9 9.94772 9.44772 9.5 10 9.5ZM14 9.5C14.5523 9.5 15 9.94772 15 10.5V15.5C15 16.0523 14.5523 16.5 14 16.5C13.4477 16.5 13 16.0523 13 15.5V10.5C13 9.94772 13.4477 9.5 14 9.5Z" fill="white"/></svg>`;
      closeButton.classList.add("close-button");
      closeButton.addEventListener("click", () => {
        fileToDelete = fileDiv;
        deleteModal.classList.add("is-visibl"); //is-visible
      });
      fileDiv.appendChild(fileElement);
      fileDiv.appendChild(closeButton);
      fileContainer.appendChild(fileDiv); //append new container
    }
  });
  function isAllowedExtension(extension) {
    const allowedExtensions = ["jpg", "jpeg", "jfif" , "pjpeg" , "pjp" , "png", "gif", "docx", "doc", "xls", "xlsx", "csv", "pdf"];
    return allowedExtensions.includes(extension);
  }
  dropZoneElement.addEventListener("dragover", (e) => {
    e.preventDefault();
    dropZoneElement.classList.add("drop-zone--over");
  });

  ["dragleave", "dragend"].forEach((type) => {
    dropZoneElement.addEventListener(type, (e) => {
      dropZoneElement.classList.remove("drop-zone--over");
    });
  });

  dropZoneElement.addEventListener("drop", (e) => {
    e.preventDefault();
    isDropped = true;
  
    if (e.dataTransfer.files.length) {
      const files = Array.from(e.dataTransfer.files);
      const validFiles = files.filter((file) => {
        const fileExtension = getFileExtension(file.name);
        return isAllowedExtension(fileExtension);
      });
  
      if (validFiles.length === 0) {
        errorMessage.classList.remove("hidden");
        dropZoneElement.classList.remove("drop-zone--over");
        return;
      }

      errorMessage.classList.add("hidden");
      for (let i = 0; i < validFiles.length; i++) {

        var f = files[i];
        ticketDt.items.add(f);
        var rand = (Math.random() + 1).toString(36).substring(7);
        ticketObj[rand] = f;

        const fileDiv = document.createElement("div");
        fileDiv.classList.add("file-container");
        const fileElement = createFileElement(validFiles[i]);
        const closeButton = document.createElement("button");
        closeButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"><path fill-rule="evenodd" clip-rule="evenodd" d="M8 3C8 2.44772 8.44772 2 9 2H15C15.5523 2 16 2.44772 16 3C16 3.55228 15.5523 4 15 4H9C8.44772 4 8 3.55228 8 3ZM4.99224 5H3C2.44772 5 2 5.44772 2 6C2 6.55228 2.44772 7 3 7H4.06445L4.70614 16.6254C4.75649 17.3809 4.79816 18.006 4.87287 18.5149C4.95066 19.0447 5.07405 19.5288 5.33109 19.98C5.73123 20.6824 6.33479 21.247 7.06223 21.5996C7.52952 21.826 8.0208 21.917 8.55459 21.9593C9.06728 22 9.69383 22 10.4509 22H13.5491C14.3062 22 14.9327 22 15.4454 21.9593C15.9792 21.917 16.4705 21.826 16.9378 21.5996C17.6652 21.247 18.2688 20.6824 18.6689 19.98C18.926 19.5288 19.0493 19.0447 19.1271 18.5149C19.2018 18.006 19.2435 17.3808 19.2939 16.6253L19.9356 7H21C21.5523 7 22 6.55228 22 6C22 5.44772 21.5523 5 21 5H19.0078C19.0019 4.99995 18.9961 4.99995 18.9903 5H5.00974C5.00392 4.99995 4.99809 4.99995 4.99224 5ZM17.9311 7H6.06889L6.69907 16.4528C6.75274 17.2578 6.78984 17.8034 6.85166 18.2243C6.9117 18.6333 6.98505 18.8429 7.06888 18.99C7.26895 19.3412 7.57072 19.6235 7.93444 19.7998C8.08684 19.8736 8.30086 19.9329 8.71286 19.9656C9.13703 19.9993 9.68385 20 10.4907 20H13.5093C14.3161 20 14.863 19.9993 15.2871 19.9656C15.6991 19.9329 15.9132 19.8736 16.0656 19.7998C16.4293 19.6235 16.7311 19.3412 16.9311 18.99C17.015 18.8429 17.0883 18.6333 17.1483 18.2243C17.2102 17.8034 17.2473 17.2578 17.3009 16.4528L17.9311 7ZM10 9.5C10.5523 9.5 11 9.94772 11 10.5V15.5C11 16.0523 10.5523 16.5 10 16.5C9.44772 16.5 9 16.0523 9 15.5V10.5C9 9.94772 9.44772 9.5 10 9.5ZM14 9.5C14.5523 9.5 15 9.94772 15 10.5V15.5C15 16.0523 14.5523 16.5 14 16.5C13.4477 16.5 13 16.0523 13 15.5V10.5C13 9.94772 13.4477 9.5 14 9.5Z" fill="white"/></svg>`;
        closeButton.classList.add("close-button");
        closeButton.addEventListener("click", () => {
          fileToDelete = fileDiv;
          deleteModal.classList.add("is-visibl"); //is-visible
        });
        fileDiv.appendChild(fileElement);
        fileDiv.appendChild(closeButton);
        fileContainer.appendChild(fileDiv); //append new container
      }
      $('#imgInp')[0].files = ticketDt.files;
    }
  
    dropZoneElement.classList.remove("drop-zone--over");
  });
  
});

const deleteModalDeleteButton = deleteModal.querySelector(".delete-files");
deleteModalDeleteButton.addEventListener("click", () => {
  if (fileToDelete) {
    fileContainer.removeChild(fileToDelete);
    fileToDelete = null;
    setTimeout(() => {
      deleteModal.classList.remove("is-visibl"); //is-visible
    }, 100);
  }
});
function createFileElement(file) {
  const fileElement = document.createElement("div");
  const allowedExtensions = ["jpg", "jpeg", "jfif" , "pjpeg" , "pjp" ,"png", "gif", "docx", "doc", "xls", "xlsx", "csv", "pdf"];

  if (file.type && file.type.startsWith("image/") && allowedExtensions.includes(getFileExtension(file.name))) {
    const imgElement = document.createElement("img");
    imgElement.src = URL.createObjectURL(file);
    fileElement.appendChild(imgElement);
  } else if (allowedExtensions.includes(getFileExtension(file.name))) {
    const fileExtension = getFileExtension(file.name);

    if (fileExtension) {
      const fileTypeIcon = getFileTypeIcon(fileExtension);
      fileElement.appendChild(fileTypeIcon);
    } else {
      const fileTypeIcon = document.createElement("div");
      fileTypeIcon.classList.add("file-icon");
      fileTypeIcon.textContent = "Unknown";
      fileElement.appendChild(fileTypeIcon);
    }
  } else {
    const fileTypeIcon = document.createElement("div");
    fileTypeIcon.classList.add("file-icon");
    fileTypeIcon.textContent = "Not Allowed";
    fileElement.appendChild(fileTypeIcon);
  }

  return fileElement;
}
function getFileTypeIcon(fileExtension) {
  if (fileExtension) {
    const iconElement = document.createElement("div");
    iconElement.classList.add("file-icon");
    iconElement.textContent = `.${fileExtension}`;
    return iconElement;
  } else {
    const iconElement = document.createElement("div");
    iconElement.classList.add("file-icon");
    iconElement.textContent = "Unknown";
    return iconElement;
  }
}

function getFileExtension(filename) {
  if (filename) {
    const parts = filename.split(".");
    if (parts.length > 1) {
      return parts[parts.length - 1];
    }
  }
  return null;
}

$(document).on('click', '.close-button', function() {
    var file_key = $(this).siblings('.r-img').attr('data-file');
    var file = ticketObj.file_key;
    ticketDt.items.remove(file);
    $('#imgInp')[0].files = ticketDt.files;
    $(this).closest('div.file-container').remove();
})

