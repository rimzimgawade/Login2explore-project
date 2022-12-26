/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var jpdbBaseURL = "http://api.login2explore.com:5577";
var jpdbIRL = "/api/irl";
var jpdbIML = "/api/iml";
var studDBName = "STUD-DB";
var studRelationName = "StudData";
connToken = "90938274|-31949273769184860|90952619";

$("#rollno").focus();

function saveRecNo2LS(jsonObj) {
    var lvData = JSON.parse(jsonObj.data);
    localStorage.setItem("recno", lvData.rec_no);
}

function getStudIdAsJsonObj(){
    var rollno = $("rollno").val();
    var jsonStr = {
        id: rollno
    };
    return JSON.stringify(jsonStr);
}

function fillData(jsonObj) {
    saveRecNo2LS(jsonObj);
    var record = JSON.parse(jsonObj.data).record;
    $("#studname").val(record.name);
    $("#class").val(record.class);
    $("#address").val(record.address);
    $("#endate").val(record.endate);
}

function resetForm() {
    
}

function validateData(){
    var empid, empname, empsal, hra, da, deduct;
    empid = $("#empid").val();
    empname = $("#empname").val();
    empsal = $("#empsal").val();
    hra = $("#hra").val();
    da = $("#da").val();
    deduct = $("#deduct").val();
    
    if (rollno === ' ') {
        alert("Student Roll Number is  Missing");
        $("#rollno").focus();
        return  "";
    }
    if (studname === ' ') {
        alert("Student Name is Missing");
        $("#studname").focus();
        return  "";
    }
    if (class === ' ') {
        alert("Student Class is Missing");
        $("#class").focus();
        return  "";
    }
    if (address === ' ') {
        alert("Student Address is Missing");
        $("#address").focus();
        return  "";
    }
    if (endate === ' ') {
        alert("Student Enrollment Date is Missing");
        $("#endate").focus();
        return  "";
    }
    
}

function getStud() {
    var rollNoJsonObj = getRollNoAsJsonObj();
    var getRequest = createGET_BY_KEYRequest(connToken, studDBName, studRelationName, rollNoJsonObj);
    jQuery.ajaxSetup({async: false});
    var resJsonObj = executeCommandAtGivenBaseUrl(getRequest, jpdbBaseURL, jpdbIRL);
   jQuery.ajaxSetup({async: true});
   if (resJsonObj.status === 400){
       $("#save").prop("disabled", false);
       $("#reset").prop("disabled", false);
       $("#studname").focus();
   } else if (resJsonObj.status === 200) {
       $("#empid").prop("disabled", true);
       fillData(resJsonObj);
       $("#change").prop("disabled", false);
       $("#reset").prop("disabled", false);
       $("#studname").focus();
   }
}

function changeData() {
    $("#change").prop("disabled", true);
    jsonChg = validateData();
    var updateRequest = createUPDATERecordRequest(connToken, jsonChg, studDBName, studRelationName, localStorage.getItem("recno"));
    jQuery.ajaxSetup({async: false});
    var resJsonObj  = executeCommandAtGivenBaseUrl(updateRequest, jpdbBaseURL, jpdbIML);
    jQuery.ajaxSetup({async: true});
    console.log(resJsonObj);
    resetForm();
    $("#rollno").focus();
}






















