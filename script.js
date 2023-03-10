//SWITCH

//Skapa referens till knapp
let switchBtn = document.querySelector("#switchBtn");
let bodyRef = document.querySelector("body");

let textLightDark = document.querySelector("#textDarkLight");

//Lyssnare för dark/light mode

switchBtn.addEventListener("click", function () {
  //Vad händer när jag klickar
  bodyRef.classList.toggle("light");
  console.log(bodyRef.classList.value);

  //If sats som gör att texten ändras i dark/light mode
  if (bodyRef.classList.value === "light") {
    textLightDark.innerHTML = "Set dark mode";
  } else {
    textLightDark.innerHTML = "Set light mode";
  }
});

//FORM & INPUT

//ref till html-element
let aliasInput = document.querySelector("#aliasName");
let btn_send = document.querySelector("#sendBtn");

//Lyssna efter när user släpper upp en tangent
aliasInput.addEventListener("keyup", function () {
  //Vad händer när användaren släpper en tangent

  //Spara antalet tecken i variabel
  let getValueLength = aliasInput.value.length;

  if (getValueLength > 2) {

    //Ta bort disabled från btn
    btn_send.disabled = false;
  } else {

    btn_send.disabled = true;
  }
});

//Lyssnare som lyssnar efter focus
aliasInput.addEventListener("focus", function () {
  //Vad ska hända när input är i fokus
  //console.log('Du står i rutan');
  aliasInput.classList.toggle("focusBorder");
});

//Lyssnare som lyssnar efter blur
aliasInput.addEventListener("blur", function () {
  //Vad ska hända när input är i fokus

  aliasInput.classList.toggle("focusBorder");
});

//Referens till space name-div
let spaceName = document.querySelector(".welcome-box");

let apiPicRef =
  "https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=OqZKiccCYnBgrYbY4nfxiT3A6ZaeMT9iyuJXbm1u";
let sectionRef = document.querySelector(".container-cards");
let cardRef = document.querySelector(".card");
let buttonRef = document.querySelector("#sendBtn");

//Lyssnare på btn

//event fångar upp själva klicket på muspekaren
btn_send.addEventListener("click", function (event) {
  //Vad ska hända när jag klickar

  //Avbryter knappens default beteende att skicka form
  event.preventDefault();

  let getValue = aliasInput.value;

  console.log(getValue);
  spaceName.innerHTML = `Welcome ${getValue}!`;

  //Rensar input
  aliasInput.value = "";
  if (aliasInput.value === "") {
    btn_send.disabled = true;
  }

  fetch(apiPicRef)
    .then((response) => response.json())
    .then((data) => {
      //Vad ska vi göra med vår data?

      //Kontrollerar om array är tom
      let myArrayLength = data.photos.length;
      //console.log(myArrayLength);
      if (myArrayLength === 0) {
        // console.log('Det finns ingen data');
        alert("Just nu finns det ingen data, försök gärna senare!");
      } else {
        console.log("Det finns data");
        for (let i = 0; i < 4; i++) {
          //Vad ska ske för varje varv

          //Hämtar namnet i för rovern
          // ${data.photos[i].rover.name}

          //Denna hämtar bilden
          // ${data.photos[i].img_src}

          //Denna hämtar datumet
          // ${data.photos[i].earth_date}

          //För att hämta bilder och text från Nasas API
          sectionRef.innerHTML += `<article class="card"><h4>${data.photos[i].rover.name}</h4><div class="imgbox"><img src="${data.photos[i].img_src}"</div><p>${data.photos[i].earth_date}</p></article>`;
        }
      }
    })

    //Catch som berättar vad som är felet
    .catch((error) => console.log(`Detta är felet: ${error}`));
});
