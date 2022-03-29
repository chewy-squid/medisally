export default class MSD {
  constructor(params) {
    this.userID = params.userID
    this.load = params.load || (async () => {})
    this.save = params.save || (async () => {})
  }

  async init() {
    this.rawData = await this.load()
  }

  async fetcher(...args) {
    return 1
  }
}