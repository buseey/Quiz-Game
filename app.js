

let remainingTimeElement = document.querySelector(".remainingTimeElement");
let quizContainer = document.getElementById("container");
let nextBtn = document.getElementById("next-btn");
let countOfQuestion = document.querySelector(".number-of-question");
let displayContainer = document.getElementById("display-container");
let scoreContainer = document.querySelector(".score-container");
let restart = document.getElementById("restart");
let userScore = document.getElementById("user-score");
let startScreen = document.querySelector(".homescreen");
let startButton = document.getElementById("start-btn");
let questionCount;
let scoreCount = 0;
let count = 11;
let countdown;


// Sorular ve Seçenekler dizisi
const quizArray = [
  {
    id: "0",
    question: "2003 yılında En İyi Film dalında Akademi Ödülü'nü kazanan hangi film, yönetmenliğini Peter Jackson'ın yaptığı bir epik fantezi filmidir?",
    options: ["American Beauty", "Yüzüklerin Efendisi: Kralın Dönüşü", "Mystic River", "Pan's Labyrinth"],
    correct: "Yüzüklerin Efendisi: Kralın Dönüşü",
  },
  {
    id: "1",
    question: "Radiohead'in 1997 yılında piyasaya sürdüğü, 'Paranoid Android' ve 'Karma Police' gibi şarkıların yer aldığı albümün adı nedir?",
    options: ["The Bends", "In Rainbow", "Pablo Honey", "Ok Computer"],
    correct: "Ok Computer",
  },
  {
    id: "2",
    question: "Brontë kardeşlerin yazdığı eserler, hangi dönemin İngiliz edebiyatında önemli bir yer tutar?",
    options: ["Elizabeth Dönemi", "Victoria Dönemi", "Georgian Dönemi", "Jacobean Dönemi"],
    correct: "Victoria Dönemi",
  },
  {
    id: "3",
    question: "Savaş ve Barış adlı devasa romanda, Napolyon'un Rusya seferi sırasında yaşananları anlatan Rus yazar kimdir?",
    options: ["Fyodor Dostoyevsky", "Anton Çehov", "Leo Tolstoy", "Nikolai Gogol"],
    correct: "Leo Tolstoy",
  },
  {
    id: "4",
    question: "Hangi yıl, Amerika Birleşik Devletleri'nin 11 Eylül saldırılarına maruz kaldığı yıl olarak bilinir?",
    options: ["1999", "1998", "2000", "2001"],
    correct: "2001",
  },
];

// Quizi yeniden başlat
restart.addEventListener("click", () => {
  initial();
  displayContainer.classList.remove("hide");
  scoreContainer.classList.add("hide");
});


nextBtn.addEventListener(
  "click",
  (displayNext = () => {
  
    questionCount += 1;
   
    if (questionCount == quizArray.length) {

      displayContainer.classList.add("hide");
      scoreContainer.classList.remove("hide");
      //kullanıcı skoru
      userScore.innerHTML =
        "Your score is " + scoreCount + " out of " + questionCount;
    } else {
      //soru sayısını göster
      countOfQuestion.innerHTML =
        questionCount + 1 + " of " + quizArray.length + " Question";
      //Testi göster
      quizDisplay(questionCount);
      count = 11;
      clearInterval(countdown);
      timerDisplay();
    }
  })
);

//Zamanlayıcı
const timerDisplay = () => {
  countdown = setInterval(() => {
    count--;
    remainingTimeElement.innerHTML = `${count}s`;
    if (count == 0) {
      clearInterval(countdown);
      displayNext();
    }
  }, 1000);
};

//Testi görüntüle
const quizDisplay = (questionCount) => {
  let quizCards = document.querySelectorAll(".container-mid");
  //Diğer kartları gizle
  quizCards.forEach((card) => {
    card.classList.add("hide");
  });
 // mevcut soru kartını göster
  quizCards[questionCount].classList.remove("hide");
};

// Test oluşturma
function quizCreator() {
  //soruları rastgele oluşturmak için kullanılıyor.
  quizArray.sort(() => Math.random() - 0.5);
  
  for (let i of quizArray) {
    //seçenekler rastgele oluşturuluyor.
    i.options.sort(() => Math.random() - 0.5);
   // Yeni bir div oluştur ve gerekli sınıfları ekle
    let div = document.createElement("div");
    div.classList.add("container-mid", "hide");
   // Soru numarası belirtiliyor
    countOfQuestion.innerHTML = 1 + " of " + quizArray.length + " Question";
    //sorular
    let question_DIV = document.createElement("p");
    question_DIV.classList.add("question");
    question_DIV.innerHTML = i.question;
    div.appendChild(question_DIV);
    //seçenekler
    div.innerHTML += `
    <button class="option-div" onclick="checker(this)">${i.options[0]}</button>
     <button class="option-div" onclick="checker(this)">${i.options[1]}</button>
      <button class="option-div" onclick="checker(this)">${i.options[2]}</button>
       <button class="option-div" onclick="checker(this)">${i.options[3]}</button>
    `;
    quizContainer.appendChild(div);
  }
}

//Seçeneğin doğru olup olmadığı kontrol ediliyor
function checker(userOption) {
  let userSolution = userOption.innerText;
  let question =
    document.getElementsByClassName("container-mid")[questionCount];
  let options = question.querySelectorAll(".option-div");

  //Kullanıcının tıkladığı cevabın doğruluğu kontrol edilir.
  if (userSolution === quizArray[questionCount].correct) {
    userOption.classList.add("correct");
    scoreCount++;
  } else {
    userOption.classList.add("incorrect");
    //Doğru seçenek işaretlenir.
    options.forEach((element) => {
      if (element.innerText == quizArray[questionCount].correct) {
        element.classList.add("correct");
      }
    });
  }

  //Zamanlayıcıyı durdur
  clearInterval(countdown);
  //Tüm seçenekleri devre dışı bırak
  options.forEach((element) => {
    element.disabled = true;
  });
}

//Başlangıç Ayarları
function initial() {
  quizContainer.innerHTML = "";
  questionCount = 0;
  scoreCount = 0;
  count = 11;
  clearInterval(countdown);
  timerDisplay();
  quizCreator();
  quizDisplay(questionCount);
}

//Başlangıç butonuna tıklandığında
startButton.addEventListener("click", () => {
  startScreen.classList.add("hide");
  displayContainer.classList.remove("hide");
  initial();
});

//Quiz'i gizle ve başlangıç ekranını göster
window.onload = () => {
  startScreen.classList.remove("hide");
  displayContainer.classList.add("hide");
};