// Global functions for inline calls
let editorInstance;

$(document).ready(function () {
    // Initialize CKEditor
    ClassicEditor
    .create( document.querySelector( '#deskripsi' ) )
    .then((newEditor) => {
        editorInstance = newEditor;
        console.log('Editor was initialized successfully:', newEditor);
    })
    .catch( error => {
        console.error( error );
    } );

    // Send / Update Button Click
    $('#send').click(function() {
        const oid = $('#oid').val();
        const url = oid ? '/update' : '/send';
        
        const id = $('#id').val();
        const title = $('#title').val();
        const type = $('#type').val();
        const desk1 = $('#desk1').val();
        const webUrl = $('#url').val();
        const deskripsi = editorInstance.getData();
        const mainimage = $('#mainimage')[0].files[0];
        const images = $('#image')[0].files;

        if(!id || !title || !type) {
            Swal.fire('Error', 'Please fill in required fields (ID, Title, Type)', 'error');
            return;
        }

        const formData = new FormData();
        if(oid) formData.append('oid', oid);
        formData.append('id', id);
        formData.append('title', title);
        formData.append('type', type);
        formData.append('desk1', desk1);
        formData.append('url', webUrl);
        formData.append('deskripsi', deskripsi);

        if(mainimage) {
            formData.append('filemain', mainimage);
        }

        formData.append('filelength', images.length);
        for(let i=0; i<images.length; i++) {
            formData.append('file['+i+']', images[i]);
        }

        $.ajax({
            url: url,
            type: 'POST',
            data: formData,
            contentType: false,
            processData: false,
            success: function(response) {
                if(response.result === 'success') {
                    Swal.fire({
                        title: 'Success!',
                        text: response.msg,
                        icon: 'success',
                        confirmButtonText: 'OK'
                    }).then(() => {
                        location.reload();
                    });
                } else {
                    Swal.fire('Error', 'Something went wrong', 'error');
                }
            },
            error: function(err) {
                console.error(err);
                Swal.fire('Error', 'Failed to save project', 'error');
            }
        });
    });
});

window.editProject = function(project) {
    $('#form-title').text('Edit Project');
    $('#send').text('Update Project');
    
    $('#oid').val(project._id);
    $('#id').val(project.prjid);
    $('#title').val(project.title);
    $('#type').val(project.type); // Ensure values match options
    $('#desk1').val(project.desk1);
    $('#url').val(project.url);
    
    if(editorInstance) {
        editorInstance.setData(project.deskripsi || '');
    }
    
    if(project.mainimage) {
        $('#current-mainimage').text(project.mainimage.split('/').pop());
    } else {
        $('#current-mainimage').text('None');
    }

    // Scroll to form
    document.getElementById('uploadForm').scrollIntoView({behavior: 'smooth'});
};

window.deleteProject = function(oid) {
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
        if (result.isConfirmed) {
            $.ajax({
                url: '/delete',
                type: 'POST',
                data: { oid: oid },
                success: function(response) {
                    Swal.fire(
                        'Deleted!',
                        response.msg,
                        'success'
                    ).then(() => {
                        location.reload();
                    });
                },
                error: function(err) {
                    Swal.fire('Error', 'Failed to delete project', 'error');
                }
            });
        }
    });
};

window.resetForm = function() {
    $('#form-title').text('Add New Project');
    $('#send').text('Save Project');
    $('#uploadForm')[0].reset();
    $('#oid').val('');
    $('#current-mainimage').text('None');
    if(editorInstance) {
        editorInstance.setData('');
    }
};
