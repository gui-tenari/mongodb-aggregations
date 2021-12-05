const MILISEGUNDOS_EM_MINUTOS = 60000;
db.trips.aggregate([
  {
    $match: {
      $and: [
        { startTime: { $gt: ISODate("2016-03-10") } },
        { startTime: { $lt: ISODate("2016-03-11") } },
      ],
    },
  },
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
      _id: null,
      duracaoMediaEmMinutos: {
        $avg: "$duration",
      },
    },
  },
  {
    $project: {
      _id: false,
      duracaoMediaEmMinutos: {
        $ceil: "$duracaoMediaEmMinutos",
      },
    },
  },
]);
