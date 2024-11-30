document.addEventListener("DOMContentLoaded", () => {
    const clientList = document.getElementById("client-list");
    const orderList = document.getElementById("order-list");
    const clientSelect = document.getElementById("client-select");
  
    const renderClients = () => {
      clientList.innerHTML = "";
      clientSelect.innerHTML = '<option value="" disabled selected>Select Client</option>';
  
      clientController.listClients().forEach(client => {
        const li = document.createElement("li");
        li.className = "list-group-item";
        li.innerHTML = `
          ${client.name} (${client.email})
          <button class="btn btn-danger btn-sm" data-id="${client.id}">Delete</button>
        `;
  
        li.querySelector("button").addEventListener("click", () => {
          clientController.deleteClient(client.id);
          renderClients();
          renderOrders();
        });
  
        clientList.appendChild(li);
  
        const option = document.createElement("option");
        option.value = client.id;
        option.textContent = client.name;
        clientSelect.appendChild(option);
      });
    };
  
    const renderOrders = () => {
      orderList.innerHTML = "";
  
      orderController.listOrders().forEach(order => {
        const client = clientController.clients.find(c => c.id === order.clientId);
        const li = document.createElement("li");
        li.className = "list-group-item";
        li.innerHTML = `
          ${order.product} (x${order.quantity}) - ${client?.name || "Unknown"}
          <button class="btn btn-danger btn-sm" data-id="${order.id}">Delete</button>
        `;
  
        li.querySelector("button").addEventListener("click", () => {
          orderController.deleteOrder(order.id);
          renderOrders();
        });
  
        orderList.appendChild(li);
      });
    };
  
    document.getElementById("add-client-form").addEventListener("submit", e => {
      e.preventDefault();
      const name = document.getElementById("client-name").value;
      const email = document.getElementById("client-email").value;
  
      clientController.addClient(name, email);
      renderClients();
      e.target.reset();
    });
  
    document.getElementById("add-order-form").addEventListener("submit", e => {
      e.preventDefault();
      const clientId = parseInt(clientSelect.value, 10);
      const product = document.getElementById("order-product").value;
      const quantity = parseInt(document.getElementById("order-quantity").value, 10);
  
      orderController.addOrder(clientId, product, quantity);
      renderOrders();
      e.target.reset();
    });
  
    renderClients();
    renderOrders();
  });
  