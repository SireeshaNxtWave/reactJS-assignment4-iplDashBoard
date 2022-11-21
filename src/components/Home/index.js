// Write your code here
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import TeamCard from '../TeamCard'

import './index.css'

class Home extends Component {
  state = {
    teamsListData: [],
    isLoading: true,
  }

  componentDidMount() {
    this.getTeamsList()
  }

  getTeamsList = async () => {
    const response = await fetch('https://apis.ccbp.in/ipl')
    const fetchedData = await response.json()

    this.setState({
      teamsListData: fetchedData.teams.map(eachTeam => ({
        name: eachTeam.name,
        id: eachTeam.id,
        teamImageUrl: eachTeam.team_image_url,
      })),
      isLoading: false,
    })
  }

  renderTeamListData = () => {
    const {teamsListData} = this.state

    return (
      <div className="ipl-bg-container">
        <div className="main-heading-container">
          <img
            className="logo-img"
            src="https://assets.ccbp.in/frontend/react-js/ipl-logo-img.png"
            alt="ipl logo"
          />
          <h1 className="main-heading-text">IPL DASHBOARD</h1>
        </div>
        <ul className="teams-list">
          {teamsListData.map(eachTeam => (
            <TeamCard key={eachTeam.id} teamData={eachTeam} />
          ))}
        </ul>
      </div>
    )
  }

  renderLoader = () => (
    <div testid="loader">
      <Loader type="Oval" color="#ffffff" height={50} width={50} />
    </div>
  )

  render() {
    const {isLoading} = this.state

    return (
      <div>{isLoading ? this.renderLoader() : this.renderTeamListData()}</div>
    )
  }
}

export default Home
