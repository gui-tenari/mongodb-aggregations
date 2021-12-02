db.trips.aggregate([
  {
    $addFields: {
      diaDaSemana: {
        $dayOfWeek: "$startTime",
      },
    },
  },
  {
    $group: {
      _id: "$diaDaSemana",
      diasTotais: { $sum: 1 },
    },
  },
  {
    $sort: {
      diasTotais: -1,
    },
  },
  {
    $limit: 1,
  },
  {
    $project: {
      _id: false,
      nomeEstacao: "$_id",
      total: "$diasTotais",
    },
  },
]);
