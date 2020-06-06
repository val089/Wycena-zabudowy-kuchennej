const form = document.querySelector('#evaluationForm');

//kitchen dimensions
const lengthA = form.querySelector('#lengthA');
const lengthB = form.querySelector('#lengthB');
const lengthC = form.querySelector('#lengthC');

//kitchen fronts
const frontA = form.querySelector('#frontA');
const frontB = form.querySelector('#frontB');
const frontC = form.querySelector('#frontC');

// frontA.length = 0;

const frontsTab = [];
frontsTab.push(frontA, frontB, frontC);

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

        const frA = parseInt(frontA.value);
        const frB = parseInt(frontB.value);
        const frC = parseInt(frontC.value);

        console.log(frA + frB + frC);
    });
})
.catch(error => {
  console.error('Coś poszło nie tak!');
  console.error(error);
});