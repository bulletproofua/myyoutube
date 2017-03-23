function JSUploader() {
    this.allFiles = [];
    var baseClass = this;

    this.addFiles = function(files) {
        $.each(files, function(i, file) {
            var temp = {file: file, progressTotal: 0, progressDone: 0, element: null, valid: false};

            temp.valid = (file.type == 'video/mp4'
                || file.type == 'video/avi'
                || file.type == 'video/MPEG') && file.size / 1024 / 1024 < 200000;

            temp.element = baseClass.attachFileToView(temp);
            baseClass.allFiles.unshift(temp);
        });
    };

    this.uploadFile =  function(index) {
        var file = baseClass.allFiles[index];
        // var a = document.getElementById("inputName").value;	
        // var b = document.getElementById("descriptionText").value;

        if(file.valid) {
            var data = new FormData();
            data.append('uploadFile', file.file);
            // data.append('inputName', a );
            // data.append('descriptionText', b );
            // data.get('descriptionText', "asasas" );
            // data.append('description', document.getElementById("inputName"));
            
            $.ajax({
                url: '/',
                data: data,
                cache: false,
                contentType: false,
                processData: false,
                type: 'POST',
                success: function (response) {
                    var message = file.element.find('td.message');
                    if (response.status == 'ok') {
                        message.html(response.text);
                        file.element.find('button.uploadButton').remove();
                    }
                    else {
                        message.html(response.errors);
                    }
                },
                xhr: function () {
                    var xhr = $.ajaxSettings.xhr();

                    if (xhr.upload) {
                        console.log('xhr upload');

                        xhr.upload.onprogress = function (e) {
                            file.progressDone = e.position || e.loaded;
                            file.progressTotal = e.totalSize || e.total;
                            baseClass.updateFileProgress(index, file.progressDone, file.progressTotal, file.element);
                            baseClass.totalProgressUpdated();
                            console.log('xhr.upload progress: ' + file.progressDone + ' / ' + file.progressTotal + ' = ' + (Math.floor(file.progressDone / file.progressTotal * 1000) / 10) + '%');
                        };
                    }

                    return xhr;
                }
            });
        }
    };

    this.uploadAllFiles =  function() {
        $.each(baseClass.allFiles, function(i, file) {
            baseClass.uploadFile(i);
        });
    };

    this.updateFileProgress = function(index, done, total, view) {
        var percent = (Math.floor(done/total*1000)/10);

        var progress = view.find('div.progress-bar');

        progress.width(percent + '%');
        progress.html(percent + '%');
    };

    this.updateTotalProgress = function(done, total) {
        var percent = (Math.floor(done/total*1000)/10);
        $('#progress').width(percent + '%');
        $('#progress').html(percent + '%');
    };

    this.totalProgressUpdated = function() {
        var done = 0.0;
        var total = 0.0;

        $.each(baseClass.allFiles, function(i, file) {
            done += file.progressDone;
            total += file.progressTotal;
        })

        baseClass.updateTotalProgress(done, total);
    };

    this.attachFileToView = function(file) {
        var row = $('<tr>');
        row.hide();

        var isValidType = (file.file.type == 'video/mp4'
            || file.file.type == 'video/avi'
            || file.file.type == 'video/MPEG');


        var isValidSize = file.file.size / 1024 / 1024 < 200000;

        //create preview
        // var preview = $('<td>');
        // preview.width('200px');
        // if(isValidType)
        // {
        //     var img = $('<img>');
        //     img.attr('class', 'img-fullsize');

        //     var reader = new FileReader();
        //     reader.onload = function (e) {
        //         img.attr('src', e.target.result);
        //     }
        //     reader.readAsDataURL(file.file);

        //     preview.append(img);
        // }

        //create file info column
        var fileInfo = $('<td>');
        fileInfo.width('200px');

        var fileName = $('<div>');
        fileName.html(file.file.name);

        var fileType = $('<div>');
        fileType.html(file.file.type);

        var fileSize = $('<div>');
        var size = file.file.size;

        if((file.file.size / 1024 / 1024) > 1.0) {
            fileSize.html(Math.floor(file.file.size / 1024 / 1024) + ' MB');
        }
        else if((file.file.size / 1024) > 1.0) {
            fileSize.html(Math.floor(file.file.size / 1024) + ' KB');
        }
        else {
            fileSize.html(file.file.size + ' bytes');
        }



        fileInfo.append(fileName);
        fileInfo.append(fileType);
        fileInfo.append(fileSize);

        // create nameColumn
        var nameColumn = $('<td>');
        nameColumn.attr('class', 'nameColumn');
        nameColumn.width('150px');
            var inputNameText = $('<p>');
                inputNameText.attr('class', 'inputNameText');
                inputNameText.html("File name:");
            var inputName = $('<input>');
                inputName.attr('id', 'inputName');
                inputName.attr('placeholder', 'Set your file name');
                inputName.attr('name', 'inputF');
                inputName.attr('value', "");
            // var inputNameButton = $('<button>');
            //         inputNameButton.attr('id', 'btnID');
            //         inputNameButton.html('Check');
        
        nameColumn.append(inputNameText);
        nameColumn.append(inputName);

        // nameColumn.append(inputNameButton);

        var description = $('<td>');
            description.attr('class', 'description');
            description.width('200px');
                var descriptionP = $('<p>');
                    descriptionP.attr('class', 'descriptionP');
                    descriptionP.html("Your description:");
                var descriptionText = $('<textarea>');
                    descriptionText.attr('id', 'descriptionText');
                    descriptionText.height("80px");
                    descriptionText.attr('placeholder', 'Set your description');
                    descriptionText.attr('name', 'description');
                    descriptionText.attr('value', "");

        description.append(descriptionP);
        description.append(descriptionText);
        //create message column
        var messageColumn = $('<td>');
            messageColumn.attr('class', 'message');
            messageColumn.width('200px');
            if(!isValidType)
            {
                messageColumn.html('Unsupported mimetype ' + file.file.type);
            }
            if(!isValidSize) {
                messageColumn.html(messageColumn.html() + 'File size is ' + Math.floor(file.file.size / 1024 / 1024) + ' MB. Limit is 200 MB.');
        }

        //create progress
        var progressColumn = $('<td>');
        progressColumn.attr('style', 'vertical-align: middle;');
        progressColumn.attr('style', 'width: 30%;');
        progressColumn.attr('style', 'padding-right: 10px;');
        if(file.valid) {
            var progress = $('<div>');

            progress.attr('class', 'progress');

            var progressBar = $('<div>');
            progressBar.attr('class', 'progress-bar');
            progressBar.attr('role', 'progressbar');
            progressBar.html('0%');

            progress.append(progressBar);
            progressColumn.append(progress);
        }

        //create buttons
        var button1 = $('<td>');
        button1.attr('style', 'vertical-align: middle; width:50px');

        var uploadButton = $('<button>');
        uploadButton.attr('class', 'btn btn-primary uploadButton');
        uploadButton.html('Upload');
        uploadButton.click(function(){
            baseClass.uploadFile(row.index());
        });
        if(file.valid) {
            button1.append(uploadButton);
        }

        var button2 = $('<td>');
        button2.width('50px');

        var removeButton = $('<button>');
        removeButton.attr('class', 'close');
        removeButton.html('&times');
        removeButton.click(function(){
            baseClass.allFiles.splice(row.index(), 1);
            row.fadeOut(300, function(){
                $(this).remove();
            });
        });
        button2.append(removeButton);

        // row.append(preview);
        row.append(fileInfo);
        // row.append(messageColumn); 
        // row.append(nameColumn); 
        // row.append(description);
        row.append(progressColumn);
        row.append(button1);
        row.append(button2);
        row.fadeIn();

        $('#files').prepend(row);

        return row;
    };
}

var uploader = new JSUploader();

$(document).ready(function()
{
    $("#addFilesButton").click(function() {
        $("#uploadFiles").replaceWith($("#uploadFiles").clone(true));
        $("#uploadFiles").click();
    });

    $("#uploadAllFilesButton").click(function() {
        uploader.uploadAllFiles();
    });

    $("#uploadFiles").change(function() {
        var files = this.files;

        uploader.addFiles(files);
    });

});

