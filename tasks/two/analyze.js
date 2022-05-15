class AnalyzeDecisions {
  constructor (singals, decisions) {
    this.singals = singals
    this.decisions = decisions
    this.results = []
  }

  validateDesicion (analyst_decision, signal_status) {
    if (analyst_decision === 'confirm' && signal_status === 'target') {
      return true
    } else if (
      analyst_decision === 'reject' && signal_status === 'stop'
    ) {
      return true
    } else return false
  }

  analyze () {
    this.decisions.forEach((decision) => {
      const signal = this.singals.find(
        (signal) => signal.signal_number === decision.signal_number
      )
      if (signal) {
        this.results.push({
          analyst: decision.analyst,
          signal_number: decision.signal_number,
          success: this.validateDesicion(
            decision.analyst_decision,
            signal.status
          )
        })
      }
    })
    return this.results
  }

  sortAnalysts () {
    this.analyze()

    const analysts = this.results.reduce((acc, curr) => {
      if (acc[curr.analyst]) {
        acc[curr.analyst].success += curr.success
        acc[curr.analyst].count += 1
      } else {
        acc[curr.analyst] = {
          success: curr.success,
          count: 1
        }
      }
      return acc
    }
    , {})
    const sortedAnalysts = Object.keys(analysts).map((key) => {
      return {
        analyst: key,
        success: analysts[key].success / analysts[key].count
      }
    }).sort((a, b) => b.success - a.success)
    return sortedAnalysts
  }
}

module.exports = AnalyzeDecisions
