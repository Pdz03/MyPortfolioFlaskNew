const uploadButton = document.getElementById("send");
uploadButton.addEventListener("click", send);

function uploadFiles(event) {
  event.preventDefault();
  const fileInput = document.getElementById("image");
  const selectedFiles = fileInput.files;
  // Check if any files are selected
  if (selectedFiles.length === 0) {
    alert("Please select at least one file to upload.");
    return;
  }

  console.log(selectedFiles);
}

function send (event){
  event.preventDefault();
    const random = Math.random() * 100000 | 0;
    const idprj = 'prjweb-' + random;
    const title = $('#title').val();
    const desk1 = $('#desk1').val();
    const url = $('#url').val();
    const deskripsi = editor.getData();
    const type = 'webdev';

    const filemain = $("#mainimage")[0].files[0];

    const fileInput = document.getElementById("image");
    const selectedFiles = fileInput.files;

    if (selectedFiles.length === 0) {
      alert("Please select at least one file to upload.");
      return;
    }
  

    let form_data = new FormData();
    form_data.append('id', idprj);
    form_data.append('title', title);
    form_data.append('desk1', desk1);
    form_data.append('url', url);
    form_data.append('deskripsi', deskripsi);
    form_data.append('type', type);
    form_data.append('filemain', filemain);
    form_data.append('filelength', selectedFiles.length);

    for (let i = 0; i < selectedFiles.length; i++) {
      form_data.append(`file[${i}]`, selectedFiles[i]);
    }

    $.ajax({
        type: "POST",
        url: "/send",
        data: form_data,
        cache: false,
        contentType: false,
        processData: false,
        success: function (response) {
        if (response["result"] === "success") {
          alert(response["msg"]);
          window.location.reload();
        }
      },
    });
}
