const orderController = {
    orders: [],
  
    listOrders: function () {
      return this.orders;
    },
  
    addOrder: function (clientId, product, quantity) {
      const id = this.orders.length ? this.orders[this.orders.length - 1].id + 1 : 1;
      const newOrder = { id, clientId, product, quantity };
      this.orders.push(newOrder);
      return newOrder;
    },
  
    deleteOrder: function (id) {
      this.orders = this.orders.filter(order => order.id !== id);
    },
  
    listOrdersByClient: function (clientId) {
      return this.orders.filter(order => order.clientId === clientId);
    }
  };
  