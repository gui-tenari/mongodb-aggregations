db.movies.aggregate([
  {
    $project: {
      _id: false,
      titulo: "$title",
    },
  },
  {
    $addFields: {
      title_split: {
        $split: ["$titulo", " "],
      },
    },
  },
  {
    $sort: {
      ano: -1,
      notaIMDB: -1,
      titulo: 1,
    },
  },
  {
    $match: {
      $expr: {
        $eq: [{ $size: "$title_split" }, 1],
      },
    },
  },
  {
    $sort: {
      titulo: 1,
    },
  },
  {
    $project: {
      _id: false,
      title_split: true,
    },
  },
]);
