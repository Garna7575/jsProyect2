const clientController = {
    clients: [
      { id: 1, name: "John Doe", email: "john@example.com" },
      { id: 2, name: "Jane Smith", email: "jane@example.com" }
    ],
  
    listClients: function () {
      return this.clients;
    },
  
    addClient: function (name, email) {
      const id = this.clients.length ? this.clients[this.clients.length - 1].id + 1 : 1;
      const newClient = { id, name, email };
      this.clients.push(newClient);
      return newClient;
    },
  
    deleteClient: function (id) {
      this.clients = this.clients.filter(client => client.id !== id);
    }
  };
  