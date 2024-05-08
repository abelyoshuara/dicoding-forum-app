interface LeaderboardSkeletonProps {
  count?: number;
}

function LeaderboardSkeleton({ count = 10 }: LeaderboardSkeletonProps) {
  return (
    <tbody>
      {[...Array(count)].map((_, index) => (
        <tr key={index}>
          <th>
            <div className="skeleton h-5 rounded-md"></div>
          </th>
          <td>
            <div className="skeleton h-5 rounded-md"></div>
          </td>
          <td>
            <div className="skeleton h-5 rounded-md"></div>
          </td>
        </tr>
      ))}
    </tbody>
  );
}

export default LeaderboardSkeleton;
