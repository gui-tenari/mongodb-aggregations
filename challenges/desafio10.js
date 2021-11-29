db.trips.aggregate([
  {
    $addFields: {
      totalTime: {
        $divide: [
          {
            $subtract: ["$stopTime", "$startTime"],
          },
          3600000,
        ],
      },
    },
  },
  {
    $group: {
      _id: "$usertype",
      duracaoMedia: { $avg: "$totalTime" },
    },
  },
  {
    $project: {
      _id: false,
      tipo: "$_id",
      totalTime: true,
      duracaoMedia: { $round: ["$duracaoMedia", 2] },
    },
  },
  {
    $sort: {
      duracaoMedia: 1,
    },
  },
]);
