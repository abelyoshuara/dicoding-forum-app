import { Leaderboard } from "../interfaces/attributes";
import LeaderboardItem from "./LeaderboardItem";

interface LeaderboardListProps {
  leaderboards: Leaderboard[];
}

function LeaderboardList({ leaderboards }: LeaderboardListProps) {
  return (
    <tbody>
      {leaderboards.map((leaderboard, index) => (
        <LeaderboardItem
          key={leaderboard.user.id}
          {...leaderboard}
          no={index}
        />
      ))}
    </tbody>
  );
}

export default LeaderboardList;
