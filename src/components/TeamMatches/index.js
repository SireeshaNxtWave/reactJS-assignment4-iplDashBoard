// Write your code here
import Loader from 'react-loader-spinner'
import {Component} from 'react'
import LatestMatch from '../LatestMatch'

import './index.css'
import MatchCard from '../MatchCard'

const initialBackgroundColors = [
  'yankeesBlue',
  'auburn',
  'liberty',
  'red',
  'yellow',
  'pink',
  'blue',
  'orange',
  'lightBlue',
  'dark',
]

class TeamMatches extends Component {
  state = {teamData: {}, isLoading: true}

  componentDidMount() {
    this.getTeamData()
  }

  getTeamData = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    const response = await fetch(`https://apis.ccbp.in/ipl/${id}`)
    const data = await response.json()

    this.setState({
      teamData: data,
      isLoading: false,
    })
  }

  renderLoader = () => (
    <div testid="loader">
      <Loader type="Oval" color="#ffffff" height={50} width={50} />
    </div>
  )

  renderTeamData = () => {
    const {teamData} = this.state
    console.log(teamData)

    const latestMatch = {
      competingTeam: teamData.latest_match_details.competing_team,
      competingTeamLogo: teamData.latest_match_details.competing_team_logo,
      date: teamData.latest_match_details.date,
      result: teamData.latest_match_details.result,
      umpires: teamData.latest_match_details.umpires,
      manOfTheMatch: teamData.latest_match_details.man_of_the_match,
      id: teamData.latest_match_details.id,
      firstInnings: teamData.latest_match_details.first_innings,
      secondInnings: teamData.latest_match_details.second_innings,
      matchStatus: teamData.latest_match_details.match_status,
      venue: teamData.latest_match_details.venue,
    }

    const recentMatchDetails = teamData.recent_matches.map(eachMatch => ({
      competingTeam: eachMatch.competing_team,
      competingTeamLogo: eachMatch.competing_team_logo,
      date: eachMatch.date,
      result: eachMatch.result,
      umpires: eachMatch.umpires,
      manOfTheMatch: eachMatch.man_of_the_match,
      id: eachMatch.id,
      firstInnings: eachMatch.first_innings,
      secondInnings: eachMatch.second_innings,
      matchStatus: eachMatch.match_status,
      venue: eachMatch.venue,
    }))

    const backgroundColorClassNames = `initial-container ${
      initialBackgroundColors[
        Math.ceil(Math.random() * initialBackgroundColors.length - 1)
      ]
    }`

    return (
      <div className={backgroundColorClassNames}>
        <img
          src={teamData.team_banner_url}
          alt="team banner"
          className="team-banner"
        />
        <p className="description">Latest Matches</p>
        <LatestMatch key={latestMatch.id} latestMatchDetails={latestMatch} />
        <ul className="recent-matches-container">
          {recentMatchDetails.map(eachMatch => (
            <MatchCard key={eachMatch.id} matchData={eachMatch} />
          ))}
        </ul>
      </div>
    )
  }

  render() {
    const {isLoading} = this.state
    return <div>{isLoading ? this.renderLoader() : this.renderTeamData()}</div>
  }
}

export default TeamMatches
