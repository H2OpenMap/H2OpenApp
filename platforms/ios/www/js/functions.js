//------------------------------------START FUNCTIONS----------------------->>
function onDeviceReady() {
    //console.log('onDeviceReady done');
    //setDate();
    //setMapper();
    //setPosition();
    //checkConnection();
    //alert("navigator.geolocation works well");
    //console.log(navigator.geolocation);
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
    date = y +'/'+ M +'/'+ g +' '+ h +':'+ m +':'+ s;
    return date;
}

function setDate() {
    var date = new Date();
    document.getElementById("s_date").value = date;
}

function setMapper() {
    var source = "dummy-mapper";
    document.getElementById("source").value = source;
}

function checkConnection() {
    var networkState = navigator.connection.type;
    var states = {};
    states[Connection.UNKNOWN]  = 'Unknown connection';
    states[Connection.ETHERNET] = 'Ethernet connection';
    states[Connection.WIFI]     = 'WiFi connection';
    states[Connection.CELL_2G]  = 'Cell 2G connection';
    states[Connection.CELL_3G]  = 'Cell 3G connection';
    states[Connection.CELL_4G]  = 'Cell 4G connection';
    states[Connection.CELL]     = 'Cell generic connection';
    states[Connection.NONE]     = 'No network connection';
    alert('Connection type: ' + states[networkState]);
}

$(document).on("pageshow","#page3",function(){ // check connection opening data tranfer page
    var networkState = navigator.connection.type;
    checkConnection();
    if (networkState == Connection.NONE) {
        $("#up_btn").html('<button id="up_btn" type=button class="ui-btn ui-shadow ui-corner-all" onclick="retryUpload()" >check connection and try again</button>');
        $('#log').html('<strong>you cannot send your data without network, please check your connection.</strong><br> connection type: '+ networkState);
    } else {
        $("#up_btn").html('<button id="up_btn" type="button" class="ui-btn ui-shadow ui-corner-all"  data-icon="cloud" data-iconpos="right" onclick="generateCsv()">upload data</button>');
        $('#log').html('click upload data to start the process<br> connection type: '+ networkState);
    }
});

function retryUpload() {
        $.mobile.pageContainer.pagecontainer("change", "#page3", { reverse: false, transition: "fade", changeHash: false, allowSamePageTransition: true }); 
    };

//------------------------------------GEOLOCATION----------------------->>
function setPosition() {
    // SET GPS POSITION
    
   /* OPTIONS:

    - enableHighAccuracy: Provides a hint that the application needs the best possible results. 
    By default, the device attempts to retrieve a Position using network-based methods. 
    Setting this property to true tells the framework to use more accurate methods, such as satellite positioning. (Boolean).

    - timeout: The maximum length of time (milliseconds) that is allowed 
    to pass from the call to navigator.geolocation.getCurrentPosition or geolocation.watchPosition 
    until the corresponding geolocationSuccess callback executes. 
    If the geolocationSuccess callback is not invoked within this time, 
    the geolocationError callback is passed a PositionError.TIMEOUT error code. 
    (Note that when used in conjunction with geolocation.watchPosition, 
    the geolocationError callback could be called on an interval every timeout milliseconds!) (Number).

    - maximumAge: Accept a cached position whose age is no greater than the specified time in milliseconds. (Number).*/

    //navigator.geolocation.getCurrentPosition(showPosition, onError, {maximumAge:600000, timeout:5000, enableHighAccuracy: true});

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, onError, {maximumAge:60000, timeout:10000, enableHighAccuracy: true});
    } else {
        alert("Geolocation is not supported.");
    }

    function showPosition(position) {
        //console.log("lat: "+position.coords.latitude+ ' lon: '+position.coords.longitude+ ' acc: '+ position.coords.accuracy);
        document.getElementById("lat").value = position.coords.latitude;
        document.getElementById("lon").value = position.coords.longitude;
        document.getElementById("acc").value = position.coords.accuracy;
    }

    function onError(error) {
        alert('code: '    + error.code    + '\n' +
              'message: ' + error.message + '\n');
    }

    function alertGPS(position){
        alert(  'Latitude: '          + position.coords.latitude          + '\n' +
                'Longitude: '         + position.coords.longitude         + '\n' +
                'Altitude: '          + position.coords.altitude          + '\n' +
                'Accuracy: '          + position.coords.accuracy          + '\n' +
                'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
                'Heading: '           + position.coords.heading           + '\n' +
                'Speed: '             + position.coords.speed             + '\n' +
                'Timestamp: '         + position.timestamp                + '\n');
    }
}

