import { BiDislike, BiLike, BiSolidDislike, BiSolidLike } from "react-icons/bi";
import { Comment } from "../interfaces/attributes";
import { postedAt } from "../utils";
import { selectUserId } from "../redux/authUser/authUserSlice";
import { useSelector } from "react-redux";

interface CommentItemProps extends Comment {
  onUpVoteComment: (id: string) => void;
  onDownVoteComment: (id: string) => void;
  onNeutralCommentVote: (id: string) => void;
}

function CommentItem({
  id,
  content,
  createdAt,
  owner,
  upVotesBy,
  downVotesBy,
  onUpVoteComment,
  onDownVoteComment,
  onNeutralCommentVote,
}: CommentItemProps) {
  const authUserId = useSelector(selectUserId);
  const isUpVoted = upVotesBy.includes(authUserId);
  const isDownVoted = downVotesBy.includes(authUserId);

  const handleUpVoteComment = () => {
    if (isUpVoted) {
      onNeutralCommentVote(id);
    } else {
      onUpVoteComment(id);
    }
  };

  const handleDownVoteComment = () => {
    if (isDownVoted) {
      onNeutralCommentVote(id);
    } else {
      onDownVoteComment(id);
    }
  };

  return (
    <div className="flex flex-col gap-y-1 border-slate-300 dark:border-slate-700 py-5">
      <div className="flex items-center gap-x-3">
        <div className="avatar">
          <img src={owner.avatar} alt={owner.name} />
        </div>
        <div>
          <p className="text-md font-semibold">{owner.name}</p>
          <p className="text-sm">{postedAt(createdAt)}</p>
        </div>
      </div>

      <div
        className="mt-2 text-content2"
        dangerouslySetInnerHTML={{ __html: content }}
      />

      <div className="flex gap-x-3">
        <div
          className="flex cursor-pointer items-center"
          onClick={handleUpVoteComment}
        >
          {isUpVoted ? <BiSolidLike /> : <BiLike />}
          <span className="ms-1">{upVotesBy.length}</span>
        </div>
        <div
          className="flex cursor-pointer items-center"
          onClick={handleDownVoteComment}
        >
          {isDownVoted ? <BiSolidDislike /> : <BiDislike />}
          <span className="ms-1">{downVotesBy.length}</span>
        </div>
      </div>
    </div>
  );
}

export default CommentItem;
