import { useEffect, useRef } from "react";
import LoadingBar, { LoadingBarRef } from "react-top-loading-bar";
import BaseLayout from "../components/BaseLayout";
import LeaderboardList from "../components/LeaderboardList";
import LeaderboardSkeleton from "../components/LeaderboardSkeleton";
import { useGetLeaderboardsQuery } from "../services/leaderboardService";

function LeaderboardPage() {
  const { data: leaderboards = [], isLoading } = useGetLeaderboardsQuery();
  const ref = useRef<LoadingBarRef | null>(null);

  useEffect(() => {
    if (isLoading) {
      ref.current!.continuousStart();
    } else {
      ref.current!.complete();
    }
  }, [isLoading]);

  return (
    <BaseLayout title="Leaderboard Page">
      <LoadingBar color="#0090FF" height={4} shadow={false} ref={ref} />

      <section id="leaderboard">
        <div className="container">
          <h1 className="mb-4 text-3xl font-bold">Leaderboard</h1>
          <div className="flex w-full overflow-x-auto">
            <table className="table">
              <thead>
                <tr>
                  <th className="w-16">No.</th>
                  <th>User</th>
                  <th className="w-24">Score</th>
                </tr>
              </thead>
              {isLoading ? (
                <LeaderboardSkeleton />
              ) : (
                <LeaderboardList leaderboards={leaderboards} />
              )}
            </table>
          </div>
        </div>
      </section>
    </BaseLayout>
  );
}

export default LeaderboardPage;
