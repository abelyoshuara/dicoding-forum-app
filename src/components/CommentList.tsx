import { Comment } from "../interfaces/attributes";
import CommentItem from "./CommentItem";

interface CommentListProps {
  comments: Comment[];
  onUpVoteComment: (commentId: string) => void;
  onDownVoteComment: (commentId: string) => void;
  onNeutralCommentVote: (commentId: string) => void;
}

function CommentList({
  comments,
  onUpVoteComment,
  onDownVoteComment,
  onNeutralCommentVote,
}: CommentListProps) {
  return (
    <div className="grid grid-cols-1 divide-y">
      {comments.map((comment) => (
        <CommentItem
          key={comment.id}
          {...comment}
          onUpVoteComment={onUpVoteComment}
          onDownVoteComment={onDownVoteComment}
          onNeutralCommentVote={onNeutralCommentVote}
        />
      ))}
    </div>
  );
}

export default CommentList;
