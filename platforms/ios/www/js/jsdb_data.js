//  Declare SQL Query for SQLite
var createStatement = "CREATE TABLE IF NOT EXISTS DATA (id integer primary key autoincrement, source, s_date, lat, lon, acc, photo, exif, wateres, top, pump, pump_manual, other_pump, operator, operator_type, condition, disused, abandoned, access, water_presence, drinking_water, fee, fixme, note)";
var selectAllStatement = "SELECT * FROM DATA";
var selectOneStatement = "SELECT * FROM DATA WHERE id=?";
var insertStatement = "INSERT INTO DATA (source, s_date, lat, lon, acc, photo, exif, wateres, top, pump, pump_manual, other_pump, operator, operator_type, condition, disused, abandoned, access, water_presence, drinking_water, fee, fixme, note) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
var updateStatement = "UPDATE DATA SET source = ?, s_date = ?, lat = ?, lon = ?, acc = ?, photo = ?, exif = ?, wateres = ?, top = ?, pump = ?, pump_manual = ?, other_pump = ?, operator = ?, operator_type = ?, condition = ?, disused = ?, abandoned = ?, access = ?, water_presence = ?, drinking_water = ?, fee = ?, fixme = ?, note = ? WHERE id=?";
var deleteStatement = "DELETE FROM DATA WHERE id=?";
var dropStatement = "DROP TABLE DATA";
var db = openDatabase("h2openapp_db", "1.0", "H2OpenApp DB", 2 * 1024 * 1024); // Open SQLite Database
var dataset;
var DataType;

