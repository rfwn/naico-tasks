const database = require("./database"),
  signalSchema = require("./database/models/signal"),
  decisionSchema = require("./database/models/decision"),
  AnalyzeDecisions = require("./analyze");

(async () => {
  // Connect to database
  await database.init();

  // Get data from database

  const signals = await signalSchema.find({});
  const decisions = await decisionSchema.find({});

 const Analyst = new AnalyzeDecisions(signals, decisions);
 console.log(Analyst.sortAnalysts());
})();
