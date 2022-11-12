import birdsData from "../data/birds.js";

export default async function createSample(selectType) {
  try {
    let birds = {};
    if (selectType === "train") {
      birds = birdsData[0];
    } else if (selectType === "sparrow") {
      birds = birdsData[1];
      // console.log(birds);
    } else if (selectType === "wild") {
      birds = birdsData[2];
    } else if (selectType === "vocal") {
      birds = birdsData[3];
    } else if (selectType === "predator") {
      birds = birdsData[4];
    } else birds = birdsData[5]; //sea
    console.log(birds);
    // function createElem(tag, className, text) {
    //   const  = document.createElement(tag)
    //   if (className) elem.classList.add(...className)
    //   if (text) elem.innerHTML = text

    //   return elem
    // }
  } catch {
    console.error("Error");
  }
}