function initDatabase() {// Function Call When Page is ready.
    try {
        if (!window.openDatabase) // Check browser is supported SQLite or not.
        {
            alert('Databases are not supported in this browser.');
        } else {
            createTable(); // If supported then call Function for create table in SQLite
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

function createTable() { // Function for Create Table in SQLite.
    //db.transaction(function(tx) { tx.executeSql(createStatement, [], showRecords, onError); });
    db.transaction(function(tx) { tx.executeSql(createStatement, [], setPosition, onError); });
}

function insertRecord() { // Get value from Input and insert record . Function Call when Save/Submit Button Click..
    if (validateForm()){
        var _source = $("#source").val();
        var _s_date = $("#s_date").val();
        var _lat = $("#lat").val();
        var _lon = $("#lon").val();
        var _acc = $("#acc").val();
        var _photo = $("#photo").val();
        var _exif = $("#exif").val();
        var _wateres = $("#wateres").val();
        var _top = $("#top").val();
        var _pump = $("#pump").val();
        var _pump_manual = $("#pump_manual").val();
        var _other_pump = $("#other_pump").val();
        var _operator = $("#operator").val();
        var _operator_type = $("#operator_type").val();
        var _condition = $("#condition").val();
        var _disused = $("#disused").val();
        var _abandoned = $("#abandoned").val();
        var _access = $("#access").val();
        var _water_presence = $("#water_presence").val();
        var _drinking_water = $("#drinking_water").val();
        var _fee = $("#fee").val();
        var _fixme = $("#fixme").val();
        var _note = $("#note").val();
        db.transaction(function(tx) { tx.executeSql(insertStatement, [_source, _s_date, _lat, _lon, _acc, _photo, _exif, _wateres, _top, _pump, _pump_manual, _other_pump, _operator, _operator_type, _condition, _disused, _abandoned, _access, _water_presence, _drinking_water, _fee, _fixme, _note], loadAndReset, onError); });
    }
}

function deleteRecord(id) {// Get id of record . Function Call when Delete Button Click..
    //var iddelete = id.toString();
    if (confirm("Are you sure?")) {
	    db.transaction(function(tx) {
	        tx.executeSql(deleteStatement, [id], showRecords, onError);
	        alert("Delete Sucessfully");
	    });
	}
    resetForm();
}

function updateRecord() {// Get id of record . Function Call when Delete Button Click..
    if (validateForm()){
        var _source = $("#source").val();
        var _s_date = $("#s_date").val();
        var _lat = $("#lat").val();
        var _lon = $("#lon").val();
        var _acc = $("#acc").val();
        var _photo = $("#photo").val();
        var _exif = $("#exif").val();
        var _wateres = $("#wateres").val();
        var _top = $("#top").val();
        var _pump = $("#pump").val();
        var _pump_manual = $("#pump_manual").val();
        var _other_pump = $("#other_pump").val();
        var _operator = $("#operator").val();
        var _operator_type = $("#operator_type").val();
        var _condition = $("#condition").val();
        var _disused = $("#disused").val();
        var _abandoned = $("#abandoned").val();
        var _access = $("#access").val();
        var _water_presence = $("#water_presence").val();
        var _drinking_water = $("#drinking_water").val();
        var _fee = $("#fee").val();
        var _fixme = $("#fixme").val();
        var _note = $("#note").val();
        var dataidupdate = $("#id").val();
        db.transaction(function(tx) { tx.executeSql(updateStatement, [_source, _s_date, _lat, _lon, _acc, _photo, _exif, _wateres, _top, _pump, _pump_manual, _other_pump, _operator, _operator_type, _condition, _disused, _abandoned, _access, _water_presence, _drinking_water, _fee, _fixme, _note, Number(dataidupdate)], loadAndReset, onError); });
    }
}

function dropTable() {// Function Call when Drop Button Click.. Talbe will be dropped from database.
    if (confirm("Are you sure?")) {
    	db.transaction(function(tx) { tx.executeSql(dropStatement, [], showRecords, onError); });
    }
    resetForm();
    initDatabase();
    showRecords();
}

function loadRecord(i) {// Function for display records which are retrived from database.
    var item = dataset.item(i);
    $("#id").val((item['id']).toString());
    $("#source").val((item['source']).toString());
    $("#s_date").val((item['s_date']).toString());
    $("#lat").val((item['lat']).toString());
    $("#lon").val((item['lon']).toString());
    $("#acc").val((item['acc']).toString());
    $("#image").attr("src", item['photo']);
    $("#photo").val((item['photo']).toString());
    $("#exif").val((item['exif']).toString());
    $("#wateres").val((item['wateres']).toString());
    $("#top").val((item['top']).toString());
    $("#pump").val((item['pump']).toString());
    $("#pump_manual").val((item['pump_manual']).toString());
    $("#other_pump").val((item['other_pump']).toString());
    $("#operator").val((item['operator']).toString());
    $("#operator_type").val((item['operator_type']).toString());
    $("#condition").val((item['condition']).toString());
    $("#disused").val((item['disused']).toString());
    $("#abandoned").val((item['abandoned']).toString());
    $("#access").val((item['access']).toString());
    $("#water_presence").val((item['water_presence']).toString());
    $("#drinking_water").val((item['drinking_water']).toString());
    $("#fee").val((item['fee']).toString());
    $("#fixme").val((item['fixme']).toString());
    $("#note").val((item['note']).toString());
    $.mobile.pageContainer.pagecontainer("change", "#page1", { reverse: false, transition: "fade", changeHash: false });
    $("#btns_1").html('<button id="btnUpdate" type=submit class="ui-btn ui-shadow ui-corner-all" onclick="updateRecord()">UPDATE</button>');
}

function resetForm() {// Function for reset form input values.
    //$("#myForm").trigger('reset');
    $("#id").val("");
    $("#source").val(setMapper());
    $("#s_date").val(setDate());
    $("#lat").val("");
    $("#lon").val("");
    $("#acc").val("");
    $("#image").attr("src", "css/images/default.png");
    $("#photo").val("");
    $("#exif").val("");
    $("#wateres").val("");
    $("#top").val("");
    $("#pump").val("");
    $("#pump_manual").val("");
    $("#other_pump").val("");
    $("#operator").val("");
    $("#operator_type").val("unknown");
    $("#condition").val("unknown");
    $("#disused").val("no");
    $("#abandoned").val("no");
    $("#access").val("unknown");
    $("#water_presence").val("unknown");
    $("#drinking_water").val("unknown");
    $("#fee").val("no");
    $("#fixme").val("no");
    $("#note").val("");
    $("#btns_1").html('<button id="btnSubmit" type=submit class="ui-btn ui-shadow ui-corner-all" onclick="insertRecord()">SAVE</button>');
}

function loadAndReset() {//Function for Load and Reset...
    resetForm();
    showRecords();
}

function onError(tx, error) {// Function for Hendeling Error...
    alert(error.message);
}

function showRecords() {// Function For Retrive data from Database Display records as list
    db.transaction(function(tx) {
        tx.executeSql(selectAllStatement, [], function(tx, result) {
            dataset = result.rows;
            if (dataset.length!=0){
                var content = '';
	            for (var i = 0, item = null; i < dataset.length; i++) {
	                item = dataset.item(i);
	                content += '<li class="ui-li-has-alt ui-li-has-thumb ui-first-child">' 
                            + '<a class="ui-btn" href="" onclick="showOne(' + item['id'] + ');">'
                            + '<img src="' + item['photo'] + '">'
                            + '<h2>' + item['id'] + ' - ' + item['wateres'] + ' / ' + item['pump_manual'] + '</h2>'
                            + '<p>' + item['s_date'] + '</p>'
                            + '</a><a href="#" onclick="loadRecord(' + i + ');" class="ui-btn ui-btn-icon-notext ui-icon-edit ui-nodisc-icon ui-alt-icon"></a></li>';
	            }
                content += '';
                $.mobile.pageContainer.pagecontainer("change", "#page2", { reverse: false, transition: "fade", changeHash: false });
                $("#btns_2").html('<button id="btnDrop" type=submit class="ui-btn ui-shadow ui-corner-all red-btn" onclick="dropTable()">DROP TABLE</button>');
                $("#results").html(content).listview('refresh',true);
                $("#results").listview('refresh',true);
	        } else {
	        	$.mobile.pageContainer.pagecontainer("change", "#page0", { reverse: false, transition: "fade", changeHash: false });
                resetForm();
	        }
        });
    });
}

function showOne(id) {// Function For Retrive data from Database Display Selected record
    $("#show").html('');
    //var idshow = id.toString();
    db.transaction(function(tx) {
        tx.executeSql(selectOneStatement, [id], function(tx, result) {
            dataset = result.rows;
            for (var i = 0, item = null; i < dataset.length; i++) {
                item = dataset.item(i);
                var content = '<img src="' + item['photo'] + '" style="max-width: 100%; height: auto;" class="ui-corner-all ui-shadow"><br><br>'
                            + '<h2>' + item['id'] + ' - ' + item['wateres'] + ' / ' + item['pump_manual'] + '</h2>'
                            + '<p style="padding:1em; background-color: white;" class="ui-corner-all ui-shadow">' +item['source'] + '<br>' 
                            + item['s_date'] + '<br><br>'
                            + 'lat: ' + item['lat'] + '<br>'
                            + 'lon: ' + item['lon'] + '<br>' 
                            + 'accuracy: ' + item['acc'] + '<br><br>' 
                            + 'top: ' + item['top'] + '<br>' 
                            + 'pump: ' + item['pump'] + '<br>' 
                            + 'pump_manual: ' + item['pump_manual'] + '<br>' 
                            + 'other_pump: ' + item['other_pump'] + '<br><br>' 
                            + 'operator: ' + item['operator'] + '<br>' 
                            + 'operator_type: ' + item['operator_type'] + '<br><br>' 
                            + 'condition: ' + item['condition'] + '<br>' 
                            + 'disused: ' + item['disused'] + '<br>' 
                            + 'abandoned: ' + item['abandoned'] + '<br>' 
                            + 'access: ' + item['access'] + '<br>' 
                            + 'water_presence: ' + item['water_presence'] + '<br>' 
                            + 'drinking_water: ' + item['drinking_water'] + '<br><br>' 
                            + 'fee: ' + item['fee'] + '<br>' 
                            + 'fixme: ' + item['fixme'] + '<br><br>'
                            + 'note: ' + item['note'] + '<br><br>'
                            //+ 'photo: ' + item['photo'] + '<br>' 
                            + 'exif: ' + item['exif'] + '</p>' 
                            + '<a href="#" class="ui-btn ui-shadow ui-icon-edit ui-btn-icon-right ui-nodisc-icon ui-alt-icon ui-corner-all" onclick="loadRecord(' + i + ');">edit</a>' 
                            + '<a href="#" class="ui-btn ui-shadow ui-icon-delete ui-btn-icon-right ui-nodisc-icon ui-alt-icon ui-corner-all" onclick="deleteRecord(' + item['id'] + ');">delete</a>';
				$("#show").append(content);
            }
        });
    });
    $.mobile.pageContainer.pagecontainer("change", "#page4", { reverse: false, transition: "fade", changeHash: false });
    $("#btns_3").html('<button id="btnShow" type=submit class="ui-btn ui-shadow ui-corner-all" onclick="showRecords()">SHOW ALL</button>');
}

$(document).ready(function() {// Call function when page is ready for load..
	initDatabase();
    $("body").fadeIn(2000); // Fede In Effect when Page Load..
    $("#btnSubmit").click(insertRecord); // Register Event Listener when button click.
    $("#btnUpdate").click(updateRecord);
    $("#btnReset").click(resetForm);
    $("#btnDrop").click(dropTable);
    $("#btnShow").click(showRecords);
});