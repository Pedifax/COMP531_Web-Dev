let display_name = document.getElementById("display_name").innerText;
let email_address = document.getElementById("email_address").innerText;
let phone_number = document.getElementById("phone_number").innerText;
let zipcode = document.getElementById("zipcode").innerText;
let update_message = "";
let error_message = "";
let inputs = {}; // user inputted data. An obj just like profile_info.
let profile_info = {
  // hard coded info
  display_name: display_name,
  email_address: email_address,
  phone_number: phone_number,
  zipcode: zipcode,
  password: "123",
};

const get_inputs = () => {
  inputs.display_name = document.getElementById("display_name_field").value;
  inputs.email_address = document.getElementById("email_address_field").value;
  inputs.phone_number = document.getElementById("phone_number_field").value;
  inputs.zipcode = document.getElementById("zipcode_field").value;
  inputs.password = document.getElementById("password_field").value;
  inputs.password_confirmation = document.getElementById(
    "password_confirmation_field"
  ).value;
};

const clear_user_inputs = () => {
  document.getElementById("display_name_field").value = "";
  document.getElementById("email_address_field").value = "";
  document.getElementById("phone_number_field").value = "";
  document.getElementById("zipcode_field").value = "";
  document.getElementById("password_field").value = "";
  document.getElementById("password_confirmation_field").value = "";
};

const extend_update_message = (field) => {
  if (!update_message) {
    update_message += "The following information has/have been updated: ";
  }
  if (field === "password") {
    const old_pass_length = profile_info.password.length;
    const new_pass_length = inputs.password.length;
    let old_stars = "*".repeat(old_pass_length);
    let new_stars = "*".repeat(new_pass_length);
    update_message += `<br>${field} (${old_stars} --> ${new_stars})`;
  } else {
    update_message += `<br>${field} (${profile_info[field]} --> ${inputs[field]})`;
  }
};

const extend_error_message = (field) => {
  if (!error_message) {
    error_message += "The following information inputted is invalid: ";
  }
  error_message += `<br>${field}`;
};

const reset_all_messages = () => {
  update_message = "";
  error_message = "";

  let update_message_div = document.getElementById("update_message");
  let error_message_div = document.getElementById("error_message");
  update_message_div.innerHTML = "";
  error_message_div.innerHTML = "";
};

const validate_all = () => {
  get_inputs();
  reset_all_messages();

  if (inputs.display_name) {
    if (validate_name()) {
      extend_update_message("display_name");
    } else {
      extend_error_message("display_name");
    }
  }

  if (inputs.email_address) {
    if (validate_email()) {
      extend_update_message("email_address");
    } else {
      extend_error_message("email_address");
    }
  }

  if (inputs.phone_number) {
    if (validate_phone_number()) {
      extend_update_message("phone_number");
    } else {
      extend_error_message("phone_number");
    }
  }

  if (inputs.zipcode) {
    if (validate_zip()) {
      extend_update_message("zipcode");
    } else {
      extend_error_message("zipcode");
    }
  }

  if (inputs.password || inputs.password_confirmation) {
    if (validate_password()) {
      extend_update_message("password");
    } else {
      extend_error_message("password");
    }
  }
};

const display_message = () => {
  let update_message_div = document.getElementById("update_message");
  let error_message_div = document.getElementById("error_message");

  if (error_message) {
    error_message_div.innerHTML = error_message;
    error_message_div.style.display = "block";
    update_message_div.style.display = "none";
  } else {
    update_message_div.innerHTML = update_message;
    update_message_div.style.display = "block";
    error_message_div.style.display = "none";
  }
};

const validate_name = () => {
  const display_name_field = document.getElementById("display_name_field");

  let regex_head = new RegExp("[0-9\\s]");
  let regex_body = new RegExp("^[0-9a-zA-Z]+$");

  if (regex_head.test(display_name_field.value[0])) {
    display_name_field.setCustomValidity(
      "The first character can't be a number or a blank"
    );
    display_name_field.reportValidity();
    return false;
  } else if (!regex_body.test(display_name_field.value)) {
    display_name_field.setCustomValidity(
      "The account name shouldn't contain any blank or symbol"
    );
    display_name_field.reportValidity();
    return false;
  } else {
    display_name_field.setCustomValidity("");
    display_name_field.reportValidity();
    return true;
  }
};

const validate_email = () => {
  const email_address_field = document.getElementById("email_address_field");
  if (email_address_field.validity.patternMismatch) {
    email_address_field.setCustomValidity(
      "Expect alphabet, number, or symbols like '-' and '.' before the '@' symbol.\nOnly alphabet, number, and exactly one '.' are accepted after the '@' symbol."
    );
    email_address_field.reportValidity();
    return false;
  } else {
    email_address_field.setCustomValidity("");
    email_address_field.reportValidity();
    return true;
  }
};

const validate_phone_number = () => {
  const phone_number_field = document.getElementById("phone_number_field");
  if (phone_number_field.validity.patternMismatch) {
    phone_number_field.setCustomValidity(
      "Expect a format of 111-111-1111. Only numbers allowed."
    );
    phone_number_field.reportValidity();
    return false;
  } else {
    phone_number_field.setCustomValidity("");
    phone_number_field.reportValidity();
    return true;
  }
};

const validate_zip = () => {
  const zipcode_field = document.getElementById("zipcode_field");
  if (zipcode_field.validity.patternMismatch) {
    zipcode_field.setCustomValidity("Expect 5 numbers\nExample: 11111");
    zipcode_field.reportValidity();
    return false;
  } else {
    zipcode_field.setCustomValidity("");
    zipcode_field.reportValidity();
    return true;
  }
};

const validate_password = () => {
  pass1 = document.getElementById("password_field");
  pass2 = document.getElementById("password_confirmation_field");

  if (pass1.value !== pass2.value || !pass1.value || !pass2.value) {
    pass2.setCustomValidity("Passwords don't match");
    pass2.reportValidity();
    return false;
  } else {
    pass2.setCustomValidity("");
    return true;
  }
};

const update_profile_info_object = () => {
  profile_info.display_name =
    inputs.display_name === ""
      ? profile_info.display_name
      : inputs.display_name;
  profile_info.email_address =
    inputs.email_address === ""
      ? profile_info.email_address
      : inputs.email_address;
  profile_info.phone_number =
    inputs.phone_number === ""
      ? profile_info.phone_number
      : inputs.phone_number;
  profile_info.zipcode =
    inputs.zipcode === "" ? profile_info.zipcode : inputs.zipcode;
  profile_info.password =
    inputs.password === "" ? profile_info.password : inputs.password;
};

const update_html_page_values = () => {
  document.getElementById("display_name").innerText = profile_info.display_name;
  document.getElementById("email_address").innerText =
    profile_info.email_address;
  document.getElementById("phone_number").innerText = profile_info.phone_number;
  document.getElementById("zipcode").innerText = profile_info.zipcode;
  const password_stars = "*".repeat(profile_info.password.length);
  document.getElementById("password_stars").innerText = password_stars;
  document.getElementById("password_confirmation_stars").innerText =
    password_stars;
};

const button_handler = () => {
  validate_all();
  display_message();
  if (!error_message) {
    update_profile_info_object();
    update_html_page_values();
    clear_user_inputs();
  }
};
