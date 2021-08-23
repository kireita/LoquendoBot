const container = document.body;
const tabOne = document.getElementById("tab1");
const tabTwo = document.getElementById("tab2");
const tabThree = document.getElementById("tab3");
const sectionOne = document.getElementById("content1");
const sectionTwo = document.getElementById("content2");
const sectionThree = document.getElementById("content3");
const tabs = document.querySelectorAll(".link");

tabOne.addEventListener("click", () => {
    sectionOne.style.display = "block";
    sectionTwo.style.display = "none";
    sectionThree.style.display = "none";

    container.style.backgroundColor = "rgb(238, 174, 195)";

    tabOne.classList.add("tabx", "selected");

    tabTwo.classList.remove("tabx", "selected");
    tabTwo.classList.add("tabx");

    tabThree.classList.remove("tabx", "selected");
    tabThree.classList.add("tabx")
});

tabTwo.addEventListener("click", () => {
    sectionOne.style.display = "none";
    sectionTwo.style.display = "block";
    sectionThree.style.display = "none";
    container.style.backgroundColor = "rgb(146, 146, 228)";

    tabOne.classList.remove("tabx", "selected");
    tabOne.classList.add("tabx");

    tabTwo.classList.add("tabx", "selected");

    tabThree.classList.remove("tabx", "selected");
    tabThree.classList.add("tabx")
});

tabThree.addEventListener("click", () => {
    sectionOne.style.display = "none";
    sectionTwo.style.display = "none";
    sectionThree.style.display = "block";
    container.style.backgroundColor = "rgb(245, 233, 67)";

    tabOne.classList.remove("tabx", "selected");
    tabOne.classList.add("tabx");
    tabTwo.classList.remove("tabx", "selected");
    tabTwo.classList.add("tabx");
    tabThree.classList.add("tabx", "selected");
});