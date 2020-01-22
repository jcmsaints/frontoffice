//req.user
function getDate(date) {
  var dd = date.getDate();
  var mm = date.getMonth();

  var yyyy = date.getFullYear();
  if (dd < 10) {
    dd = "0" + dd;
  }
  if (mm < 10) {
    mm = "0" + mm;
  }
  return dd + "/" + mm + "/" + yyyy;
}

function getImageStr(image) {
  return `http://ec2-3-10-190-140.eu-west-2.compute.amazonaws.com:1337/${image}`;
}

function Expense(obj) {
  this.user = obj.user;
  this.value = obj.value;
  this.categoryId = "xpto";
  this.categoryName = obj.categoryName;
  this.description = obj.description;
  this.date = new Date(obj.date);
  this.dateStr = getDate(new Date(obj.date));
  this.imagepath = obj.imagepath
    ? obj.imagepath
    : "/uploads/560f3a92e99445ae85401d1e37943118.jpg";
  this.imageStr = getImageStr(obj.imagepath);
}
module.exports = Expense;
