
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {id: 1, username: 'Burt', password: "StepinTime"},
        {id: 2, username: 'MR_Banks', password: "ChaChing"},
        {id: 3, username: 'MRS_Banks', password: "Votes4Women"}
      ]);
    });
};
