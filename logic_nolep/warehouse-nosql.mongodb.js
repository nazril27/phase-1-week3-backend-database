// 1
const database = 'warehouse';

use(database);

db.createCollection('products');
db.createCollection('inventory');
db.createCollection('orders');

//2
db.products.insertMany([
    { "_id": 1, "product_name": "Laptop", "category": "Elektronik", "price": 999.99 },
    { "_id": 2, "product_name": "Meja Kursi", "category": "Perabot", "price": 199.99 },
    { "_id": 3, "product_name": "Printer", "category": "Elektronik", "price": 299.99 },
    { "_id": 4, "product_name": "Rak Buku", "category": "Perabot", "price": 149.99 }
]);

//3
db.products.find(
    {},
    { product_name: 1, price: 1, _id: 0}
).sort({ price: 1 });

// 4
db.inventory.insertMany([
    { "_id": 1, "product_id": 1, "quantity": 50, "location": "Gudang A" },
    { "_id": 2, "product_id": 2, "quantity": 30, "location": "Gudang B" },
    { "_id": 3, "product_id": 3, "quantity": 20, "location": "Gudang A" },
    { "_id": 4, "product_id": 4, "quantity": 40, "location": "Gudang B" }
]);

// 5
db.products.aggregate([
    {
        $lookup: {
          from: "inventory",
          localField: "_id",
          foreignField: "product_id",
          as: "inventory"
        }
    },
    {
        $unwind: "$inventory"
    },
    {
        $project: {
            _id: 0,
            product_name: 1,
            quantity: "$inventory.quantity",
            location: "$inventory.location"
        }
    }
]);

// 6
db.products.updateOne({ product_name: "Laptop" }, { $set: { price: 1099.99 } });

// 7
db.inventory.aggregate([
    {
        $lookup: {
          from: "products",
          localField: "product_id",
          foreignField: "_id",
          as: "product"
        }
    },
    {
        $unwind: "$product"
    },
    {
        $group: {
          _id: "$location",
          total_value: {
            $sum: {
                $multiply: ["$quantity", "$product.price"]
            }
          }
        }
    }
]);

// 8
db.orders.insertMany([
    {
    _id: 1,
    customer_id: 101,
    order_date: ISODate("2024-08-12"),
    order_details: [
      { product_id: 1, quantity: 2 },
      { product_id: 3, quantity: 1 }
    ]
  },
  {
    _id: 2,
    customer_id: 102,
    order_date: ISODate("2024-08-13"),
    order_details: [
      { product_id: 2, quantity: 1 },
      { product_id: 4, quantity: 2 }
    ]
  }
]);

// 9
db.orders.aggregate([
    {
        $unwind: "$order_details"
    },
    {
        $lookup: {
          from: "products",
          localField: "order_details.product_id",
          foreignField: "_id",
          as: "product_info"
        }
    },
    {
        $unwind: "$product_info"
    },
    {
        $addFields: {
            subtotal: {
                $multiply: ["$order_details.quantity", "$product_info.price"]
            }
        }
    },
    {
        $group: {
            _id: "$_id",
            order_date: { $first: "$order_date" },
            total_amount: { $sum: "$subtotal" }
        }
    },
    {
        $project: {
            _id: 0,
            order_id: "$_id",
            order_date: 1,
            total_amount: 1
        }
    }
]);

// 10
db.products.aggregate([
    {
        $lookup: {
          from: "orders",
          localField: "_id",
          foreignField: "order_details.product_id",
          as: "orders"
        }
    },
    {
        $match: {
          orders: { $eq: []}
        }
    },
    {
        $project: {
            _id: 1,
            product_name: 1,
            price: 1
        }
    }
]);
