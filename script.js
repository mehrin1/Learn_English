
// get all id

const navBar = document.getElementById('navBar');
const heroSection = document.getElementById('hero');
const logInSection = document.getElementById('logInSection');
const mainSection = document.getElementById('mainSection');

const useName = document.getElementById('userName');
const password = document.getElementById('password');

// some utility class

const hideSpinner = (id) => {
    const element = document.getElementById(id);
    element.classList.add("hidden");
}

const showSpinner = (id) => {
    const element = document.getElementById(id);
    element.classList.remove("hidden");
}

// log in section js

const getStartedBtn = document.getElementById('getStartedBtn');
getStartedBtn.addEventListener('click', (event) => {
    event.preventDefault();
    if (useName.value === "") {
        alert("Please enter a valid user name");
    }
    else {
        if (password.value === "123456") {
            navBar.classList.remove("hidden");
            heroSection.classList.toggle("hidden");
            mainSection.classList.remove("hidden");
        }
        else {
            alert("Please enter a valid password");
        }
    }
})

// log out section js

const logOutBtn = document.getElementById('logOutBtn');
logOutBtn.addEventListener('click', (event) => {
    event.preventDefault();
    navBar.classList.add("hidden");
    heroSection.classList.toggle("hidden");
    mainSection.classList.add("hidden");
    useName.value = "";
    password.value = "";
});

// smooth scroll for nav bar BTN

// for faq btn
document.getElementById("faqBtn").addEventListener("click", function () {
    document.getElementById("faqSection").scrollIntoView({ behavior: "smooth" });
});

// for learn btn
document.getElementById("learnBtn").addEventListener("click", function () {
    document.getElementById("learnSection").scrollIntoView({ behavior: "smooth" });
});

// show btn from api


// button section
const showAllLessonBtn = async () => {
    const response = await fetch(`https://openapi.programming-hero.com/api/levels/all`);

    const data = await response.json();
    showBtn(data.data)
}

const showBtn = (lessonButton) => {
    lessonButton.forEach(element => {
        // console.log(element.level_no)
        const buttonContainer = document.getElementById("btn-container");
        const div = document.createElement("div");
        div.innerHTML = `
        <button id="btn-${element.level_no}" onclick = "allWords('${element.level_no}')" class = "btn btn-primary btn-outline btn-selection">
        <i class="fa-solid fa-book-open text-primary"></i> Lesson -${element.level_no}</button>
        `
        buttonContainer.appendChild(div);
    });

}

// show selected lesson
const showSelectedLesson = (btnSelection) => {
    const element = document.getElementsByClassName("btn-selection");
    // console.log(typeof element)
    for (let i = 0; i < element.length; i++) {
        element[i].classList.add("btn-outline");
    }
    document.getElementById(btnSelection).classList.remove("btn-outline");
}

//lessonContainer                      

// fetch all words
const allWords = async (lessonId) => {
    showSelectedLesson(`btn-${lessonId}`)
    showSpinner("spinner")
    const response = await fetch(`https://openapi.programming-hero.com/api/level/${lessonId}`);
    const data = await response.json();
    if (data.data) {
        showWords(data.data)
        lessonDetails(data.data)
        hideSpinner("spinner")
    }
    
}


// show all words
const selectLesson = document.getElementById("select-lesson");

