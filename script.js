const form = document.getElementById('inventoryForm');
const addBtn = document.getElementById('addBtn');
const updateBtn = document.getElementById('updateBtn');
const tableBody = document.querySelector('#inventoryTable tbody');

let inventory = JSON.parse(localStorage.getItem('inventory')) || [];

function displayInventory() {
  tableBody.innerHTML = "";
  inventory.forEach((item, index) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${index + 1}</td>
      <td>${item.productName}</td>
      <td>${item.sku}</td>
      <td>${item.category}</td>
      <td>${item.quantity}</td>
      <td>${item.supplier}</td>
      <td>${item.price}</td>
      <td>${item.location}</td>
      <td>
        <button class="edit" onclick="editItem(${index})">Edit</button>
        <button class="delete" onclick="deleteItem(${index})">Delete</button>
      </td>
    `;
    tableBody.appendChild(row);
  });
}

function resetForm() {
  form.reset();
  document.getElementById('itemId').value = '';
  addBtn.style.display = 'inline-block';
  updateBtn.style.display = 'none';
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  
  const newItem = {
    productName: document.getElementById('productName').value.trim(),
    sku: document.getElementById('sku').value.trim(),
    category: document.getElementById('category').value.trim(),
    quantity: parseInt(document.getElementById('quantity').value),
    supplier: document.getElementById('supplier').value.trim(),
    price: parseFloat(document.getElementById('price').value),
    location: document.getElementById('location').value.trim()
  };

  inventory.push(newItem);
  localStorage.setItem('inventory', JSON.stringify(inventory));
  displayInventory();
  resetForm();
});

function editItem(index) {
  const item = inventory[index];
  document.getElementById('itemId').value = index;
  document.getElementById('productName').value = item.productName;
  document.getElementById('sku').value = item.sku;
  document.getElementById('category').value = item.category;
  document.getElementById('quantity').value = item.quantity;
  document.getElementById('supplier').value = item.supplier;
  document.getElementById('price').value = item.price;
  document.getElementById('location').value = item.location;

  addBtn.style.display = 'none';
  updateBtn.style.display = 'inline-block';
}

updateBtn.addEventListener('click', () => {
  const index = document.getElementById('itemId').value;
  if (index !== "") {
    inventory[index] = {
      productName: document.getElementById('productName').value.trim(),
      sku: document.getElementById('sku').value.trim(),
      category: document.getElementById('category').value.trim(),
      quantity: parseInt(document.getElementById('quantity').value),
      supplier: document.getElementById('supplier').value.trim(),
      price: parseFloat(document.getElementById('price').value),
      location: document.getElementById('location').value.trim()
    };
    localStorage.setItem('inventory', JSON.stringify(inventory));
    displayInventory();
    resetForm();
  }
});

function deleteItem(index) {
  if (confirm("Are you sure you want to delete this item?")) {
    inventory.splice(index, 1);
    localStorage.setItem('inventory', JSON.stringify(inventory));
    displayInventory();
  }
}

// Initial Load
displayInventory();
