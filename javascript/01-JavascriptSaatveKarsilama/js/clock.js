let nameDOM = document.querySelector("#myName");
let clockDOM = document.querySelector("#myClock");

showName();

function showName() {
  var name;
  let hasName = true;

  while (hasName) {
    name = prompt("Lütfen isminizi girin:");
    if (name.length >= 3) {
      nameDOM.innerHTML = name;
      showTime();
      hasName = false;
    } else {
      alert("Geçerli bir isim girmelisiniz (en az 3 karakter).");
    }
  }
}

function showTime() {
    var time = new Date();
    var hour = time.getHours();
    var minute = time.getMinutes();
    var second = time.getSeconds();
    var day = time.getDay();

    var daysOfWeek = ["Pazar", "Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi"];
  
  
    var now = hour + ":" + minute + ":" + second + " " + daysOfWeek[day];
    clockDOM.innerHTML = now
    console.log(now)

}

setInterval(showTime, 1000);

window.onload = function () {
    showTime();
};