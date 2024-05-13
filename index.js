let loginBtn = document.getElementById("login_btn");
let registerBtn = document.getElementById("register_btn");
loginBtn.onclick = function () {
  try {
    let loginPhoenumber = document.getElementById("").value;
    let loginPasssword = document.getElementById("").value;
    let chk_phn = checkPhoneNumberFormat(loginPhoenumber);
    let chk_pwd = checkPhoneNumberFormat(loginPasssword);
    if (!chk_phn) {
      throw new Error("Wrong phone number format");
    }
    if (!chk_pwd) {
      throw new Error("wrong Password format");
    }
    if (chk_phn && chk_pwd) {
      if (localStorage.get("reglist") !== null) {
        let reg_list = JSON.parse(localStorage.getItem("reglist"));
        let res = reg_list.filter(
          (obj) => obj.mobileNumber === loginPhoenumber
        );
        if (res) {
          if (res[0].password == loginPasssword) {
            localStorage.setItem("login", loginPhoenumber);
            location.href = "./admin.html";
          } else {
            throw new Error("wrong password");
          }
        } else {
          throw new Error("user not found");
        }
      }
    }
  } catch (e) {
    if (e.message === "Wrong phone number format") {
      let element = document.getElementById();
      element.textContent = e.message;
    }
    if (e.message === "wrong Password format") {
      let element = document.getElementById();
      element.textContent = e.message;
    }
    if (e.message === "wrong password") {
      let element = document.getElementById();
      element.textContent = e.message;
    }
    if (e.message === "user not found") {
      let element = document.getElementById();
      element.textContent = e.message;
    }
  }
};

registerBtn.onclick = function () {
  try {
    let reg_name = document.getElementById("RegName").value;
    let reg_email = document.getElementById("RegEmail").value;
    let reg_phoneNuber = document.getElementById("RegPhoneNumber").value;
    let reg_password = document.getElementById("RegPassword").value;
    let reg_crmPwd = document.getElementById("RegConfirmPassword").value;

    //Eelemtnts
    let reg_name_err = document.getElementById("RegName_err");
    let reg_email_err = document.getElementById("RegEmail_err");
    let reg_phoneNuber_err = document.getElementById("RegPhoneNumber_err");
    let reg_password_err = document.getElementById("RegPassword_err");
    let reg_crmPwd_err = document.getElementById("RegConfirmPassword_err");

    if (!checkPhoneNumberFormat(reg_phoneNuber)) {
      throw new Error("Wrong phone number format");
    }

    if (!checkPhoneNumberFormat(reg_password_err)) {
      throw new Error("check password format");
    }

    if (reg_password !== reg_crmPwd) {
      throw new Error("Password did not match");
    }

    let reg_list = JSon.parse(localStorage.getItem("reglist"));
    reg_list = [...reg_list];
    if (
      reg_list.filter((obj) => obj.mobileNumber === reg_phoneNuber_err).length >
      0
    ) {
      throw new Error("This phone number is alredy register");
    }
  } catch (e) {}
};

function checkPhoneNumberFormat(loginPhoenumber) {
  return true;
}

function checkPhoneNumberFormat(loginPasssword) {
  return true;
}
