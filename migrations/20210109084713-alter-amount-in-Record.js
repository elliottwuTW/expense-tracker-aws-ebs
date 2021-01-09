module.exports = {
  async up(db, client) {
    const records = await db.collection('records').find({}).toArray()
    const operations = records.map(record => {
      return db.collection('records').findOne({ _id: record._id })
        .then(targetRecord => {
          const amount = targetRecord.amount * -1
          return db.collection('records').updateOne({ _id: record._id }, {
            $set: { amount }
          })
        })
    })
    await Promise.all(operations)
  },

  async down(db, client) {
    const records = await db.collection('records').find({}).toArray()
    const operations = records.map(record => {
      return db.collection('records').findOne({ _id: record._id })
        .then(targetRecord => {
          const amount = targetRecord.amount * -1
          return db.collection('records').updateOne({ _id: record._id }, {
            $set: { amount }
          })
        })
    })
    await Promise.all(operations)
  }
};
