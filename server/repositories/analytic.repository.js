import Order from "../models/order.model.js";


//aggregation to get total sales
export const getTotalProfitRepo = async(query) => {
  try {
      const info = await Order.aggregate([ 
        {$match: {rid: parseInt(query.rid), status: 3}},
        {$group: {
          _id: query.rid, // Group all documents into a single group
          totalAmount: { $sum: "$total" } // Calculate the sum of the total field
        }}
      ])
      return [true, info];

  } catch (e) {
    throw Error ("Error while retrieving profit information")
  }
}

/*
  Equivalent to: SELECT items FROM orders inner join items WHERE order.items.item = items._id
*/
export const getTotalPopularItemsRepo = async(query) => { 
  try { 
    //need to populate result with menu item information
    const info = await Order.aggregate([
      {$match: {rid: parseInt(query.rid), status: 3}},
      {$lookup: 
        {
          from: "items", //the collection that wish to be join
          localField: "items.item", //the field of the current result
          foreignField: "_id", //the field from the collection that wishes to be join, must match 
          as: "item" 
        }
      },
      { $unwind: "$items" }, //Deconstructs an array field from the input documents to output a document for each element. 
      { $group: {
        _id: "$items.item", // group item together by the reference id
        count: { $sum: 1 }, // Count the occurrences of each unique reference ID
        item: { $first: { $arrayElemAt: ["$item", 0] }} //return an array, this makes it returns only the first item
      }}
    ])
    return[true, info];
  } catch (e) {
    throw Error ("Error while retrieving popular items information")
  }
}

//working progress
export const getHourCountRepo = async(query) => {
    const info = await Order.aggregate([
      {$match: {rid: parseInt(query.rid), status: 3}},
      {
        $addFields: {
          orderHour: { $dateToString: { format: "%H", date: "$orderAt" } }
        }
      },
      // Group by the 'orderHour' field and count the number of orders for each hour
      {
        $group: {
          _id: "$orderHour",
          count: { $sum: 1 }
        }
      },
      // Optionally, sort by hour
      { $sort: { _id: 1 } }
    ]);
    return[true, info];
}