const showWords = (words) => {   // words is data.data

    const wordContainer = document.getElementById("wordContainer");
    selectLesson.classList.add("hidden")
    wordContainer.classList.add("bg-base-200")
    wordContainer.innerHTML = ""

    // No words found
    if (words.length < 1) {
        hideSpinner("spinner")
        const nextLessonContainer = document.getElementById("wordContainer");
        nextLessonContainer.innerHTML = `
            <div class=" col-span-full content-center mx-auto justify-center">
                <div class="card bg-base-100 shadow-lg mx-auto my-2">
                    <div class="card-body text-center">
                        <h2>
                            <i class="fa-solid fa-triangle-exclamation text-5xl text-red-700"></i>
                        </h2>
                        <p class="my-2">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
                        <h2 class="font-bold text-xl">নেক্সট Lesson এ যান</h2>
                    </div>
                </div>
            </div>
        `
        wordContainer.appendChild(div)

    }
    // Words found
    else {

        words.forEach(element => {
            // console.log(element.id)
            const div = document.createElement("div");
            div.innerHTML = `
                    <div class="card bg-base-100 shadow-lg">
                            <div class="card-body text-center">
                                <h2 class="font-bold text-xl mb-3">
                                ${element.word}
                                </h2>
                                <p class="font-bold">Meaning /Pronounciation</p>
                                
                                <div>
                                    <p><span id="meaning-${element.id}" 
                                    class="font-bold text-xl">${element.meaning}</span> / 
                                    <span class="font-bold text-xl">${element.pronunciation}</span></p>
                                </div>
                                <div class="flex justify-between mt-3">
                                
                                    <button id="${element.id}"  class="btn bg-blue-100"><i class="fa-solid fa-circle-info"></i></button>
                                    <button class="btn bg-blue-100"><i class="fa-solid fa-volume-high"></i></button>

                                </div>
                            </div>
                        </div>
                    `
            wordContainer.appendChild(div)
            addModal(`${element.id}`)
            meaning(`${element.id}`, element.meaning)
            // readLoud(`loud-${element.id}`, element.word)

        });
    }

}


const lessonDetails = (details) => {
    // console.log(details)
    details.forEach(element => {
        const wordId = element.id;
    });
}

// js for modal

const addModal = (id) => {
    // console.log(id)
    document.getElementById(id).addEventListener("click", function () {
        console.log("clicked", id)
        my_modal_3.showModal()
        singleWord(id)
    });

}

const singleWord = async (word) => {
    const response = await fetch(`https://openapi.programming-hero.com/api/word/${word}`);
    const data = await response.json();
    const wordDetails = data.data;
    addModalDetails(wordDetails)
    if (data.data === null || data.data === undefined) {
        details.synonyms = ""
    }
    else {
        details.synonyms = data.data.synonyms
    }
}

const modalBox = document.getElementById("my_modal_3");
const addModalDetails = (details) => {
    if(details.meaning === null) {
        details.meaning = "অর্থ নেই"
    }
    modalBox.innerHTML = ""
    const ModalDiv = document.createElement("div");
    
    ModalDiv.innerHTML = `
        

        <div class="border-2 p-4 md:w-96 modal-box">
            <div class="border-gray-200 border-2 p-4 rounded-md">
                    
                <h3 class="text-xl font-bold">${details.word} <span><i class="fa-solid fa-microphone"></i></span> ${details.pronunciation}</h3>
                <p class="font-semibold text-base mt-4">meaning</p>
                <h3 class="text-lg font-bold">${details.meaning}</h3>
                <p class="font-semibold mt-5">Example</p>
                <h3 class="text-base font-normal text-gray-700">${details.sentence}</h3>
                <p class="font-semibold mt-4">সমার্থক শব্দ গুলো</p>
                <h3 id="synomyms-${details.id}" class="text-lg font-bold"></h3>
            </div>
            <div>
                <form method="dialog">
                    <button class="btn btn-primary mt-5 rounded-lg px-4">Complete Learning</button>
                </form>
            </div>
                
        </div>
    `
    modalBox.appendChild(ModalDiv)
    synonyms(details.synonyms, details.id)

}


// synonyms
const synonyms = (word, id) => {
    const synonymsId = document.getElementById(`synomyms-${id}`)
    synonymsId.innerHTML = ""
    if (word.length <1) {
        synonymsId.innerHTML = ""
    }
    else {
        word.forEach(element => {
        
            const div = document.createElement("div");
            div.classList.add("flex")
            div.innerHTML = `
                <div class="flex flex-row gap-2">
                        <button class="btn">${element}</button>
                </div>
            `
            synonymsId.appendChild(div)
            
        console.log(element)
    })
    }
}

// js for null value

// for card
const meaning = (id, meaning) => {

    const meaningId = document.getElementById(`meaning-${id}`);
    // meaningId.innerHTML = ""
    if (meaning === null) {
        meaningId.innerText = "অর্থ নেই"
    }


}



// call the function
showAllLessonBtn()