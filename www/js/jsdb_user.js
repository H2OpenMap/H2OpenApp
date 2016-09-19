//  Declare SQL Query for SQLite
var usr_createStatement = "CREATE TABLE IF NOT EXISTS USR (id integer primary key autoincrement, usname, pass, email, osm_acc, name, famname, photo, org, web_page, us_note )";
var usr_selectAllStatement = "SELECT * FROM USR";
var usr_selectOneStatement = "SELECT * FROM USR WHERE id=?";
var usr_insertStatement = "INSERT INTO USR (usname, pass, email, osm_acc, name, famname, photo, org, web_page, us_note) VALUES (?,?,?,?,?,?,?,?,?,?)";
var usr_updateStatement = "UPDATE USR SET usname = ?, pass = ?, email = ?, osm_acc = ?, name = ?, famname = ?, photo = ?, org = ?, web_page = ?, us_note = ? WHERE id=?";
var usr_deleteStatement = "DELETE FROM USR WHERE id=?";
var usr_dropStatement = "DROP TABLE USR";
var db = openDatabase("h2openapp_db", "1.0", "H2OpenApp DB", 2 * 1024 * 1024); // Open SQLite Database
var usr_dataset;
var usr_DataType;

function usr_createTable() { // Function for Create Table in SQLite.
    db.transaction(function(tx) { tx.executeSql(usr_createStatement, [], usr_onSuccess, onError); });
}

function singUp() {
    var networkState = navigator.connection.type;
    checkConnection();
    if (networkState == Connection.NONE) {
        $.mobile.pageContainer.pagecontainer("change", "#page5", { reverse: false, transition: "fade", changeHash: false });
        alert('you cannot Login without network,\nplease check your connection.');
    }

    var error = '';
    var usname = $("#usname").val();
    var pass = $("#pass").val();
    var conf_pass = $("#conf_pass").val();
    var email = $("#email").val();
    var osm_acc = $("#osm_acc").val();
    var name = $("#name").val();
    var famname = $("#famname").val();
    var photo = $("#us_photo").val();
    var org = $("#org").val();
    var web_page = $("#web_page").val();
    var us_note = $("#us_note").val();

    if (usname ==''){ 
        //document.getElementById("usname").placeolder = "<span style='text-align: center; color: red;''>user name is empty</span>";
        error += 'user name is empty\n';
    }
    if (pass ==''){
        //document.getElementById("pass").placeolder = "<span style='text-align: center; color: red;''>password is empty</span>";
        error += 'password is empty\n';
    }
    if (email ==''){
        //document.getElementById("email").placeolder = "<span style='text-align: center; color: red;''>email is empty</span>";
        error += 'email is empty\n';
    }
    if (pass!=conf_pass){
        //document.getElementById("conf_pass").placeolder = "<span style='text-align: center; color: red;''>confirm don't match or empty</span>";
        error += 'confirm do not match passwordor empty\n';
    } 
    if (error != ''){
        $.mobile.pageContainer.pagecontainer( "getActivePage" );
        alert(error);
    } else if (error == '') {
        console.log(error);
        var dataString  = "usname=" + usname 
                        + "&pass=" + pass 
                        + "&email=" + email 
                        + "&osm_acc=" + osm_acc 
                        + "&name=" + name 
                        + "&famname=" + famname 
                        + "&photo=" + photo 
                        + "&org=" + org 
                        + "&web_page=" + web_page 
                        + "&us_note=" + us_note 
                        + "&signup=";
        
        //console.log(dataString);
        if ($.trim(usname).length > 0 & $.trim(pass).length > 0 & $.trim(email).length > 0) {
            $.ajax({
                type: "POST",
                url: "http://www.h2openmap.org/users/mail.php",
                data: dataString,
                crossDomain: true,
                cache: false,
                beforeSend: function() { $("#signup").val('Connecting...'); },
                success: function(data) {
                    //console.log("Response = '"+data+"'");
                    if (data == "success") {
                        alert("Thank you for registering!\n check your email to activate the account and then login!");
                        $.mobile.pageContainer.pagecontainer("change", "#page6", { reverse: false, transition: "fade", changeHash: false });
                    } else if (data == "exist") {
                        alert("You alreay has an account! you can login with us");
                        $.mobile.pageContainer.pagecontainer("change", "#page6", { reverse: false, transition: "fade", changeHash: false });
                    } else if (data == "failed") {
                        alert("Something Went wrong,\n  please retry!");
                    }
                }
            });
        } 
        return false;
    }
}

