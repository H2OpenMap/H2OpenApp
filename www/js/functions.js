//------------------------------------START FUNCTIONS----------------------->>
function startFunction() {
    setDate();
    setMapper();
    setPosition();
    
}

function convertDate() {
    function addZero(i) {
        if (i < 10) {
            i = "0" + i;
        }
        return i;
    }
    var d = new Date();
    var y = d.getFullYear();
    var M = addZero(d.getMonth());
    var g = addZero(d.getDate());
    var h = addZero(d.getHours());
    var m = addZero(d.getMinutes());
    var s = addZero(d.getSeconds());
    date = y + M + g + h + m + s;
}

function setDate(){
    var date = new Date();
    document.getElementById("s_date").value = date;
}

function setMapper(){
    var source = "dummy-mapper";
    document.getElementById("source").value = source;
}
    
function setPosition(){
    // SET GPS POSITION
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        alert("Geolocation is not supported.");
    }

    function showPosition(position) {
        document.getElementById("lat").value = position.coords.latitude;
        document.getElementById("lon").value = position.coords.longitude;
    }

}

//------------------------------------GEOLOCATION----------------------->>
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        alert("Geolocation is not supported.");
    }

    function showPosition(position) {
        document.getElementById("lat").value = position.coords.latitude;
        document.getElementById("lon").value = position.coords.longitude;
    }
}

//------------------------------------CAMERA----------------------->>
function getPhoto(edit_ph) {
    // This iOS/Android only example requires the dialog and the device plugin as well.
    if (edit_ph=='false') {
        var allowEdit = true;
    }
    navigator.camera.getPicture(onSuccess, onFail, {
        quality: 50,
        destinationType: Camera.DestinationType.FILE_URI,
        sourceType: Camera.PictureSourceType.CAMERA,
        allowEdit,
        //allowEdit: true,
        encodingType: Camera.EncodingType.JPEG,
        targetWidth: 1000,
        targetHeight: 1000,
        //popoverOptions: CameraPopoverOptions,
        saveToPhotoAlbum: true
    });

    function onSuccess(result) {
        // convert JSON string to JSON Object
        var thisResult = JSON.parse(result);
        // convert json_metadata JSON string to JSON Object 
        var metadata = JSON.parse(thisResult.json_metadata);
        var ph_exif = '';
        for (var e in metadata) {
            ph_exif += e + ':' + metadata[e] + '\n';
        }
        var image = document.getElementById('image');
        image.src = thisResult.filename;

        if (thisResult.json_metadata != "{}") {
            if (device.platform == 'iOS') {
                document.getElementById('photo').value = image.src;
                document.getElementById('exif').innerHTML = ph_exif;
            } else {
                document.getElementById('photo').value = image.src;
                document.getElementById('exif').innerHTML = ph_exif;
            }
        }
    }

    function onFail(message) {
        alert('Failed because: ' + message);
    }
}

//------------------------------------FORM FUNCTIONS--------------------------------------->>

function wrForm(b){
    if (b =="large"){
        var p = 4;
        presetForm(p);
    }
    if (b =="small") {
        var p = 1;
        presetForm(p);
    }
    if (b =="tap") {
        var p = 5;
        presetForm(p);
    }
}

function puForm(c){
    if (c == 'no pump') { 
        var pump_manual = $( "#pump_manual");
        pump_manual[0].selectedIndex = 3;
        pump_manual.selectmenu().selectmenu('refresh', true);
    }
    /*
    if (c == 'manual') { 
        var wateres = $( "#wateres" );
        wateres[0].selectedIndex = 1;
        var top = $( "#top");
        top[0].selectedIndex = 1;
        wateres.selectmenu().selectmenu('refresh', true);
        top.selectmenu().selectmenu('refresh', true);
    }
    */
}

function pmForm(d){
    if (d == 'flywheel') presetForm(1);
    if (d == 'lever') presetForm(2);
    if (d == 'pedal') presetForm(3);
    if (d == 'no pump') {
        var pump = $( "#pump");
        pump[0].selectedIndex = 2;
        pump.selectmenu().selectmenu('refresh', true);
    }
}

