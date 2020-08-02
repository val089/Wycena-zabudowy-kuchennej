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
frontsTab.forEach(el => {
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

        //kitchen fronts 
        const frontA_value = form.querySelector('#frontA').value;
        const frontB_value = form.querySelector('#frontB').value;
        const frontC_value = form.querySelector('#frontC').value;
        const newfrontA = parseInt(frontA_value);
        const newfrontB = parseInt(frontB_value);
        const newfrontC = parseInt(frontC_value);
        console.log(`newfrontA: ${newfrontA}`);
        console.log(`newfrontB: ${newfrontB}`);
        console.log(`newfrontC: ${newfrontC }`);

        //kitchen dimensions
        const lengthA_value = form.querySelector('#lengthA').value;
        const lengthB_value = form.querySelector('#lengthB').value;
        const lengthC_value = form.querySelector('#lengthC').value;
        const lengthA = parseInt(lengthA_value);
        const lengthB = parseInt(lengthB_value);
        const lengthC = parseInt(lengthC_value);
        console.log(`lengthA: ${lengthA}`);
        console.log(`lengthB: ${lengthB}`);
        console.log(`lengthC: ${lengthC}`);

        //kitchen height
        const kitchenHeight_value = form.querySelector('#kitchenHeight').value;
        const kitchenHeight = parseInt(kitchenHeight_value);

        //kitchen equipment
        const equipmentA_value = form.querySelector('#equipmentA').value;
        const equipmentB_value = form.querySelector('#equipmentB').value;
        const equipmentC_value = form.querySelector('#equipmentC').value;
        const equipmentD_value = form.querySelector('#equipmentD').value;
        const equipmentA = parseInt(equipmentA_value);
        const equipmentB = parseInt(equipmentB_value);
        const equipmentC = parseInt(equipmentC_value);
        const equipmentD = parseInt(equipmentD_value);
        //kitchen frontB height
        const heightB_value = form.querySelector('#heightB').value
        const newHeightB = parseInt(heightB_value);
        console.log(`equipmentC: ${equipmentC}`)

        //equipments data from json
        const equipment = data.equipment;
        const equipmentPrice = equipmentA * equipment[0].price + equipmentB  * equipment[1].price + equipmentC * equipment[2].price + equipmentD * equipment[3].price;
        console.log(`equipmentA: ${equipmentA}`);
        console.log(`equipmentB: ${equipmentB}`)
        console.log(`equipmentC: ${equipmentC}`)
        console.log(`equipmentD: ${equipmentD}`)
        console.log(`equipmentPrice: ${equipmentPrice}`)

        //kitchen LED
        const kitchenLED_value = form.querySelector('#kitchenLED').value
        const kitchenLED = Boolean(kitchenLED_value);
        const ledPrice = equipment[4].price;

        console.log(`kitchenLED_value: ${kitchenLED_value}`)
        console.log(`kitchenLED: ${kitchenLED}`)
        console.log(`ledPrice: ${ledPrice}`)

        //LAST KITCHEN PRICE 
        const standardKitcheHeight = 85;
        const kitchenPrice = (lengthA * standardKitcheHeight * newfrontA) + (lengthB * newHeightB * newfrontB) + (lengthC * kitchenHeight * newfrontC) + equipmentPrice;
        console.log(`ledPrice: ${kitchenPrice}`)

        if (kitchenLED === true) {
            result.textContent = `${kitchenPrice + ledPrice} zł`;
        } else {
            result.textContent = `${kitchenPrice} zł`;
        }

    });
})
.catch(error => {
  console.error('Coś poszło nie tak!');
  console.error(error);
});