function logIn() {
    var networkState = navigator.connection.type;
    checkConnection();
    if (networkState == Connection.NONE) {
        $.mobile.pageContainer.pagecontainer("change", "#page6", { reverse: false, transition: "fade", changeHash: false });
        alert('you cannot Login without network,\nplease check your connection.');
    }

    var email = $("#l_email").val();
    var pass = $("#l_pass").val();
    
    var dataString = "email=" + email + "&pass=" + pass + "&login=";
    //console.log(dataString);
    if ($.trim(email).length > 0 & $.trim(pass).length > 0) {
        $.ajax({
            type: "POST",
            url: "http://www.h2openmap.org/users/mail.php",
            data: dataString,
            crossDomain: true,
            cache: false,
            beforeSend: function() { $("#signup").val('Connecting...');},
            success: function(data) {
                if (data != "failed") {
                    alert("Login success");
                    //console.log("Login success");
                    //console.log("data = " + data);
                    var userData = JSON.parse(data);
                    //console.log("Response2 = " + data.usname);
                    // var userData='';
                    // localStorage.setItem(userData, data); // Pass a key name and its value to add or update that key.
                    // userData = localStorage.getItem(userData);
                    // userData =  JSON.parse(userData);
                    //console.log("user = " + userData.usname);
                    var usname = userData.usname;
                    var pass = userData.pass;
                    var email = userData.email;
                    var osm_acc = userData.osm_acc;
                    var name = userData.name;
                    var famname = userData.famname;
                    var photo = userData.photo;
                    var org = userData.org;
                    var web_page = userData.web_page;
                    var us_note = userData.us_note;
                    if (userData.usname!=''){
                        db.transaction(function(tx) { tx.executeSql(usr_insertStatement, [usname, pass, email, osm_acc, name, famname, photo, org, web_page, us_note], usr_onSuccess, onError); });
                    } else {
                        alert("this user do not exist retry or register");
                        $.mobile.pageContainer.pagecontainer("change", "#page6", { reverse: false, transition: "fade", changeHash: false });
                        console.log("data failed = " + data);
                    }
                    //for(var key in userData) {
                    //console.log(key+": "+userData[key]);
                    //}
                } else if (data = "failed") {
                    alert("This user do not exist\n or not active yet.\n Verify your activation email\n or register");
                    $.mobile.pageContainer.pagecontainer("change", "#page6", { reverse: false, transition: "fade", changeHash: false });
                    console.log("data failed = " + data);
                }
            }
        });
    }
    return true;
}

function usr_onSuccess(){
    //console.log('user data stored locally');
    getUser();
    //onDeviceReady();
}

function confirmFunction() {
    console.log("confirm");
    //getUser();
}

function getUser() { // Function For Retrive data from Database Display records as list
    db.transaction(function(tx) {
        tx.executeSql(usr_selectOneStatement, [1], function(tx, result) {
            dataset = result.rows;
            for (var i = 0, item = null; i < dataset.length; i++) {
                item = dataset.item(i);
            }
            if (!item) {
                alert("no source defined,\nplease log in!");
                $.mobile.pageContainer.pagecontainer("change", "#page6", { reverse: false, transition: "fade", changeHash: false });
                $('#us_1').hide();
                $('#login').show();
                $('#logout').hide();
            } else if (item['usname'] && item['usname']!='') {
                document.getElementById("source").value = item['usname'];
                $('#us_1').show();
                $('#login').hide();
                $('#logout').show();
            }
        });
    })
}

function deleteUser(id) {// Function Call when Drop Button Click.. Talbe will be dropped from database.
    if (confirm("Are you sure?")) {
        var usname = '';
        var pass = '';
        var email = '';
        var osm_acc = '';
        var name = '';
        var famname = '';
        var photo = '';
        var web_page = '';
        var us_note = '';
        $("#source").val("");
        console.log('user deleted');
        //$.mobile.pageContainer.pagecontainer("change", "#page4", { reverse: false, transition: "fade", changeHash: false });
        db.transaction(function(tx) { tx.executeSql(usr_deleteStatement, [id], confirmFunction, onError); });
    }
}

