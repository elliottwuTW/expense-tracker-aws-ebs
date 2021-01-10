module.exports = {
  async up(db, client) {
    await db.collection('categories').updateMany({}, { $set: { type: 'expense' } })
  },

  async down(db, client) {
    await db.collection('categories').updateMany({}, { $unset: { type: null } })
  }
};
