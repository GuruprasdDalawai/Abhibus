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
    if (!validateName(reg_name, "RegName_err")) {
    } else {
      restErr("RegName_err");
    }

    if (!validatePhoneNumber(reg_phoneNumber, "RegPhone_err")) {
    } else {
      restErr("RegPhone_err");
    }
    if (!ValidateEmail(reg_email, "RegEmai_err")) {
      // displayErr("Invalid Email id", "RegEmai_err");
    } else {
      restErr("RegEmai_err");
    }
    if (!validatePassword(reg_password, "RegPwd_err")) {
      // displayErr("Invalid invalid password", "RegPwd_err");
    } else {
      restErr("RegPwd_err");
    }

    if (!validateCormPassword(reg_crmPwd, "RegCrfmPwd_err")) {
      // displayErr("Invalid password", "RegCrfmPwd_err");
    } else {
      restErr("RegCrfmPwd_err");
    }

    if (
      validateName(reg_name, "RegName_err") &&
      validatePhoneNumber(reg_phoneNumber, "RegPhone_err") &&
      validatePassword(reg_password, "RegPwd_err") &&
      validateCormPassword(reg_crmPwd, "RegCrfmPwd_err")
    ) {
      if (reg_password !== reg_crmPwd) {
        // console(reg_password, reg_crmPwd_err);
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
          reg_list.filter((obj) => obj.mobileNumber === reg_phoneNumber)
            .length > 0
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
      // document.getElementById("RegisterContainer").style.display = "none";
      // document.getElementById("LoginContainer").style.display = "block";
      location.reload();
      console.log("completed");
    }
  } catch (e) {
    console.log(e);
  }
}

function regClose() {
  document.getElementById("RegisterContainer").style.display = "none";
  document.getElementById("LoginContainer").style.display = "block";
  location.reload();
}

function validateName(name, err_ElementID) {
  if (!name) {
    displayErr("Please enter your name.", err_ElementID);
    return false;
  }
  var regex = /^[a-zA-Z]+$/;
  if (!regex.test(name)) {
    displayErr("Name can only contain letters (a-z, A-Z).", err_ElementID);
    return false;
  } else {
    return true;
  }
}

function validatePhoneNumber(reg_phoneNumber, err_ElementID) {
  if (reg_phoneNumber === "") {
    displayErr("Please enter phone number.", err_ElementID);
    return false;
  }
  if (typeof reg_phoneNumber !== "string") {
    displayErr("Invalid phone number format.", err_ElementID);
    return false;
  }

  // Check phone number length (adjust as needed)
  if (reg_phoneNumber.length !== 10) {
    displayErr("Phone number must be 10 digits.", err_ElementID);
    return false;
  }

  // Check if phone number starts with a valid prefix (adjust as needed)
  if (!/^[6-9]\d{9}$/.test(reg_phoneNumber)) {
    displayErr(
      "Phone number must start with 6-9 and contain 10 digits.",
      err_ElementID
    );
    return false;
  }

  return true;
}

function ValidateEmail(email, err_ElementID) {
  if (!email) {
    displayErr("Please enter your email address.", err_ElementID);
    return false;
  }
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
    return true;
  } else {
    displayErr(
      "Please enter a valid email address (e.g., username@domain.com).",
      err_ElementID
    );
    return false;
  }
}

