class TrendData {
  constructor() {
    this.data = []
    this.keys = ['1', '2']
    this.colors = ['rgba(53,161,107,1)', 'rgba(255,153,160,1)', 'rgba(102,51,0,1)', 'rgba(255,40,0,1)', 'rgba(0,65,255,1)', 'rgba(255,153,0,1)', 'rgba(250,245,0,1)', 'rgba(102,204,255,1)', 'rgba(154,0,121,1)', 'rgba(127,135,143,1)']
    this.labels = ['白スキッパーシャツ', 'デコラティブ']
    this.detailIdx = null
    this.details = []
    this.columns = ['date', 'title', 'author', 'like', 'url']
  }
  refreshTrendData(data) {
    this.detailIdx = null
    this.details.splice(0, this.details.length)
    this.data.splice(0, this.data.length)
    if (!data) {
      return
    }
    for (let idx = 0; idx < data.trendData.length; idx ++) {
      this.data.push(data.trendData[idx])
    }
    for (let idx = 0; idx < data.detail.length; idx ++) {
      this.details.push(data.detail[idx])
    }
  }
  refreshDetail(idx) {
    if (idx == this.detailIdx) {
      return
    }
    this.detailIdx = idx
  }
}
export default TrendData