//------------------------------------CAMERA----------------------->>
function getPhoto(edit) {
    // This iOS/Android only example requires the dialog and the device plugin as well.
    if (edit == 'false') {
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
        var exif = '';
        for (var e in metadata) {
            exif += e + ': ' + metadata[e] + '\n';
        }
        var image = document.getElementById('image');
        image.src = thisResult.filename;

        if (thisResult.json_metadata != "{}") {
            if (device.platform == 'iOS') {
                document.getElementById('photo').value = image.src;
                document.getElementById('exif').value = exif;
            } else {
                document.getElementById('photo').value = image.src;
                document.getElementById('exif').value = exif;
            }
        }
    }

    function onFail(message) {
        alert('Failed because: ' + message);
    }
}

//------------------------------------FORM FUNCTIONS--------------------------------------->>

function wrForm(b) {
    if (b == "large") {
        var p = 4;
        presetForm(p);
    }
    if (b == "small") {
        var p = 0;
        presetForm(p);
    }
    if (b == "tap") {
        var p = 5;
        presetForm(p);
    }
}
/*
function puForm(c) {
    if (c == 'no pump') {
        var pump_manual = $("#pump_manual");
        pump_manual[0].selectedIndex = 3;
        pump_manual.selectmenu().selectmenu('refresh', true);
    }
    
    if (c == 'manual') { 
        var wateres = $( "#wateres" );
        wateres[0].selectedIndex = 1;
        var top = $( "#top");
        top[0].selectedIndex = 1;
        wateres.selectmenu().selectmenu('refresh', true);
        top.selectmenu().selectmenu('refresh', true);
    }
    
}

function pmForm(d) {
    if (d == 'flywheel') presetForm(1);
    if (d == 'lever') presetForm(2);
    if (d == 'pedal') presetForm(3);
    if (d == 'no pump') {
        var pump = $("#pump");
        pump[0].selectedIndex = 2;
        pump.selectmenu().selectmenu('refresh', true);
    }
}*/