function presetForm(p) {
    if (p == 1) { //flywheel
        var wateres = $( "#wateres" );
        wateres[0].selectedIndex = 1;
        var top = $( "#top");
        top[0].selectedIndex = 1;
        var pump = $( "#pump");
        pump[0].selectedIndex = 0;
        var pump_manual = $( "#pump_manual");
        pump_manual[0].selectedIndex = 1;
        var drinking_water = $( "#drinking_water");
        drinking_water[0].selectedIndex = 1;
    } else if (p == 2) { //lever
        var wateres = $( "#wateres" );
        wateres[0].selectedIndex = 1;
        var top = $( "#top");
        top[0].selectedIndex = 1;
        var pump = $( "#pump");
        pump[0].selectedIndex = 0;
        var pump_manual = $( "#pump_manual");
        pump_manual[0].selectedIndex = 0;
        var drinking_water = $( "#drinking_water");
        drinking_water[0].selectedIndex = 1;
    } else if (p == 3) { //pedal
        var wateres = $( "#wateres" );
        wateres[0].selectedIndex = 1;
        var top = $( "#top");
        top[0].selectedIndex = 1;
        var pump = $( "#pump");
        pump[0].selectedIndex = 0;
        var pump_manual = $( "#pump_manual");
        pump_manual[0].selectedIndex = 2;
        var drinking_water = $( "#drinking_water");
        drinking_water[0].selectedIndex = 1;
    } else if (p == 4) { // traditional
        var wateres = $( "#wateres" );
        wateres[0].selectedIndex = 0;
        var top = $( "#top");
        top[0].selectedIndex = 0;
        var pump = $( "#pump");
        pump[0].selectedIndex = 2;
        var pump_manual = $( "#pump_manual");
        pump_manual[0].selectedIndex = 3;
        var drinking_water = $( "#drinking_water");
        drinking_water[0].selectedIndex = 2;        
    } else if (p == 5) { // water tap
        var wateres = $( "#wateres" );
        wateres[0].selectedIndex = 2;
        var top = $( "#top");
        top[0].selectedIndex = 1;
        var pump = $( "#pump");
        pump[0].selectedIndex = 2;
        var pump_manual = $( "#pump_manual");
        pump_manual[0].selectedIndex = 3;
        var drinking_water = $( "#drinking_water");
        drinking_water[0].selectedIndex = 1;
    }
    wateres.selectmenu().selectmenu('refresh', true);
    top.selectmenu().selectmenu('refresh', true);
    pump.selectmenu().selectmenu('refresh', true);
    pump_manual.selectmenu().selectmenu('refresh', true);
    drinking_water.selectmenu().selectmenu('refresh', true);
}

function otherRes() {
    alert("if other is selected, please use note field to describe this water rsource");
}

//------------------------------------FORM FUNCTIONS--------------------------------------->>

function validateForm() {

    // validation fails if the input is blank
    if (myForm.source.value == "") {
        alert("Error: Source is empty!");
        myForm.inputfield.focus();
        return false;
    }

    // regular expression to match only alphanumeric characters and spaces
    //var re = /^[\w+\s']*$/;
    var re = /^[^=*+-<>$&\/\[\]\{\}]*$/;


    // validation fails if the input doesn't match our regular expression
    if (!re.test(myForm.other_pump.value)) {
        alert("Error: other pump contains invalid characters.\n No special characters!");
        myForm.other_pump.focus();
        return false;
    }

    if (!re.test(myForm.operator.value)) {
        alert("Error: operator contains invalid characters.\n No special characters!");
        myForm.operator.focus();
        return false;
    }

    if (!re.test(myForm.note.value)) {
        alert("Error: note contains invalid characters.\n No special characters!");
        myForm.note.focus();
        return false;
        
    }
    // validation was successful
}

//------------------------------------SEND DATA-------------------------------------->>
function sendData(){
    
    generateCsv();

}


//------------------------------------GENERATE CSV FILE-------------------------------------->>
function generateCsv() {

    db.transaction(function(tx) {
        tx.executeSql(selectAllStatement, [], function(tx, result) {
            dataset = result.rows;
            if (dataset.length!=0){

                var content = 'id,wateres,source,s_date,latitude,longitude,top,pump,pump_manual,other_pump,operator,operator_type,condition,disused,abandoned,access,water_presence,drinking_water,fee,fixme,note,photo,exif\n';
                var fileName = '';
                var date = new Date().toString();
                var photoList = [];
                
                for (var i = 0, item = null; i < dataset.length; i++) {
                    item = dataset.item(i);

                    //uploadPhoto(item['photo']);
                    photoList.push(item['photo']);

                    var exif = item['exif'].replace(/(\r\n|\n|\r)/gm, " | ");
                    exif = exif.replace(/,/g, '.');

                    content += item['id']+ ',' 
                            + item['wateres'] + ',' 
                            + item['source'] + ',' 
                            + item['s_date'] + ',' 
                            + item['lat'] + ',' 
                            + item['lon'] + ',' 
                            + item['top'] + ',' 
                            + item['pump'] + ',' 
                            + item['pump_manual'] + ',' 
                            + item['other_pump'] + ',' 
                            + item['operator'] + ',' 
                            + item['operator_type'] + ',' 
                            + item['condition'] + ',' 
                            + item['disused'] + ',' 
                            + item['abandoned'] + ',' 
                            + item['access'] + ',' 
                            + item['water_presence'] + ',' 
                            + item['drinking_water'] + ',' 
                            + item['fee'] + ',' 
                            + item['fixme'] + ',' 
                            + item['note'] + ',' 
                            + item['photo'] + ',' 
                            + exif + '\n';
                    
                    fileName = item['source'] + '|' + date;
                }

                fileName = fileName.replace(/\ /g, "_");
                fileName = fileName.replace(/\,/g, "");
                fileName = fileName.replace(/\:/g, "-")+'.csv';

                $('#message').html('<p><strong>Data have been collected.</strong> </p>');
                //------------------------------SAVE CSV ------------------------------------------
                var fileObject;
                document.addEventListener("deviceready", onDeviceReady, true);

                function onDeviceReady() {
                    window.requestFileSystem(LocalFileSystem.TEMPORARY, 0, onFileSystemSuccess, fail);
                }

                function onFileSystemSuccess(fileSystem) {
                    fileSystem.root.getFile(fileName, { create: true, exclusive: false },
                        gotFileEntry, fail);
                }

                function gotFileEntry(fileEntry) {
                    fileObject = fileEntry;
                    $('#saveFile_csv').on('click', function() {
                        saveFileContent();
                        uploadFile(fileName, photoList);
                    });
                }

                function saveFileContent() {
                    fileObject.createWriter(gotFileWriter, fail);
                }

                function gotFileWriter(writer) {
                    var myText = document.getElementById('my_text').value + content;
                    writer.write(myText);
                    writer.onwriteend = function(evt) {
                        $('#message').html('<p>File contents have been written.<br /><strong>File path:</strong> ' + fileObject.fullPath + '</p>');
                        var reader = new FileReader();
                    };
                }
                function fail(error) {
                    alert('fail to write file code = ' + error.code);
                }
            }
        });
    });
}

