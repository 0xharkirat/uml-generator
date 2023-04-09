const classForm = document.getElementById('class-form');
const tableContainer = document.getElementById('table-container');
const addFieldButton = document.getElementById('add-field');
const addMethodButton = document.getElementById('add-method');

let fieldCount = 1;
let methodCount = 1;

function addFieldInput() {
  fieldCount++;
  const newLabel = document.createElement('label');
  newLabel.textContent = `Field ${fieldCount}: `;
  const newInput = document.createElement('input');
  newInput.type = 'text';
  newInput.name = `field${fieldCount}`;
  const newPublicRadio = document.createElement('input');
  newPublicRadio.type = 'radio';
  newPublicRadio.name = `field${fieldCount}-access`;
  newPublicRadio.value = 'public';
  const newPublicLabel = document.createElement('label');
  newPublicLabel.textContent = 'Public';
  newPublicLabel.appendChild(newPublicRadio);
  const newPrivateRadio = document.createElement('input');
  newPrivateRadio.type = 'radio';
  newPrivateRadio.name = `field${fieldCount}-access`;
  newPrivateRadio.value = 'private';
  const newPrivateLabel = document.createElement('label');
  newPrivateLabel.textContent = 'Private';
  newPrivateLabel.appendChild(newPrivateRadio);
  const newSelect = document.createElement('select');
  newSelect.name = `field${fieldCount}-type`;
  newSelect.id = `field${fieldCount}-type`;
  const types = ['byte', 'short', 'int', 'long', 'float', 'double', 'boolean', 'char', 'String'];
  types.forEach(function(type) {
    const newOption = document.createElement('option');
    newOption.value = type;
    newOption.textContent = type;
    newSelect.appendChild(newOption);
  });
  const newTypeLable = document.createElement('label');
  newTypeLable.textContent = 'Type:';
  newTypeLable.for = `field${fieldCount}-type`;


  const fieldsContainer = document.getElementById('fields-container');
  fieldsContainer.appendChild(newLabel);
  fieldsContainer.appendChild(newInput);
  fieldsContainer.appendChild(newPublicLabel);
  fieldsContainer.appendChild(newPrivateLabel);
  fieldsContainer.appendChild(newTypeLable);
  fieldsContainer.appendChild(newSelect)
  fieldsContainer.appendChild(document.createElement('br'));
}

function addMethodInput() {
  methodCount++;
  const newLabel = document.createElement('label');
  newLabel.textContent = `Method ${methodCount}: `;
  const newInput = document.createElement('input');
  newInput.type = 'text';
  newInput.name = `method${methodCount}`;
  const newPublicRadio = document.createElement('input');
  newPublicRadio.type = 'radio';
  newPublicRadio.name = `method${methodCount}-access`;
  newPublicRadio.value = 'public';
  const newPublicLabel = document.createElement('label');
  newPublicLabel.textContent = 'Public';
  newPublicLabel.appendChild(newPublicRadio);
  const newPrivateRadio = document.createElement('input');
  newPrivateRadio.type = 'radio';
  newPrivateRadio.name = `method${methodCount}-access`;
  newPrivateRadio.value = 'private';
  const newPrivateLabel = document.createElement('label');
  newPrivateLabel.textContent = 'Private';
  newPrivateLabel.appendChild(newPrivateRadio);
  const newSelect = document.createElement('select');
  newSelect.name = `method${fieldCount}-type`;
  newSelect.id = `method${fieldCount}-type`;
  const types = ['void','byte', 'short', 'int', 'long', 'float', 'double', 'boolean', 'char', 'String'];
  types.forEach(function(type) {
    const newOption = document.createElement('option');
    newOption.value = type;
    newOption.textContent = type;
    newSelect.appendChild(newOption);
  });
  const newTypeLable = document.createElement('label');
  newTypeLable.textContent = 'Return Type:';
  newTypeLable.for = `method${fieldCount}-type`;

  const methodsContainer = document.getElementById('methods-container');
  methodsContainer.appendChild(newLabel);
  methodsContainer.appendChild(newInput);
  methodsContainer.appendChild(newPublicLabel);
  methodsContainer.appendChild(newPrivateLabel);
  methodsContainer.appendChild(newTypeLable)
  methodsContainer.appendChild(newSelect)
  methodsContainer.appendChild(document.createElement('br'));
}

