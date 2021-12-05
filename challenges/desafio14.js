const MILISEGUNDOS_EM_MINUTOS = 60000;
db.trips.aggregate([
  {
    $addFields: {
      duration: {
        $divide: [
          { $subtract: ["$stopTime", "$startTime"] },
          MILISEGUNDOS_EM_MINUTOS,
        ],
      },
    },
  },
  {
    $group: {
      _id: "$bikeid",
      duracaoMedia: {
        $avg: "$duration",
      },
    },
  },
  {
    $project: {
      _id: false,
      bikeId: "$_id",
      duracaoMedia: {
        $ceil: "$duracaoMedia",
      },
    },
  },
  {
    $sort: {
      duracaoMedia: -1,
    },
  },
  {
    $limit: 5,
  },
]);
