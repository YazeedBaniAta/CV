const firebaseConfig = {
    apiKey: "AIzaSyAJhdvnMX1pMIRPJZ5meb8Ehdi8n8suM9s",
    authDomain: "portfolio-30ada.firebaseapp.com",
    projectId: "portfolio-30ada",
    storageBucket: "portfolio-30ada.appspot.com",
    messagingSenderId: "740149763894",
    appId: "1:740149763894:web:a678307867c6b18239dd97",
    databaseURL: "https://portfolio-30ada-default-rtdb.firebaseio.com",
  };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);


var tbody = document.getElementById('tbody');
function AddItemToTable(key, name, email, subject, message, createAt)
{
    let tr = document.createElement("tr");

    let td1 = document.createElement('td');
    let td2 = document.createElement('td');
    let td3 = document.createElement('td');
    let td4 = document.createElement('td');
    let td5= document.createElement('td');
    let td6= document.createElement('td');

    
    td1.innerHTML = key;
    td2.innerHTML = name;
    td3.innerHTML = email;
    td4.innerHTML = subject;
    td5.innerHTML = message;
    td6.innerHTML = createAt;

    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    tr.appendChild(td4);
    tr.appendChild(td5);
    tr.appendChild(td6);

    tbody.appendChild(tr);
}
   
function AddAllItemsToTable(TheContact, key)
{
    tbody.innerHTML="";

    TheContact.forEach(function callback(value, index) {
        AddItemToTable(key[index], value.name, value.email, value.subject, value.message, value.createAt) ;
      });
}
   

// get all data from table
firebase.database().ref("contactForm").once('value',   function(snapshot) {
    var Contact = [];
    var theKey = [];
    var count = 1;
    snapshot.forEach(function (childSnapshot) {
      theKey.push(count.toString()+childSnapshot.key+'YBA');
      Contact.push(childSnapshot.val());
      count++;
    });

    AddAllItemsToTable(Contact, theKey);
  });
