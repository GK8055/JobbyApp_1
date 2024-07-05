import {Component} from 'react'

class Crop extends Component {
  componentDidMount() {
    this.getCropDetails()
  }
  getCropDetails = async () => {
    const url = 'https://vegetablemarketprice.com/market/telangana/today'
    const response = await fetch(url)
    if (response.ok === true) {
      const data = await response.jsona()
      console.log(data)
    }
  }
  render() {
    return (
      <div className="container">
        <h1>Crop</h1>
      </div>
    )
  }
}

export default Crop
