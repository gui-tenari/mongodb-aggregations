db.trips.aggregate([
  {
    $match: {
      birthYear: {
        $nin: [
          null,
          "",
        ],
      },
    },
  },
  {
    $group: {
      _id: null,
      maiorAnoNascimento: {
        $max: {
          $toInt: "$birthYear",
        },
      },
      menorAnoNascimento: {
        $min: {
          $toInt: "$birthYear",
        },
      },
    },
  },
  {
    $project: {
      _id: false,
    },
  },
]);
