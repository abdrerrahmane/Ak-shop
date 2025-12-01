function showForm() {
  document.getElementById("orderForm").style.display = "block";
}

async function sendOrder(e) {
  e.preventDefault();

  const order = {
    name: name.value,
    phone: phone.value,
    wilaya: wilaya.value,
    address: address.value,
    color: color.value,
    size: size.value,
    note: note.value,
    product: "Product"
  };

  await fetch("http://localhost:5000/api/orders/create", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(order)
  });

  alert("تم إرسال الطلب ✔");
}
