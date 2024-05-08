import { useEffect, useMemo, useRef, useState } from "react";
import BaseLayout from "../components/BaseLayout";
import ThreadModal from "../components/ThreadModal";
import ThreadList from "../components/ThreadList";
import { useGetPopulateThreadsAndUsersQuery } from "../services/sharedService";
import { Thread, User } from "../interfaces/attributes";
import LoadingBar, { LoadingBarRef } from "react-top-loading-bar";
import ThreadFilter from "../components/ThreadFilter";
import ThreadSkeleton from "../components/ThreadSkeleton";
import { useAuth } from "../hooks/useAuth";
import toast from "react-hot-toast";
import {
  useDownVoteThreadMutation,
  useNeutralizeThreadVoteMutation,
  useUpVoteThreadMutation,
} from "../services/voteService";

function HomePage() {
  const { id: authUserId } = useAuth();
  const {
    data = { threads: [], users: [] },
    isLoading,
    refetch,
  } = useGetPopulateThreadsAndUsersQuery();
  const { threads, users } = data as { threads: Thread[]; users: User[] };
  const [upVote] = useUpVoteThreadMutation();
  const [downVote] = useDownVoteThreadMutation();
  const [neutralVote] = useNeutralizeThreadVoteMutation();
  const [value, setValue] = useState<string>("all");
  const ref = useRef<LoadingBarRef | null>(null);

  const threadList = threads.map((thread) => ({
    ...thread,
    user: users.find((user) => user.id === thread?.ownerId) ?? null,
    authUser: authUserId,
  }));

  const categories = [...new Set(threadList.map((thread) => thread.category))];

  const filteredThreads = useMemo(() => {
    return value === "all"
      ? threadList
      : threadList.filter((thread) => thread.category === value);
  }, [threadList, value]);

  useEffect(() => {
    if (isLoading) {
      ref.current!.continuousStart();
    } else {
      ref.current!.complete();
    }
  }, [isLoading]);

  const handleUpVoteThread = async (threadId: string) => {
    if (!authUserId) {
      toast.error("This action failed, please login first");
    } else {
      try {
        await upVote(threadId).unwrap();
        refetch();
      } catch (error) {
        toast.error((error as { message: string }).message);
      }
    }
  };

  const handleDownVoteThread = async (threadId: string) => {
    if (!authUserId) {
      toast.error("This action failed, please login first");
    } else {
      try {
        await downVote(threadId).unwrap();
        refetch();
      } catch (error) {
        toast.error((error as { message: string }).message);
      }
    }
  };

  const handleNeutralThreadVote = async (threadId: string) => {
    if (!authUserId) {
      toast.error("This action failed, please login first");
    } else {
      try {
        await neutralVote(threadId).unwrap();
        refetch();
      } catch (error) {
        toast.error((error as { message: string }).message);
      }
    }
  };

  return (
    <BaseLayout title="Home Page">
      <LoadingBar color="#0090FF" height={4} shadow={false} ref={ref} />
      <ThreadFilter
        categories={categories}
        onFilter={setValue}
        value={value}
        isLoading={isLoading}
      />

      <section id="thread-list">
        <div className="container">
          <div className="flex">
            <h1 className="mb-4 text-3xl font-bold">All Threads</h1>
            {authUserId && (
              <label className="btn btn-primary ms-auto" htmlFor="modal-1">
                Add
              </label>
            )}
          </div>
          {isLoading ? (
            <ThreadSkeleton />
          ) : (
            <ThreadList
              threads={filteredThreads}
              onUpVoteThread={handleUpVoteThread}
              onDownVoteThread={handleDownVoteThread}
              onNeutralThreadVote={handleNeutralThreadVote}
            />
          )}
        </div>
      </section>

      <ThreadModal />
    </BaseLayout>
  );
}

export default HomePage;
