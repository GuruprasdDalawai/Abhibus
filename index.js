function showRegister() {
  document.getElementById("RegisterContainer").style.display = "block";
  document.getElementById("LoginContainer").style.display = "none";
}

function registerBtn() {
  try {
    let reg_name = document.getElementById("RegName").value;
    let reg_email = document.getElementById("RegEmail").value;
    let reg_phoneNumber = document.getElementById("RegPhoneNumber").value;
    let reg_password = document.getElementById("RegPassword").value;
    let reg_crmPwd = document.getElementById("RegConfirmPassword").value;

    //Eelemtnts
    let reg_name_err = document.getElementById("RegName_err");
    let reg_email_err = document.getElementById("RegEmail_err");
    let reg_phoneNuber_err = document.getElementById("RegPhoneNumber_err");
    let reg_password_err = document.getElementById("RegPassword_err");
    let reg_crmPwd_err = document.getElementById("RegConfirmPassword_err");

    if (!validateName(reg_name)) {
      displayErr("Invalid Name", "RegName_err");
      return;
    } else {
      restErr("RegName_err");
    }

    if (!validatePhoneNumber(reg_phoneNumber)) {
      displayErr("Invalid Phone Number", "RegPhone_err");
      return;
    } else {
      restErr("RegPhone_err");
    }
    if (!ValidateEmail(reg_email)) {
      displayErr("Invalid Email id", "RegEmai_err");
      return;
    } else {
      restErr("RegEmai_err");
    }
    if (!validatePassword(reg_password)) {
      displayErr("Invalid invalid password", "RegPwd_err");
      return;
    } else {
      restErr("RegPwd_err");
    }
    if (reg_password !== reg_crmPwd) {
      console(reg_password, reg_crmPwd_err);
      displayErr("Password did not match", "RegCrfmPwd_err");
      return;
    } else {
      restErr("RegCrfmPwd_err");
    }

    let reg_list = [];

    if (localStorage.getItem("reglist") !== null) {
      reg_list = JSON.parse(localStorage.getItem("reglist"));
      reg_list = [...reg_list];
      if (
        reg_list.filter((obj) => obj.mobileNumber === reg_phoneNumber).length >
        0
      ) {
        displayErr("This phone Number is already registered", "RegPhone_err");
        return;
      }
    }
    reg_list.push({
      name: reg_name,
      mobileNumber: reg_phoneNumber,
      email: reg_email,
      password: reg_password,
    });

    localStorage.setItem("reglist", JSON.stringify(reg_list));
    localStorage.setItem("isLogin", reg_phoneNumber);
    location.href = "./user.html";
    conseol.log("completed");
  } catch (e) {
    console.log(e);
  }
}

function regClose() {
  document.getElementById("RegisterContainer").style.display = "none";
  document.getElementById("LoginContainer").style.display = "block";
}

function validateName(name) {
  var regex = /^[a-zA-Z]+$/;
  if (!regex.test(name)) {
    return false;
  } else {
    return true;
  }
}

function validatePhoneNumber(phoneNum) {
  if (phoneNum.length > 6 && phoneNum.length < 11) {
    return true;
  }
  return false;
}

function ValidateEmail(email) {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
    return true;
  }
  return false;
}

function validatePassword(pwd) {
  if (pwd !== "" && pwd !== undefined && pwd !== "") {
    return true;
  }
  return false;
}
function displayErr(message, elemntID) {
  let elemnt = document.getElementById(elemntID);
  elemnt.textContent = message;
  elemnt.parentElement.style.display = "block";
}

function restErr(elemntID) {
  let elemnt = document.getElementById(elemntID);
  elemnt.parentElement.style.display = "none";
}

function Resetments() {
  document.getElementById("RegName").value = "";
  document.getElementById("RegEmail").value = "";
  document.getElementById("RegPhoneNumber").value = "";
  document.getElementById("RegPassword").value = "";
  document.getElementById("RegConfirmPassword").value = "";
}

function loginBtn() {
  try {
    let login_phonenumber = document.getElementById("login_phonenumber").value;
    let login_password = document.getElementById("login_password").value;

    if (!validatePhoneNumber(login_phonenumber)) {
      displayErr("Invalid Phone Number", "phone_err");
      return;
    } else {
      restErr("phone_err");
    }

    console.log("starting ");
    // if (!validatePassword(reg_password)) {
    //   console.log("working dddeeee");
    //   displayErr("Invalid invalid password", "pwd_err");
    //   return;
    // } else {
    //   console.log("working reseterr");
    //   restErr("pwd_err");
    // }

    let reg_list = [];

    console.log(login_phonenumber, login_password);

    if (login_phonenumber == "1234567890" && login_password === "admin") {
      console.log(" adminlogin");
      location.href = "./admin.html";
      return;
    }

    console.log("user seaarch starts");

    if (localStorage.getItem("reglist") !== null) {
      reg_list = JSON.parse(localStorage.getItem("reglist"));
      reg_list = [...reg_list];
      let res = reg_list.filter(
        (obj) => obj.mobileNumber === login_phonenumber
      );
      if (res.length == 0) {
        displayErr("Invalid PhoneNumber", "phone_err");
        return;
      } else {
        if (res[0].password === login_password) {
          console.log("you successfully loged in");
          location.href = "./user.html";
        } else {
          displayErr("Invalid password", "pwd_err");
        }
      }
    } else {
      alert("no localstorage");
    }
    reg_list = console.log(login_phonenumber, login_password);
  } catch (e) {
    conseol.log(e);
  }
}
