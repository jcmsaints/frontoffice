function register() {
  $(".btn-primary").prop("disabled", true);
  $(".btn-primary").text("A Registar....");
  var formElement = document.getElementById("registerForm");
  const request = new XMLHttpRequest();

  request.open("POST", "/register");
  request.onload = function(e) {
    debugger;
  };
  request.send(new FormData(formElement));
}

function createExpense() {
  if ($("#bill").val()) {
    uploadImage();
  } else {
    $("#mainForm").submit();
  }
}

function uploadImage() {
  $(".btn-success").prop("disabled", true);
  $(".btn-success").text("A Submeter....");
  var formElement = document.getElementById("fileForm");
  const request = new XMLHttpRequest();

  request.open(
    "POST",
    "http://ec2-3-10-190-140.eu-west-2.compute.amazonaws.com:1337/"
  );
  request.onload = function(e) {
    if (this.status == 200) {
      $("#imageSrc").val(JSON.parse(this.response)[0].url);
      $("#mainForm").submit();
    }
  };
  request.send(new FormData(formElement));
}
