import { ThreadWithUser } from "../interfaces/attributes";
import ThreadItem from "./ThreadItem";

interface ThreadListProps {
  threads: ThreadWithUser[];
  onUpVoteThread: (threadId: string) => void;
  onDownVoteThread: (threadId: string) => void;
  onNeutralThreadVote: (threadId: string) => void;
}

function ThreadList({
  threads,
  onUpVoteThread,
  onDownVoteThread,
  onNeutralThreadVote,
}: ThreadListProps) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {threads.map((thread) => (
        <ThreadItem
          key={thread.id}
          {...thread}
          onUpVoteThread={onUpVoteThread}
          onDownVoteThread={onDownVoteThread}
          onNeutralThreadVote={onNeutralThreadVote}
        />
      ))}
    </div>
  );
}

export default ThreadList;
