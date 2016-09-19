/*
//  Declare SQL Query for SQLite
var usr_createStatementusr = "CREATE TABLE IF NOT EXISTS USR (id integer primary key autoincrement, usname, password, email, osm_acc, name, famname, photo, note )";
var usr_selectAllStatement = "SELECT * FROM USR";
var usr_selectOneStatement = "SELECT * FROM USR WHERE id=?";
var usr_insertStatement = "INSERT INTO USR (usname, password, email, osm_acc, name, famname, photo, note) VALUES (?,?,?,?,?,?,?,?)";
var usr_updateStatement = "UPDATE USR SET usname = ?, password = ?, email = ?, osm_acc = ?, name = ?, famname = ?, photo = ?, note = ? WHERE id=?";
var usr_deleteStatement = "DELETE FROM USR WHERE id=?";
var usr_dropStatement = "DROP TABLE USR";
var db = usr_openDatabase("h2openapp_db", "1.0", "H2OpenApp DB", 2 * 1024 * 1024); // Open SQLite Database
var usr_dataset;
var usr_DataType;

function usr_initDatabase() { // Function Call When Page is ready.
    try {
        if (!window.usr_openDatabase) // Check browser is supported SQLite or not.
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

function usr_createTable() { // Function for Create Table in SQLite.
    db.transaction(function(tx) { tx.executeSql(usr_createStatement, [], usr_showRecords, usr_onError); });
}

function usr_insertRecord() { // Get value from Input and insert record . Function Call when Save/Submit Button Click..
    validateForm();
    var _usname = $("#usname").val();
    var _password = $("#password").val();
    var _email = $("#email").val();
    var _osm_acc = $("#osm_acc").val();
    var _name = $("#name").val();
    var _famname = $("#famname").val();
    var _photo = $("#photo").val();
    var _note = $("#note").val();
    db.transaction(function(tx) { tx.executeSql(usr_insertStatement, [_usname, _password, _email, _osm_acc, _name, _famname, _photo, _note], loadAndReset, onError); });
}

function deleteRecord(id) { // Get id of record . Function Call when Delete Button Click..
    //var iddelete = id.toString();
    if (confirm("Are you sure?")) {
        db.transaction(function(tx) {
            tx.executeSql(usr_deleteStatement, [id], usr_showRecords, onError);
            alert("Delete Sucessfully");
        });
    }
    resetForm();
}

function updateRecord() { // Get id of record . Function Call when Delete Button Click..
    validateForm();
    var _usname = $("#usname").val();
    var _password = $("#password").val();
    var _email = $("#email").val();
    var _osm_acc = $("#osm_acc").val();
    var _name = $("#name").val();
    var _famname = $("#famname").val();
    var _photo = $("#photo").val();
    var _note = $("#note").val();
    var useridupdate = $("#id").val();
    db.transaction(function(tx) { tx.executeSql(usr_updateStatement, [_usname, _password, _email, _osm_acc, _name, _famname, _photo, _note, Number(useridupdate)], loadAndReset, onError); });
}

function dropTable() { // Function Call when Drop Button Click.. Talbe will be dropped from database.
    if (confirm("Are you sure?")) {
        db.transaction(function(tx) { tx.executeSql(usr_dropStatement, [], usr_showRecords, onError); });
    }
    resetForm();
    usr_initDatabase();
    usr_showRecords();
}

function loadRecord(i) { // Function for display records which are retrived from database.
    var item = usr_dataset.item(i);
    $("#id").val((item['id']).toString());
    $("#usname").val((item['usname']).toString());
    $("#password").val((item['password']).toString());
    $("#email").val((item['email']).toString());
    $("#osm_acc").val((item['osm_acc']).toString());
    $("#name").val((item['name']).toString());
    $("#famname").val((item['famname']).toString());
    $("#photo").val((item['photo']).toString());
    $("#note").val((item['note']).toString());
    $.mobile.pageContainer.pagecontainer("change", "#page1", { reverse: false, transition: "fade", changeHash: false });
    $("#btns_1").html('<button id="btnUpdate" type=submit class="ui-btn ui-shadow ui-corner-all" onclick="updateRecord()">UPDATE</button>');
}

function resetForm() { // Function for reset form input values.
    $("#id").val("");
    $("#usname").val("");
    $("#password").val("");
    $("#email").val("");
    $("#osm_acc").val("");
    $("#name").val("");
    $("#famname").val("");
    $("#photo").val("");
    $("#note").val("");
    $("#btns_1").html('<button id="btnSubmit" type=submit class="ui-btn ui-shadow ui-corner-all" onclick="usr_insertRecord()">SAVE</button>');
    startFunction();
}

function loadAndReset() { //Function for Load and Reset...
    resetForm();
    usr_showRecords()
}

function onError(tx, error) { // Function for Hendeling Error...
    alert(error.message);
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

$(document).ready(function() { // Call function when page is ready for load..
    usr_initDatabase();
    $("body").fadeIn(2000); // Fede In Effect when Page Load..
    $("#btnSubmit").click(usr_insertRecord); // Register Event Listener when button click.
    $("#btnUpdate").click(updateRecord);
    $("#btnReset").click(resetForm);
    $("#btnDrop").click(dropTable);
    $("#btnShow").click(usr_showRecords);
});







function init() { document.addEventListener(“deviceready”, deviceReady, true);
    delete init; }

function deviceReady() {
    $("#userForm").on("submit", function(e) {
        //disable the button so we can't resubmit while we wait
        $("#submitButton", this).attr("disabled", "disabled");
        var _usname = $("#usname", this).val();
        var _pass = $("#pass", this).val();
        var _email = $("#email", this).val();
        var _osm_acc = $("#osm_acc", this).val();
        var _name = $("#name", this).val();
        var _famname = $("#famname", this).val();
        var _photo = $("#photo", this).val();
        var _web_page = $("#web_page", this).val();
        var _note = $("#note", this).val();
        if (_usname != '' && _usname != '' && _email != '') {
            $.post("http://www.h2openmap/users/singnup.php?method=login&returnformat=json", { username: _usname, pass: _pass, email: _email }, function(res) {
                if (res == true) {
                    $.mobile.changePage("some.html");
                } else {
                    navigator.notification.alert("Your login failed", function() {});
                }
                $("#submitButton").removeAttr("disabled");
            }, "json");
        }
        return false;
    });

}

*/


