module.exports = {
  async up(db, client) {
    await db.collection('records').updateMany({}, { $set: { isIncome: false } })
  },

  async down(db, client) {
    await db.collection('records').updateMany({}, { $unset: { isIncome: null } })
  }
};