function dropUsers() {// Function Call when Drop Button Click.. Talbe will be dropped from database.
    if (confirm("Are you sure?")) {
        var usname = '';
        var pass = '';
        var email = '';
        var osm_acc = '';
        var name = '';
        var famname = '';
        var photo = '';
        var web_page = '';
        var us_note = '';
        $("#source").val("");
        //console.log('user table dropped');
        //$.mobile.pageContainer.pagecontainer("change", "#page4", { reverse: false, transition: "fade", changeHash: false });
        db.transaction(function(tx) { tx.executeSql(usr_dropStatement, [], usr_createTable, onError); });
    }
}



function showUser(id) {
    //var idshow = id.toString();
    db.transaction(function(tx) {
        tx.executeSql(usr_selectOneStatement, [id], function(tx, result) {
            usr_dataset = result.rows;
            $("#show").html('');
            if (usr_dataset.length!=0){
                for (var i = 0, item = null; i < usr_dataset.length; i++) {
                    item = usr_dataset.item(i);
                    var content = '<!--<img src="' + item['photo'] + '" style="max-width: 100%; height: auto;" class="ui-corner-all ui-shadow">--><br><br>'
                                + '<h2>' + item['id'] + ' - ' + item['usname'] + '</h2>'
                                + '<p style="padding:1em; background-color: white;" class="ui-corner-all ui-shadow">' 
                                + item['email'] + '<br>' 
                                + 'OSM account: ' + item['osm_acc'] + '<br><br>'
                                + 'name: ' + item['name'] + '<br>' 
                                + 'fam. name: ' + item['famname'] + '<br><br>' 
                                + 'organization: ' + item['org'] + '<br>' 
                                + 'web page: ' + item['web_page'] + '<br>' 
                                + 'note: ' + item['us_note']['val'] + '<br><br>'
                                + 'photo: ' + item['photo'] + '</p>' 
                                + '<a href="#" class="ui-btn ui-icon-logout ui-btn-icon-right ui-nodisc-icon ui-alt-icon ui-corner-all" onclick="dropUsers();">log out</a>';
                    $("#show").append(content);
                    $.mobile.pageContainer.pagecontainer("change", "#page4", { reverse: false, transition: "fade", changeHash: false });
                    $("#btns_3").html('');

                } 
            } else {
                noUserlogin();
            }
            
        });
    });
    $.mobile.pageContainer.pagecontainer("change", "#page4", { reverse: false, transition: "fade", changeHash: false });
    $("#btns_3").html('');
}

function noUserlogin(){
    $("#show").html('<h1>No user Loged in</h1>');
    $("#show").append('<a href="#page6" class="ui-btn ui-corner-all">login</a>');
    $.mobile.pageContainer.pagecontainer("change", "#page4", { reverse: false, transition: "fade", changeHash: false });
}