//------------------------------SAVE CSV ------------------------------------------


/*function saveCSV() {
            
            var fileObject;
            document.addEventListener("deviceready", onDeviceReady, true);

            function onDeviceReady() {
                window.requestFileSystem(LocalFileSystem.TEMPORARY, 0, onFileSystemSuccess, fail);
            }

            function onFileSystemSuccess(fileSystem) {
                fileSystem.root.getFile(fileName, { create: true, exclusive: false },
                    gotFileEntry, fail);
            }

            function gotFileEntry(fileEntry) {
                fileObject = fileEntry;
                $('#saveFile_csv').on('click', function() {
                    saveFileContent();
                    //uploadFile(fileName);
                });
            }

            function saveFileContent() {
                fileObject.createWriter(gotFileWriter, fail);
            }

            function gotFileWriter(writer) {
                var myText = document.getElementById('my_text').value + content;
                writer.write(myText);
                writer.onwriteend = function(evt) {
                    $('#message').html('<p>File contents have been written.<br /><strong>File path:</strong> ' + fileObject.fullPath + '</p>');
                    var reader = new FileReader();
                };
            }
            function fail(error) {
                alert('fail to write file code = ' + error.code);
            }
            
}
*/
//------------------------------------UPLOAD-CSV---------------------------------------->>
function uploadFile(fileName,photoList) {

    var fileURL = "///storage/emulated/0/Android/data/com.rasmata.h2openapp/cache/"+fileName;

    function win(r) {
        console.log("Code = " + r.responseCode);
        console.log("Response = " + r.response);
        console.log("Sent = " + r.bytesSent);
        $('#contents').html('<strong>File uploaded</strong><br>'+ new Date() );
        
    }

    function fail(error) {
        alert("An error has occurred uploading file: Code = " + error.code);
        console.log("upload error source: " + error.source);
        console.log("upload error target: " + error.target);
    }

    var uri = encodeURI("http://www.h2openmap.org/uploads/upload.php");

    var options = new FileUploadOptions();
    options.fileKey="file";
    options.fileName=fileURL.substr(fileURL.lastIndexOf('/')+1);
    options.mimeType="text/plain";

    var headers={'headerParam':'headerValue'};

    options.headers = headers;

    var ft = new FileTransfer();
    ft.upload(fileURL, uri, win, fail, options);
    $('#contents').html('<strong>Whait upload confirmation...</strong>');
    uploadPhoto(photoList);
}

//------------------------------------UPLOAD-PHOTO---------------------------------------->>
function uploadPhoto(photoList) {
    for (i = 0; i < photoList.length; i++) {
        console.log(photoList);
        console.log(photoList[i]);
        var fileURL = photoList[i];

        function win(r) {
            console.log("Code = " + r.responseCode);
            console.log("Response = " + r.response);
            console.log("Sent = " + r.bytesSent);
            $('#contents').html('<strong>File uploaded</strong><br>'+ new Date() );
        }

        function fail(error) {
            alert("An error has occurred uploading file: Code = " + error.code);
            console.log("upload error source: " + error.source);
            console.log("upload error target: " + error.target);
        }

        var uri = encodeURI("http://www.h2openmap.org/uploads/upload_photo.php");

        var options = new FileUploadOptions();
        options.fileKey="file";
        options.fileName=fileURL.substr(fileURL.lastIndexOf('/')+1);
        options.mimeType="text/plain";

        var headers={'headerParam':'headerValue'};

        options.headers = headers;

        var ft = new FileTransfer();
        ft.upload(fileURL, uri, win, fail, options);
        $('#contents').html('<strong>Whait upload confirmation...</strong>');
    }
}

//------------------------------------REMOTE LIST----------------------------------------->>
function listRemote(){
    $.post("http://www.h2openmap.org/uploads/list.php", function(data) {
        $('#remote').html(data);
    });

}

$(document).ready(function() {// Call function when page is ready for load..
    
    $("#sendData").click(sendData); // Register Event Listener when button click.
});



