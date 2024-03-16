import { Leaderboard } from "../interfaces/attributes";

interface LeaderboardItemProps extends Leaderboard {
  no: number;
}

function LeaderboardItem({ user, score, no }: LeaderboardItemProps) {
  return (
    <tr>
      <th>{no + 1}</th>
      <td className="flex items-center gap-x-2">
        <div className="avatar avatar-sm">
          <img src={user.avatar} alt={user.name} />
        </div>
        <span>{user.name}</span>
      </td>
      <td>{score}</td>
    </tr>
  );
}

export default LeaderboardItem;