/*
function validateUsername(){
    if ($("#usname").val() ==''){ 
        document.getElementById("usname").placeolder = "<span style='text-align: center; color: red;''>user name is empty</span>";
        error = 1;
    }
}

function usr_showRecords() { // Function For Retrive data from Database Display records as list
    db.transaction(function(tx) {
        tx.executeSql(usr_selectAllStatement, [], function(tx, result) {
            usr_dataset = result.rows;
            if (usr_dataset.length != 0) {
                var content = '';
                for (var i = 0, item = null; i < usr_dataset.length; i++) {
                    item = usr_dataset.item(i);
                    content += '<li class="ui-li-has-alt ui-li-has-thumb ui-first-child">' + '<a class="ui-btn" href="" onclick="showUser(' + item['id'] + ');">' + '<img src="' + item['photo'] + '">' + '<h2>' + item['id'] + ' - ' + item['usname'] + '</h2>' + '<p>' + item['email'] + '</p>' + '</a><a href="#" onclick="loadRecord(' + i + ');" class="ui-btn ui-btn-icon-notext ui-icon-edit ui-nodisc-icon ui-alt-icon"></a></li>';
                }
                content += '';
                $("#results").html(content).listview('refresh', true);
                $("#results").listview('refresh', true);
            } else {
                noUserlogin();
            }
        });
    });
    $.mobile.pageContainer.pagecontainer("change", "#page2", { reverse: false, transition: "fade", changeHash: false });
    $("#btns_2").html('<button id="btnDrop" type=submit class="ui-btn ui-shadow ui-corner-all red-btn" onclick="dropUsers()">DROP TABLE</button>');
}

function cleanUserTable(id) {// Function Call when Drop Button Click.. Talbe will be dropped from database.
    if (confirm("Are you sure?")) {
        var usname = '';
        var pass = '';
        var email = '';
        var osm_acc = '';
        var name = '';
        var famname = '';
        var photo = '';
        var web_page = '';
        var us_note = '';
        $("#source").val("");
        console.log('user deleted');
        $.mobile.pageContainer.pagecontainer("change", "#page4", { reverse: false, transition: "fade", changeHash: false });
        db.transaction(function(tx) { tx.executeSql(usr_deleteStatement, [id], confirmFunction, onError); });
    }
}

function delUser(id) {// Function Call when Drop Button Click.. Talbe will be dropped from database.
    if (confirm("Are you sure?")) {
        db.transaction(function(tx) { tx.executeSql(usr_deleteStatement, [id], confirmFunction, onError); });
        var usname = '';
    var pass = '';
    var email = '';
    var osm_acc = '';
    var name = '';
    var famname = '';
    var photo = '';
    var web_page = '';
    var us_note = '';
    console.log('user deleted');
    }
}

function usr_insertRecord() { // Get value from Input and insert record . Function Call when Save/Submit Button Click..
    //validateForm();
    var usname = $("#usname").val();
    var pass = $("#pass").val();
    var email = $("#email").val();
    var osm_acc = $("#osm_acc").val();
    var name = $("#name").val();
    var famname = $("#famname").val();
    var photo = $("#photo").val();
    var web_page = $("#web_page").val();
    var us_note = $("#us_note").val();
    //db.transaction(function(tx) { tx.executeSql(usr_insertStatement, [_usname, _pass, _email, _osm_acc, _name, _famname, _photo, _web_page, _note], usr_loadAndReset, onError); });
    db.transaction(function(tx) { tx.executeSql(usr_insertStatement, [_usname, _pass, _email, _osm_acc, _name, _famname, _photo, _web_page, _note], getUser, onError); });
}

function usr_initDatabase() { // Function Call When Page is ready.
    try {
        if (!window.openDatabase) // Check browser is supported SQLite or not.
        {
            alert('Databases are not supported in this browser.');
        } else {
            usr_createTable(); // If supported then call Function for create table in SQLite
        }
    } catch (e) {
        if (e == 2) {
            // Version number mismatch. 
            console.log("Invalid database version.");
        } else {
            console.log("Unknown error " + e + ".");
        }
        return;
    }
}

function usr_insertRecord() { // Get value from Input and insert record . Function Call when Save/Submit Button Click..
    //validateForm();
    var usname = $("#usname").val();
    var pass = $("#pass").val();
    var email = $("#email").val();
    var osm_acc = $("#osm_acc").val();
    var name = $("#name").val();
    var famname = $("#famname").val();
    var photo = $("#photo").val();
    var web_page = $("#web_page").val();
    var us_note = $("#us_note").val();
    //db.transaction(function(tx) { tx.executeSql(usr_insertStatement, [_usname, _pass, _email, _osm_acc, _name, _famname, _photo, _web_page, _note], usr_loadAndReset, onError); });
    db.transaction(function(tx) { tx.executeSql(usr_insertStatement, [_usname, _pass, _email, _osm_acc, _name, _famname, _photo, _web_page, _note], usr_showData, onError); });
}

function usr_showData(id) { // Function For Retrive data from Database Display records as list
    $("#show").html('');
    //var idshow = id.toString();
    if (db.transaction(function(tx) {
        tx.executeSql(usr_selectOneStatement, [1], function(tx, result) {
            usr_dataset = result.rows;
            for (var i = 0, item = null; i < usr_dataset.length; i++) {
                item = usr_dataset.item(i);
                var content = '<img src="' + item['photo'] + '" style="max-width: 100%; height: auto;" class="ui-corner-all ui-shadow"><br><br>' + '<h2>' + item['id'] + ' - ' + item['usname'] + '</h2>' + '<p style="padding:1em; background-color: white;" class="ui-corner-all ui-shadow">' + item['email'] + '<br>' + item['s_date'] + '<br>' + 'OSM Account:' + item['osm_acc'] + '<br><br>' + 'name: ' + item['name'] + '<br>' + 'famname: ' + item['famname'] + '<br>' + 'web_page: ' + item['web_page'] + '<br>' + 'note: ' + item['us_note'] + '<br><br>' + '<a href="#" class="ui-btn ui-shadow ui-icon-edit ui-btn-icon-right ui-nodisc-icon ui-alt-icon ui-corner-all" onclick="loadRecord(' + i + ');">edit</a>' + '<a href="#" class="ui-btn ui-shadow ui-icon-delete ui-btn-icon-right ui-nodisc-icon ui-alt-icon ui-corner-all" onclick="deleteRecord(' + item['id'] + ');">delete</a>';
                $("#show").append(content);
            }
        });
    })) {
        $.mobile.pageContainer.pagecontainer("change", "#page4", { reverse: false, transition: "fade", changeHash: false });
        $("#btns_3").html('<button id="btnShow" type=submit class="ui-btn ui-shadow ui-corner-all" onclick="usr_showRecords()">SHOW ALL</button>');
    } else {
        $.mobile.pageContainer.pagecontainer("change", "#page6", { reverse: false, transition: "fade", changeHash: false });
    }
}

$(document).ready(function() { // Call function when page is ready for load..
    usr_initDatabase();
    //$("body").fadeIn(2000); // Fede In Effect when Page Load..
    //$("#btnSubmit").click(usr_insertRecord); // Register Event Listener when button click.
    //$("#btnUpdate").click(updateRecord);
    //$("#btnReset").click(resetForm);
    //$("#btnDrop").click(dropTable);
    //$("#btnShow").click(usr_showRecords);
});

function deleteRecord(id) { // Get id of record . Function Call when Delete Button Click..
    //var iddelete = id.toString();
    if (confirm("Are you sure?")) {
        db.transaction(function(tx) {
            tx.executeSql(usr_deleteStatement, [id], usr_showRecords, onError);
            alert("Delete Sucessfully");
        });
    }
    usr_resetForm();
}

function updateRecord() { // Get id of record . Function Call when Delete Button Click..
    validateForm();
    var usname = $("#usname").val();
    var pass = $("#pass").val();
    var email = $("#email").val();
    var osm_acc = $("#osm_acc").val();
    var name = $("#name").val();
    var famname = $("#famname").val();
    var photo = $("#photo").val();
    var web_page = $("#web_page").val();
    var us_note = $("#us_note").val();
    var useridupdate = $("#id").val();
    db.transaction(function(tx) { tx.executeSql(usr_updateStatement, [_usname, _pass, _email, _osm_acc, _name, _famname, _photo, _web_page, _note, Number(useridupdate)], usr_loadAndReset, onError); });
}

function dropTable() { // Function Call when Drop Button Click.. Talbe will be dropped from database.
    if (confirm("Are you sure?")) {
        db.transaction(function(tx) { tx.executeSql(usr_dropStatement, [], usr_showRecords, onError); });
    }
    usr_resetForm();
    usr_initDatabase();
    usr_showRecords();
}

function usr_loadRecord(i) { // Function for display records which are retrived from database.
    var item = usr_dataset.item(i);
    $("#id").val((item['id']).toString());
    $("#usname").val((item['usname']).toString());
    $("#pass").val((item['pass']).toString());
    $("#email").val((item['email']).toString());
    $("#osm_acc").val((item['osm_acc']).toString());
    $("#name").val((item['name']).toString());
    $("#famname").val((item['famname']).toString());
    $("#photo").val((item['photo']).toString());
    $("#web_page").val((item['web_page']).toString());
    $("#us_note").val((item['us_note']).toString());
    $.mobile.pageContainer.pagecontainer("change", "#page1", { reverse: false, transition: "fade", changeHash: false });
    $("#btns_1").html('<button id="btnUpdate" type=submit class="ui-btn ui-shadow ui-corner-all" onclick="updateRecord()">UPDATE</button>');
}

function resetForm() { // Function for reset form input values.
    $("#id").val("");
    $("#usname").val("");
    $("#pass").val("");
    $("#email").val("");
    $("#osm_acc").val("");
    $("#name").val("");
    $("#famname").val("");
    $("#photo").val("");
    $("#web_page").val("");
    $("#note").val("");
    $("#btns_1").html('<button id="btnSubmit" type=submit class="ui-btn ui-shadow ui-corner-all" onclick="usr_insertRecord()">SAVE</button>');
    startFunction();
}

function usr_loadAndReset() { //Function for Load and Reset...
    usr_resetForm();
    usr_showRecords()
}

function usr_showRecords() { // Function For Retrive data from Database Display records as list
    db.transaction(function(tx) {
        tx.executeSql(usr_selectAllStatement, [], function(tx, result) {
            usr_dataset = result.rows;
            if (usr_dataset.length != 0) {
                var content = '';
                for (var i = 0, item = null; i < usr_dataset.length; i++) {
                    item = usr_dataset.item(i);
                    content += '<li class="ui-li-has-alt ui-li-has-thumb ui-first-child">' + '<a class="ui-btn" href="" onclick="showOne(' + item['id'] + ');">' + '<img src="' + item['photo'] + '">' + '<h2>' + item['id'] + ' - ' + item['usname'] + '</h2>' + '<p>' + item['email'] + '</p>' + '</a><a href="#" onclick="loadRecord(' + i + ');" class="ui-btn ui-btn-icon-notext ui-icon-edit ui-nodisc-icon ui-alt-icon"></a></li>';
                }
                content += '';
                $("#results").html(content).listview('refresh', true);
                $("#results").listview('refresh', true);
            } else {
                $.mobile.pageContainer.pagecontainer("change", "#page1", { reverse: false, transition: "fade", changeHash: false });
            }
        });
    });
    $.mobile.pageContainer.pagecontainer("change", "#page2", { reverse: false, transition: "fade", changeHash: false });
    $("#btns_2").html('<button id="btnDrop" type=submit class="ui-btn ui-shadow ui-corner-all red-btn" onclick="dropTable()">DROP TABLE</button>');
}

function showOne(id) { // Function For Retrive data from Database Display records as list
    $("#show").html('');
    //var idshow = id.toString();
    db.transaction(function(tx) {
        tx.executeSql(usr_selectOneStatement, [id], function(tx, result) {
            usr_dataset = result.rows;
            for (var i = 0, item = null; i < usr_dataset.length; i++) {
                item = usr_dataset.item(i);
                var content = '<img src="' + item['photo'] + '" style="max-width: 100%; height: auto;" class="ui-corner-all ui-shadow"><br><br>' + '<h2>' + item['id'] + ' - ' + item['usname'] + '</h2>' + '<p style="padding:1em; background-color: white;" class="ui-corner-all ui-shadow">' + item['email'] + '<br>' + item['s_date'] + '<br>' + 'OSM Account:' + item['osm_acc'] + '<br><br>' + 'name: ' + item['name'] + '<br>' + 'famname: ' + item['famname'] + '<br>' + 'note: ' + item['note'] + '<br><br>' + '<a href="#" class="ui-btn ui-shadow ui-icon-edit ui-btn-icon-right ui-nodisc-icon ui-alt-icon ui-corner-all" onclick="loadRecord(' + i + ');">edit</a>' + '<a href="#" class="ui-btn ui-shadow ui-icon-delete ui-btn-icon-right ui-nodisc-icon ui-alt-icon ui-corner-all" onclick="deleteRecord(' + item['id'] + ');">delete</a>';
                $("#show").append(content);
            }
        });
    });
    $.mobile.pageContainer.pagecontainer("change", "#page4", { reverse: false, transition: "fade", changeHash: false });
    $("#btns_3").html('<button id="btnShow" type=submit class="ui-btn ui-shadow ui-corner-all" onclick="usr_showRecords()">SHOW ALL</button>');
}
*/