addFieldButton.addEventListener('click', addFieldInput);
addMethodButton.addEventListener('click', addMethodInput);

classForm.addEventListener('submit', function(event) {
  event.preventDefault();

  tableContainer.innerHTML = "";
  const className = document.getElementById('class-name').value;
  const fieldInputs = document.querySelectorAll('#fields-container input[type="text"]');
  const methodInputs = document.querySelectorAll('#methods-container input[type="text"]');
  const fieldAccessModifiers = document.querySelectorAll('#fields-container input[type="radio"]:checked');
  const methodAccessModifiers = document.querySelectorAll('#methods-container input[type="radio"]:checked');
  const typeInputs = document.querySelectorAll('#fields-container select');
  const returnTypeInputs = document.querySelectorAll('#methods-container select');

  const fields = [];
  const methods = [];
  const fieldAccess = [];
  const methodAccess = [];
  const types = [];
  const returnTypes = [];

  fieldInputs.forEach(function(fieldInput) {
    fields.push(fieldInput.value);
  });

  methodInputs.forEach(function(methodInput) {
    methods.push(methodInput.value);
  });

  fieldAccessModifiers.forEach(function(accessInput) {
    fieldAccess.push(accessInput.value);
  });

  methodAccessModifiers.forEach(function(accessInput) {
    methodAccess.push(accessInput.value);
  });

  typeInputs.forEach(function(typeInput){
    types.push(typeInput.value);
  });

  returnTypeInputs.forEach(function(returnTypeInput){
    returnTypes.push(returnTypeInput.value);
  });



  const table = document.createElement("table");

  const headerRow = document.createElement("tr");
	const classNameCell = document.createElement("th");
	classNameCell.textContent = className;
	headerRow.appendChild(classNameCell);
	table.appendChild(headerRow);


  const fieldsRow = document.createElement("tr");
  const fieldsCell = document.createElement("td");


  
  for (let i = 0; i < fields.length; i++) {
    let accessSymbol = '';
    if (fieldAccess[i] === 'public') {
      accessSymbol = '+';
    } else if (fieldAccess[i] === 'private') {
      accessSymbol = '-';
    }
    const fieldText = document.createElement("p");
    fieldText.textContent = accessSymbol + fields[i] + ' : ' + types[i];
		fieldsCell.appendChild(fieldText);
  }
  fieldsRow.appendChild(fieldsCell);

	table.appendChild(fieldsRow);


  const methodsRow = document.createElement("tr");
  const methodsCell = document.createElement("td");

  
  for (let i = 0; i < methods.length; i++) {
    let accessSymbol = '';
    if (methodAccess[i] === 'public') {
      accessSymbol = '+';
    } else if (methodAccess[i] === 'private') {
      accessSymbol = '-';
    }
    const methodText = document.createElement("p");
		methodText.textContent = accessSymbol + methods[i] + '()' + ' : ' + returnTypes[i];
		methodsCell.appendChild(methodText);
   
  }
  methodsRow.appendChild(methodsCell);

	table.appendChild(methodsRow);

	tableContainer.appendChild(table);
  
  // Add styles to the generated table and cells
  const generatedTable = document.querySelector('#table-container table');
  generatedTable.style.border = '1px solid black';
  generatedTable.style.borderCollapse = 'collapse';
  const generatedTableData = document.querySelectorAll('#table-container table td');
  generatedTableData.forEach(function(cell) {
    cell.style.border = '1px solid black';
    cell.style.padding = '5px';
  });
});