function presetForm(p) {
    resetForm();
    setDate();
    setMapper();
    setPosition();
    if (p == 0) { //generic small
        var wateres = $("#wateres");
        wateres[0].selectedIndex = 1;
        var top = $("#top");
        top[0].selectedIndex = 1;
        var pump = $("#pump");
        pump[0].selectedIndex = 0;
        var pump_manual = $("#pump_manual");
        pump_manual[0].selectedIndex = 4;
        var drinking_water = $("#drinking_water");
        drinking_water[0].selectedIndex = 1;
    } else if (p == 1) { //flywheel
        var wateres = $("#wateres");
        wateres[0].selectedIndex = 1;
        var top = $("#top");
        top[0].selectedIndex = 1;
        var pump = $("#pump");
        pump[0].selectedIndex = 0;
        var pump_manual = $("#pump_manual");
        pump_manual[0].selectedIndex = 1;
        var drinking_water = $("#drinking_water");
        drinking_water[0].selectedIndex = 1;
    } else if (p == 2) { //lever
        var wateres = $("#wateres");
        wateres[0].selectedIndex = 1;
        var top = $("#top");
        top[0].selectedIndex = 1;
        var pump = $("#pump");
        pump[0].selectedIndex = 0;
        var pump_manual = $("#pump_manual");
        pump_manual[0].selectedIndex = 0;
        var drinking_water = $("#drinking_water");
        drinking_water[0].selectedIndex = 1;
    } else if (p == 3) { //pedal
        var wateres = $("#wateres");
        wateres[0].selectedIndex = 1;
        var top = $("#top");
        top[0].selectedIndex = 1;
        var pump = $("#pump");
        pump[0].selectedIndex = 0;
        var pump_manual = $("#pump_manual");
        pump_manual[0].selectedIndex = 2;
        var drinking_water = $("#drinking_water");
        drinking_water[0].selectedIndex = 1;
    } else if (p == 4) { // traditional
        var wateres = $("#wateres");
        wateres[0].selectedIndex = 0;
        var top = $("#top");
        top[0].selectedIndex = 0;
        var pump = $("#pump");
        pump[0].selectedIndex = 2;
        var pump_manual = $("#pump_manual");
        pump_manual[0].selectedIndex = 3;
        var drinking_water = $("#drinking_water");
        drinking_water[0].selectedIndex = 2;
    } else if (p == 5) { // water tap
        var wateres = $("#wateres");
        wateres[0].selectedIndex = 2;
        var top = $("#top");
        top[0].selectedIndex = 1;
        var pump = $("#pump");
        pump[0].selectedIndex = 2;
        var pump_manual = $("#pump_manual");
        pump_manual[0].selectedIndex = 3;
        var drinking_water = $("#drinking_water");
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
    return true;// validation was successful
}

//------------------------------------GENERATE CSV FILE-------------------------------------->>
function generateCsv() {

    db.transaction(function(tx) {
        tx.executeSql(selectAllStatement, [], function(tx, result) {
            dataset = result.rows;
            if (dataset.length != 0) {

                var content = 'id,wateres,source,s_date,latitude,longitude,accuracy,top,pump,pump_manual,other_pump,operator,operator_type,condition,disused,abandoned,access,water_presence,drinking_water,fee,fixme,note,photo,exif\n';
                var fileName = '';
                var date = new Date().toString();
                var photoList = [];

                for (var i = 0, item = null; i < dataset.length; i++) {
                    item = dataset.item(i);
                    photoList.push(item['photo']);
                    var exif = item['exif'].replace(/(\r\n|\n|\r)/gm, " | ");
                    exif = exif.replace(/,/g, '.');
                    content += item['id'] + ',' + item['wateres'] + ',' + item['source'] + ',' + item['s_date'] + ',' + item['lat'] + ',' + item['lon'] + ',' + item['acc'] + ',' + item['top'] + ',' + item['pump'] + ',' + item['pump_manual'] + ',' + item['other_pump'] + ',' + item['operator'] + ',' + item['operator_type'] + ',' + item['condition'] + ',' + item['disused'] + ',' + item['abandoned'] + ',' + item['access'] + ',' + item['water_presence'] + ',' + item['drinking_water'] + ',' + item['fee'] + ',' + item['fixme'] + ',' + item['note'] + ',' + item['photo'] + ',' + exif + '\n';

                    //fileName = item['source'] + '|' + date;
                    fileName = item['source'];
                }

                fileName = fileName.replace(/\ /g, "_");
                fileName = fileName.replace(/\,/g, "");
                fileName = fileName.replace(/\:/g, "-") + '.csv';

                $('#log').html('<strong>Data has been collected.</strong><br>');
                saveCSV(fileName, content, photoList);
            }
        });
    });
}

//------------------------------SAVE CSV ------------------------------------------>>
function saveCSV(fileName, content, photoList) {
    var fileObject;
    document.addEventListener("deviceready", onDeviceReady, true);

    function onDeviceReady() {
        window.requestFileSystem(LocalFileSystem.TEMPORARY, 0, onFileSystemSuccess, fail);
    }

    function onFileSystemSuccess(fileSystem) {
        fileSystem.root.getFile(fileName, { create: true, exclusive: false }, gotFileEntry, fail);
    }

    function gotFileEntry(fileEntry) {
        fileObject = fileEntry;
        saveFileContent();
    }

    function saveFileContent() {
        fileObject.createWriter(gotFileWriter, fail);
    }

    function gotFileWriter(writer) {
        //var myText = document.getElementById('my_text').value + content;
        var myText = content;
        writer.write(myText);
        writer.onwriteend = function(evt) {
            $('#log').append('<strong>CSV file has been saved.</strong><br><br>');
            var reader = new FileReader();
        };
        uploadFile(fileName, photoList);
    }

    function fail(error) {
        alert('fail to write file code = ' + error.code);
    }
}

//------------------------------------UPLOAD-CSV---------------------------------------->>
function uploadFile(fileName, photoList) {

    var fileURL = "///storage/emulated/0/Android/data/com.rasmata.h2openapp/cache/" + fileName;

    function win(r) {
        // console.log("Code = " + r.responseCode);
        // console.log("Response = " + r.response);
        // console.log("Bytes sent = " + r.bytesSent);
        $('#log').append(r.response + "<br>");
        uploadPhoto(photoList);
    }

    function fail(error) {
        //alert("An error has occurred uploading file: Code = " + error.code);
        // console.log("upload error source: " + error.source);
        // console.log("upload error target: " + error.target);
        $('#log').append("An error has occurred uploading file:<br> "+ fileName +" | Code = " + error.code);
    }

    var uri = encodeURI("http://www.h2openmap.org/uploads/upload.php");

    var options = new FileUploadOptions();
    options.fileKey = "file";
    options.fileName = fileURL.substr(fileURL.lastIndexOf('/') + 1);
    options.mimeType = "text/plain";
    options.chunkedMode = false;

    //var headers = { 'headerParam': 'headerValue' };

    //options.headers = headers;

    options.headers = {
      Connection: "close"
   };

    var ft = new FileTransfer();
    ft.upload(fileURL, uri, win, fail, options);
    $('#contents').html('<strong>Uploading CSV...</strong><br>');
}

//------------------------------------UPLOAD-PHOTO---------------------------------------->>
function uploadPhoto(photoList) {
    $('#counter').html('<strong>0/'+photoList.length+' images + 1 CSV file uploaded</strong><br>');
    $('#log').append("<strong>Start uploading "+ photoList.length +" Images...</strong><br><br>");
    var defs = [];
    var p = 0;
    var q = 0;

    photoList.forEach(function(i,index){
        
        var def = $.Deferred();
        var uri = encodeURI("http://www.h2openmap.org/uploads/upload_photo.php");

        var options = new FileUploadOptions();
        options.fileKey = "file";
        options.fileName = i.substr(i.lastIndexOf('/')+1);
        options.mimeType = "image / jpeg"; 
        options.chunkedMode = false;
        //options.params = { index: index };
        //options.headers = headers;
        options.headers = { Connection: "close" };

        var ft = new FileTransfer(); ft.upload(i, uri, win, fail, options); defs.push(def.promise());

        function win(r) {
            //console.log("upload done");
            //console.log(r);
            if ($.trim(r.response) === "0") {
                //console.log("this one failed");
                $('#log').append('this one failed<br>');
                def.resolve(0);
            } else {
                //console.log("this one passed");
                $('#log').append(r.response + '<br>');
                p = p+(100/photoList.length);
                ++q;
                if (r.responseCode == 200) {
                    $('#counter').html('<strong>'+ q +'/'+photoList.length+' images + 1 CSV file uploaded</strong><br>');
                    $('#progressbar').css('width', p+'%');
                } 
                //console.log(pb);
                def.resolve(1);
            }
        }

        function fail(error) {
            $('#log').append("An error has occurred uploading file:<br> "+ i +" Code = " + error.code);
            //console.log("upload error source" + error.source);
            //console.log("upload error target" + error.target);
            def.resolve(0);
        }
        
    });

    $.when.apply($, defs).then(function() {
        //console.log("All images updated");
        //console.log(arguments);
        $('#message').html('<strong>All files were processed <br>'+ convertDate() +'</strong><br>');

    });
}