function singUp() {
    console.log("signup");
    var _usname = $("#usname", this).val();
    var _pass = $("#pass", this).val();
    var _email = $("#email", this).val();
    var _osm_acc = $("#osm_acc", this).val();
    var _name = $("#name", this).val();
    var _famname = $("#famname", this).val();
    var _photo = $("#photo", this).val();
    var _web_page = $("#web_page", this).val();
    var _note = $("#note", this).val();
    var dataString = "usname=" + _usname + "&pass=" + _pass + "&email=" + _email + "&osm_acc=" + _osm_acc + "&name=" + _name + "&famname=" + _famname + "&photo=" + _photo + "&web_page=" + _web_page + "&note=" + _note + "&signup=";
    if ($.trim(usname).length > 0 & $.trim(pass).length > 0 & $.trim(email).length > 0) {
        $.ajax({
            type: "POST",
            url: "http://www.h2openmap.org/users/signup.php",
            data: dataString,
            crossDomain: true,
            cache: false,
            beforeSend: function() { $("#signup").val('Connecting...'); },
            success: function(data) {
                //console.log("Response = " + r.response);
                console.log("Response = " + data);
                if (data == "success") {
                    alert("Thank you for Registering with us! you can login now");
                } else if (data = "exist") {
                    alert("Hey! You alreay has account! you can login with us");
                } else if (data = "failed") {
                    alert("Something Went wrong");
                }
            }
        });
    }
    return false;
};
