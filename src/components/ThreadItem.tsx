import {
  BiDislike,
  BiLike,
  BiCommentDetail,
  BiSolidDislike,
  BiSolidLike,
} from "react-icons/bi";
import { Link } from "react-router-dom";
import { postedAt } from "../utils";
import { ThreadWithUser } from "../interfaces/attributes";

interface ThreadItemProps extends ThreadWithUser {
  onUpVoteThread: (threadId: string) => void;
  onDownVoteThread: (threadId: string) => void;
  onNeutralThreadVote: (threadId: string) => void;
}

function ThreadItem({
  id,
  title,
  body,
  category,
  createdAt,
  upVotesBy,
  downVotesBy,
  totalComments,
  user,
  authUser,
  onUpVoteThread,
  onDownVoteThread,
  onNeutralThreadVote,
}: ThreadItemProps) {
  const isUpVoted: boolean = upVotesBy.includes(authUser);
  const isDownVoted: boolean = downVotesBy.includes(authUser);

  const handleUpVote = () => {
    if (isUpVoted) {
      onNeutralThreadVote(id);
    } else {
      onUpVoteThread(id);
    }
  };

  const handleDownVote = () => {
    if (isDownVoted) {
      onNeutralThreadVote(id);
    } else {
      onDownVoteThread(id);
    }
  };

  return (
    <div className="card max-w-full">
      <div className="card-body gap-y-1">
        <div className="flex items-center gap-x-3">
          <div className="avatar">
            <img src={user!.avatar} alt="avatar" />
          </div>
          <div>
            <p className="text-md">{user!.name}</p>
            <p className="text-sm">{postedAt(createdAt)}</p>
          </div>
        </div>

        <h1 className="card-header mt-2 truncate transition duration-200 ease-in-out hover:text-blue-500">
          <Link to={`/threads/${id}`}>{title}</Link>
        </h1>

        <div
          className="multi-line-text-truncate text-content2"
          dangerouslySetInnerHTML={{ __html: body }}
        />

        <div className="mt-1 flex">
          <span className="badge border border-gray-400 font-medium">
            {category}
          </span>
        </div>

        <div className="mt-3 flex gap-x-3">
          <div
            className="flex cursor-pointer items-center"
            onClick={handleUpVote}
          >
            {isUpVoted ? <BiSolidLike /> : <BiLike />}
            <span className="ms-1">{upVotesBy.length}</span>
          </div>
          <div
            className="flex cursor-pointer items-center"
            onClick={handleDownVote}
          >
            {isDownVoted ? <BiSolidDislike /> : <BiDislike />}
            <span className="ms-1">{downVotesBy.length}</span>
          </div>
          <div className="ms-auto flex items-center">
            <BiCommentDetail /> <span className="ms-1">{totalComments}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ThreadItem;
