const form = document.querySelector('#evaluationForm');
const result = document.querySelector('#result');

//kitchen fronts
const frontA = form.querySelector('#frontA');
const frontB = form.querySelector('#frontB');
const frontC = form.querySelector('#frontC');

// frontA.length = 0;

const frontsTab = [];
frontsTab.push(frontA, frontB, frontC);

//create option elements for fronts select
frontsTab.forEach(function(el) {
    const defaultOption = document.createElement('option');
    defaultOption.setAttribute('disabled', 'selected');
    defaultOption.text = '-- wybierz rodzaj frontu --';

    el.add(defaultOption);
    el.selectedIndex = 0;
});

fetch("./prices.json")
.then(response => response.json())
.then(data => {

    let optionFrontA;
    let optionFrontB;
    let optionFrontC;

    const fronts = data.fronts;
    // console.log(fronts);
    // console.log(typeof fronts[0].price);
  
    for (let i = 0; i < fronts.length; i++) {
        optionFrontA = document.createElement('option');
        optionFrontA.text = fronts[i].name;
        optionFrontA.value = fronts[i].price;
        frontA.add(optionFrontA);
    }   

    for (let i = 0; i < fronts.length; i++) {
        optionFrontB = document.createElement('option');
        optionFrontB.text = fronts[i].name;
        optionFrontB.value = fronts[i].price;
        frontB.add(optionFrontB);
    }  

    for (let i = 0; i < fronts.length; i++) {
        optionFrontC = document.createElement('option');
        optionFrontC.text = fronts[i].name;
        optionFrontC.value = fronts[i].price;
        frontC.add(optionFrontC);
    }

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        //kitchen dimensions
        const lengthA = parseInt(form.querySelector('#lengthA').value);
        const lengthB = parseInt(form.querySelector('#lengthB').value);
        const lengthC = parseInt(form.querySelector('#lengthC').value);

        //kitchen height
        const kitchenHeight = parseInt(form.querySelector('#kitchenHeight').value);

        //kitchen fronts values
        const frontA_value = parseInt(frontA.value);
        const frontB_value = parseInt(frontB.value);
        const frontC_value = parseInt(frontC.value);

        //kitchen frontB height
        const heightB = parseInt(form.querySelector('#heightB').value);

        //kitchen equipment quantity
        const equipmentA_quantity = parseInt(form.querySelector('#equipmentA').value);
        const equipmentB_quantity = parseInt(form.querySelector('#equipmentB').value);
        const equipmentC_quantity = parseInt(form.querySelector('#equipmentC').value);
        const equipmentD_quantity = parseInt(form.querySelector('#equipmentD').value);

        const equipment = data.equipment;
        const equipmentPrice = equipmentA_quantity * equipment[0].price + equipmentB_quantity  * equipment[1].price + equipmentC_quantity * equipment[2].price + equipmentD_quantity * equipment[3].price;

        //kitchen LED
        const kitchenLED = Boolean(form.querySelector('#kitchenLED').value);
        const ledPrice = equipment[4].price;

        //LAST KITCHEN PRICE 
        const standardKitcheHeight = 85;
        const kitchenPrice = (lengthA * standardKitcheHeight * frontA_value) + (lengthB * heightB * frontB_value) + (lengthC * kitchenHeight * frontC_value) + equipmentPrice;

        if (kitchenLED === true) {
            result.innerHTML = `${kitchenPrice + ledPrice} zł`;
        } else {
            result.innerHTML = `${kitchenPrice} zł`;
        }

    });
})
.catch(error => {
  console.error('Coś poszło nie tak!');
  console.error(error);
});