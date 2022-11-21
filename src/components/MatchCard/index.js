// Write your code here
import './index.css'

const MatchCard = props => {
  const {matchData} = props
  const {competingTeam, competingTeamLogo, result, matchStatus} = matchData

  let matchStatusColor

  if (matchStatus === 'Won') {
    matchStatusColor = 'won-status'
  } else {
    matchStatusColor = 'lost-status'
  }

  return (
    <li className="match-card">
      <img
        src={competingTeamLogo}
        alt="competing team {competingTeam}"
        className="team-logo"
      />
      <p>{competingTeam}</p>
      <p>{result}</p>
      <p className={matchStatusColor}>{matchStatus}</p>
    </li>
  )
}

export default MatchCard
