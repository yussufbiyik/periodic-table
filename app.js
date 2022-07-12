const elements = Array.from(document.querySelectorAll(".pt-element"))
const extraElements = Array.from(document.querySelectorAll(".pt-element-extra"));

var languageSelector = document.getElementById('languageSelector');
var currentLanguage;
var activeElement;

var [elementSymbol, elementName, elementNumber, elementWeight, elementProton, elementNeutron, elementElectron, elementType, elementLocation] = [
    document.querySelector('#element-card-symbol'), 
    document.querySelector('#element-card-name'),
    document.querySelector('#element-card-number'),
    document.querySelector('#element-card-weight'),
    document.querySelector('#element-card-proton'),
    document.querySelector('#element-card-neutron'),
    document.querySelector('#element-card-electron'),
    document.querySelector('#element-card-type'),
    document.querySelector('#element-card-location')
];

var [elementNameValue, elementNumberValue, elementWeightValue, elementProtonValue, elementNeutronValue, elementElectronValue, elementTypeValue, elementLocationValue] = [
    document.querySelector('#element-card-name-value'),
    document.querySelector('#element-card-number-value'),
    document.querySelector('#element-card-weight-value'),
    document.querySelector('#element-card-proton-value'),
    document.querySelector('#element-card-neutron-value'),
    document.querySelector('#element-card-electron-value'),
    document.querySelector('#element-card-type-value'),
    document.querySelector('#element-card-location-value')
];

var languages = {
    name:{
        en:"Writing: ",
        tr:"Yazılış: "
    },
    number:{
        en:"Atomic Number: ",
        tr:"Atom Numarası: "
    },
    weight:{
        en:"Atomic Mass: ",
        tr:"Atom Kütlesi: "
    },
    proton:{
        en:"Number of Protons: ",
        tr:"Proton Sayısı: "
    },
    neutron:{
        en:"Number of Neutrons: ",
        tr:"Nötron Sayısı: "
    },
    electron:{
        en:"Number of Electrons: ",
        tr:"Elektron Sayısı: "
    },
    type:{
        en:"Type: ",
        tr:"Türü: "
    },
    location:{
        en:"Location in Periodic Table: ",
        tr:"Periyodik Tablodaki Konumu: "
    },
}

languageSelector.addEventListener('change', () => {
    currentLanguage = languageSelector.value;
    [elementNameValue.innerHTML, elementNumberValue.innerHTML, elementWeightValue.innerHTML, elementProtonValue.innerHTML, elementNeutronValue.innerHTML, elementElectronValue.innerHTML, elementTypeValue.innerHTML, elementLocationValue.innerHTML] = [ 
        `${(currentLanguage === 'tr') ? languages.name.tr : languages.name.en}`,
        `${(currentLanguage === 'tr') ? languages.number.tr : languages.number.en}`,
        `${(currentLanguage === 'tr') ? languages.weight.tr : languages.weight.en}`,
        `${(currentLanguage === 'tr') ? languages.proton.tr : languages.proton.en}`,
        `${(currentLanguage === 'tr') ? languages.neutron.tr : languages.neutron.en}`,
        `${(currentLanguage === 'tr') ? languages.electron.tr : languages.electron.en}`,
        `${(currentLanguage === 'tr') ? languages.type.tr : languages.type.en}`,
        `${(currentLanguage === 'tr') ? languages.location.tr : languages.location.en}`
    ];
})

function unfoldElementCard(){
    let elementCard = document.querySelector('#element-card');
    elementCard.classList.add('un')
}

function updateElementCard(element, data) {
    let [symbol, name, number, weight, proton, neutron, electron, type, location] = [
        data.Symbol,
        data.Element,
        data.AtomicNumber,
        data.AtomicMass,
        data.NumberofProtons,
        data.NumberofNeutrons,
        data.NumberofElectrons,
        data.Type,
        `${data.Period}.P, ${(data.Group === "") ? "X" : `${data.Group}.G`}`
    ];

    [elementSymbol.innerHTML, elementName.innerHTML, elementNumber.innerHTML, elementWeight.innerHTML, elementProton.innerHTML, elementNeutron.innerHTML, elementElectron.innerHTML, elementType.innerHTML, elementLocation.innerHTML] = [
        `${symbol}`, 
        `${name}`,
        `${number}`,
        `${weight}`,
        `${proton}`,
        `${neutron}`,
        `${electron}`,
        `${type}`,
        `${location}`
    ];

    activeElement = data;
}

axios.get('https://gist.githubusercontent.com/yussufbiyik/c033a25e70c137d5c48d5aa239f6d8d5/raw/0bac523f08dbced27b1a5f4784fd396ec25552a1/ElementsModified.json')
.then(function (response) {
    let pTable = Array.from(response.data);
    if(pTable != undefined) {
        elements.forEach(element => {
            var elementNumber = elements.indexOf(element);
            var elementData = pTable[elementNumber];
            element.innerHTML = `<span>${pTable[elementNumber].Symbol}</span>`;
            element.addEventListener('click', () => {
                updateElementCard(element, elementData);
            });
        });
    }
})
.catch(function (error) {
    console.error("Hata!", error)
});

axios.get('https://gist.githubusercontent.com/yussufbiyik/4eaefa3fc5972443adcb9aae4b10c393/raw/')
.then(function (response) {
    let extraPTable = Array.from(response.data);
    if(typeof pTable != undefined) {
        extraElements.forEach(element => {
            var elementNumber = extraElements.indexOf(element);
            var elementData = extraPTable[elementNumber];
            element.innerHTML = `<span>${extraPTable[elementNumber].Symbol}</span>`;
            element.addEventListener('click', () => {
                updateElementCard(element, elementData);
            });
        });
    }
})
.catch(function (error) {
    console.error("Hata!", error)
});