const form = document.querySelector('#evaluationForm');

let furnitureA = form.querySelector('#furnitureA');
let furnitureB = form.querySelector('#furnitureB');
let furnitureC = form.querySelector('#furnitureC');

furnitureA.length = 0;

let defaultOptionA = document.createElement('option');
defaultOptionA.setAttribute('disabled', 'selected');
defaultOptionA.text = 'Wybierz rodzaj frontu';

let defaultOptionB = document.createElement('option');
defaultOptionB.setAttribute('disabled', 'selected');
defaultOptionB.text = 'Wybierz rodzaj frontu';

let defaultOptionC = document.createElement('option');
defaultOptionC.setAttribute('disabled', 'selected');
defaultOptionC.text = 'Wybierz rodzaj frontu';

furnitureA.add(defaultOptionA);
furnitureA.selectedIndex = 0;

furnitureB.add(defaultOptionB);
furnitureB.selectedIndex = 0;

furnitureC.add(defaultOptionC);
furnitureC.selectedIndex = 0;

fetch('./js/prices.json')
.then(response => response.json())
.then(data => {

    let optionA;
    let optionB;
    let optionC;

    const fronts = data.fronts;
    console.log(fronts);
  
    for (let i = 0; i < fronts.length - 2; i++) {
        optionA = document.createElement('option');
        optionA.text = fronts[i].name;
        optionA.value = fronts[i].price;
        furnitureA.add(optionA);
    }   

    for (let i = 0; i < data.length; i++) {
        optionB = document.createElement('option');
        optionB.text = data[i].name;
        optionB.value = data[i].price;
        furnitureB.add(optionB);
    }  

    for (let i = 0; i < data.length; i++) {
        optionC = document.createElement('option');
        optionC.text = data[i].name;
        optionC.value = data[i].price;
        furnitureC.add(optionC);
    }  
})
.catch(error => {
  console.error('Coś poszło nie tak!');
  console.error(error);
});