function validatePassword(password, err_ElementID) {
  if (password == "" || password == undefined || password == null) {
    displayErr("Please enter a password.", err_ElementID);
    return false;
  }
  if (password.length < 8) {
    displayErr("Password must be at least 8 characters long.", err_ElementID);
    return false;
  }
  const hasUpper = /[A-Z]/.test(password);
  const hasLower = /[a-z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSpecial = /[!@#$%^&*]/.test(password);

  if (!hasUpper) {
    displayErr(
      "Password must contain at least one uppercase letter.",
      err_ElementID
    );
    return false;
  }

  if (!hasLower) {
    displayErr(
      "Password must contain at least one lowercase letter.",
      err_ElementID
    );
    return false;
  }

  if (!hasNumber) {
    displayErr("Password must contain at least one number.", err_ElementID);
    return false;
  }

  if (!hasSpecial) {
    displayErr(
      "Password must contain at least one special character.",
      err_ElementID
    );
    return false;
  }
  return true;
}

function validateCormPassword(pwd, err_ElementID) {
  if (pwd == "" || pwd == undefined || pwd == null) {
    displayErr("Please enter a password.", err_ElementID);
    return false;
  }
  return true;
}
function displayErr(message, elemntID) {
  let elemnt = document.getElementById(elemntID);
  elemnt.textContent = message;
  elemnt.style.visibility = "visible";
}

function restErr(elemntID) {
  let elemnt = document.getElementById(elemntID);
  elemnt.innerHTML = "";
  elemnt.style.visibility = "hidden";
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
    debugger;
    let login_phonenumber = document.getElementById("login_phonenumber").value;
    let login_password = document.getElementById("login_password").value;

    if (!validatePhoneNumber(login_phonenumber, "phone_err")) {
      //displayErr("Invalid Phone Number", "phone_err");
    } else {
      restErr("phone_err");
    }

    if (!validatePassword(login_password, "pwd_err")) {
      //displayErr("Invalid invalid password", "pwd_err");
    } else {
      restErr("pwd_err");
    }

    if (
      validatePhoneNumber(login_phonenumber, "phone_err") &&
      validatePassword(login_password, "pwd_err")
    ) {
      let reg_list = [];
      if (login_phonenumber == "9611796790" && login_password === "Admin@107") {
        console.log(" adminlogin");
        localStorage.setItem("isLogin", "admin");
        location.href = "./admin.html";
        return;
      }
      if (localStorage.getItem("reglist") !== null) {
        reg_list = JSON.parse(localStorage.getItem("reglist"));
        reg_list = [...reg_list];
        let res = reg_list.filter(
          (obj) => obj.mobileNumber === login_phonenumber
        );
        if (res.length == 0) {
          displayErr("This phone number is not registered", "phone_err");
          return;
        } else {
          if (res[0].password === login_password) {
            localStorage.setItem("isLogin", login_phonenumber);
            setTimeout(() => {
              location.href = "user.html";
            }, 2000);
          } else {
            displayErr("Invalid password", "pwd_err");
          }
        }
      } else {
        alert("no localstorage");
      }
    }
    // document.getElementById("login_phonenumber").value = "";
    // document.getElementById("login_password").value = "";
  } catch (e) {
    console.log(e);
  }
}

function resetRegister() {
  debugger;
  let reg_name = (document.getElementById("RegName").value = "");
  let reg_email = (document.getElementById("RegEmail").value = "");
  let reg_phoneNumber = (document.getElementById("RegPhoneNumber").value = "");
  let reg_password = (document.getElementById("RegPassword").value = "");
  let reg_crmPwd = (document.getElementById("RegConfirmPassword").value = "");
  //Err elements
  document.getElementById("RegName_err").style.visibility = "hidden";
  document.getElementById("RegEmai_err").style.visibility = "hidden";
  document.getElementById("RegPhone_err").style.visibility = "hidden";
  document.getElementById("RegPwd_err").style.visibility = "hidden";
  document.getElementById("RegCrfmPwd_err").style.visibility = "hidden";
}

// function LoginvalidatePhoneNumber(reg_phoneNumber, err_ElementID) {
//   if (reg_phoneNumber === "") {
//     displayErr("Please provide phone number.", err_ElementID);
//     return false;
//   }

//   if (typeof reg_phoneNumber !== "string") {
//     displayErr("Invalid phone number format.", err_ElementID);
//     return false;
//   }

//   // Check phone number length (adjust as needed)
//   if (reg_phoneNumber.length !== 10) {
//     displayErr("Phone number must be 10 digits.", err_ElementID);
//     return false;
//   }

//   // Check if phone number starts with a valid prefix (adjust as needed)
//   if (!/^[6-9]\d{9}$/.test(reg_phoneNumber)) {
//     displayErr(
//       "Phone number must start with 6-9 and contain 10 digits.",
//       "phone_err"
//     );
//     return false;
//   }

//   return true;
// }

// function LoginvalidatePassword(pwd) {
//   if (pwd == "" || pwd == undefined || pwd == null) {
//     displayErr("Please enter a password.", "pwd_err");
//     return false;
//   }
//   return true;
// }
