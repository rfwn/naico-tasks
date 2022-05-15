const database = require('./database')
const signalSchema = require('./database/models/signal')
const decisionSchema = require('./database/models/decision')
const AnalyzeDecisions = require('./analyze');

(async () => {
  // Connect to database
  await database.init()

  // Get data from database

  const signals = await signalSchema.find({})
  const decisions = await decisionSchema.find({})

  const Analyst = new AnalyzeDecisions(signals, decisions)
  console.log(Analyst.sortAnalysts())
})()
