import { useEffect, useRef } from "react";
import { BiDislike, BiLike, BiSolidDislike, BiSolidLike } from "react-icons/bi";
import { Link, useParams } from "react-router-dom";
import { postedAt } from "../utils";
import BaseLayout from "../components/BaseLayout";
import CommentList from "../components/CommentList";
import { useGetThreadQuery } from "../services/threadService";
import LoadingBar, { LoadingBarRef } from "react-top-loading-bar";
import CommentInput from "../components/CommentInput";
import { useSelector } from "react-redux";
import { selectUserId } from "../redux/authUser/authUserSlice";
import toast from "react-hot-toast";
import { useAddCommentMutation } from "../services/commentService";
import {
  useDownVoteCommentMutation,
  useDownVoteThreadMutation,
  useNeutralizeCommentVoteMutation,
  useNeutralizeThreadVoteMutation,
  useUpVoteCommentMutation,
  useUpVoteThreadMutation,
} from "../services/voteService";

function ThreadDetailPage() {
  const { threadId = "" } = useParams();
  const {
    data: thread,
    isLoading,
    error,
    refetch,
  } = useGetThreadQuery(threadId || "", {
    skip: !threadId,
  });
  const [upVote] = useUpVoteCommentMutation();
  const [downVote] = useDownVoteCommentMutation();
  const [neutralVote] = useNeutralizeCommentVoteMutation();
  const [upVoteThread] = useUpVoteThreadMutation();
  const [downVoteThread] = useDownVoteThreadMutation();
  const [neutralThreadVote] = useNeutralizeThreadVoteMutation();
  const [addComment, { isLoading: isLoadingAddComment }] =
    useAddCommentMutation();
  const ref = useRef<LoadingBarRef | null>(null);
  const authUserId = useSelector(selectUserId);

  if (error) {
    if ("status" in error) {
      const errMsg =
        "message" in error
          ? (error as { message: string }).message
          : JSON.stringify(error);
      throw new Error(errMsg);
    } else {
      throw new Error(error.message);
    }
  }

  const isUpVoted = thread?.upVotesBy.includes(authUserId);
  const isDownVoted = thread?.downVotesBy.includes(authUserId);

  useEffect(() => {
    if (isLoading) {
      ref.current!.continuousStart();
    } else {
      ref.current!.complete();
    }
  }, [isLoading]);

  const handleAddComment = ({ content }: { content: string }) => {
    const add = addComment({ threadId, content }).unwrap();
    toast.promise(add, {
      loading: "Sending...",
      success: () => {
        refetch();
        return `Successfully added`;
      },
      error: (err) => `${err.message}`,
    });
  };

  const handleUpVoteThread = async () => {
    if (!authUserId) {
      toast.error("This action failed, please login first");
    } else {
      try {
        if (isUpVoted) {
          await neutralThreadVote(threadId).unwrap();
        } else {
          await upVoteThread(threadId).unwrap();
        }
        refetch();
      } catch (error) {
        toast.error((error as { message: string }).message);
      }
    }
  };

  const handleDownVoteThread = async () => {
    if (!authUserId) {
      toast.error("This action failed, please login first");
    } else {
      try {
        if (isDownVoted) {
          await neutralThreadVote(threadId).unwrap();
        } else {
          await downVoteThread(threadId).unwrap();
        }
        refetch();
      } catch (error) {
        toast.error((error as { message: string }).message);
      }
    }
  };

  const handleUpVoteComment = async (commentId: string) => {
    if (!authUserId) {
      toast.error("This action failed, please login first");
    } else {
      try {
        await upVote({ threadId, commentId }).unwrap();
        refetch();
      } catch (error) {
        toast.error((error as { message: string }).message);
      }
    }
  };

  const handleDownVoteComment = async (commentId: string) => {
    if (!authUserId) {
      toast.error("This action failed, please login first");
    } else {
      try {
        await downVote({ threadId, commentId }).unwrap();
        refetch();
      } catch (error) {
        toast.error((error as { message: string }).message);
      }
    }
  };

  const handleNeutralCommentVote = async (commentId: string) => {
    if (!authUserId) {
      toast.error("This action failed, please login first");
    } else {
      try {
        await neutralVote({ threadId, commentId }).unwrap();
        refetch();
      } catch (error) {
        toast.error((error as { message: string }).message);
      }
    }
  };

  return (
    <BaseLayout title="Thread Detail Page">
      <LoadingBar color="#0090FF" height={4} shadow={false} ref={ref} />

      {isLoading ? (
        <section id="thread-loading">
          <div className="container">
            <p>Loading...</p>
          </div>
        </section>
      ) : (
        <>
          <section id="thread-detail">
            <div className="container">
              <div className="flex items-center gap-x-3">
                <div className="avatar">
                  <img src={thread?.owner.avatar} alt={thread?.owner.name} />
                </div>
                <div>
                  <p className="text-md font-semibold">{thread?.owner.name}</p>
                  <p className="text-sm">{postedAt(thread!.createdAt)}</p>
                </div>
              </div>

              <h1 className="mt-4 text-3xl font-bold">{thread?.title}</h1>

              <div className="mt-1">
                <button className="btn btn-xs btn-solid-primary">
                  {thread?.category}
                </button>
              </div>

              <div
                className="mt-3 text-content2"
                dangerouslySetInnerHTML={{ __html: thread!.body }}
              />

              <div className="mt-3 flex gap-x-3">
                <div
                  className="flex cursor-pointer items-center"
                  onClick={handleUpVoteThread}
                >
                  {isUpVoted ? <BiSolidLike /> : <BiLike />}
                  <span className="ms-1">{thread?.upVotesBy.length}</span>
                </div>
                <div
                  className="flex cursor-pointer items-center"
                  onClick={handleDownVoteThread}
                >
                  {isDownVoted ? <BiSolidDislike /> : <BiDislike />}
                  <span className="ms-1">{thread?.downVotesBy.length}</span>
                </div>
              </div>
            </div>
          </section>

          <section id="comment-input" className="mt-5">
            <div className="container">
              {authUserId ? (
                <CommentInput
                  onAddComment={handleAddComment}
                  isLoading={isLoadingAddComment}
                />
              ) : (
                <div className="alert alert-warning">
                  <svg
                    width="40"
                    height="35"
                    viewBox="0 0 40 35"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M4.94024 35.0004H35.0602C38.1402 35.0004 40.0602 31.6604 38.5202 29.0004L23.4602 2.98035C21.9202 0.320352 18.0802 0.320352 16.5402 2.98035L1.48024 29.0004C-0.0597576 31.6604 1.86024 35.0004 4.94024 35.0004ZM20.0002 21.0004C18.9002 21.0004 18.0002 20.1004 18.0002 19.0004V15.0004C18.0002 13.9004 18.9002 13.0004 20.0002 13.0004C21.1002 13.0004 22.0002 13.9004 22.0002 15.0004V19.0004C22.0002 20.1004 21.1002 21.0004 20.0002 21.0004ZM22.0002 29.0004H18.0002V25.0004H22.0002V29.0004Z"
                      fill="#F98600"
                    />
                  </svg>
                  <div className="flex flex-col">
                    <span>Form Comment</span>
                    <span className="text-content2">
                      Please{" "}
                      <Link to={"/login"} className="underline text-primary">
                        login
                      </Link>{" "}
                      first to comment
                    </span>
                  </div>
                </div>
              )}
            </div>
          </section>

          <section id="comment-list" className="mt-5">
            <div className="container">
              <h3 className="text-2xl font-semibold">
                {thread?.comments.length} Comments
              </h3>
              <CommentList
                comments={thread?.comments || []}
                onUpVoteComment={handleUpVoteComment}
                onDownVoteComment={handleDownVoteComment}
                onNeutralCommentVote={handleNeutralCommentVote}
              />
            </div>
          </section>
        </>
      )}
    </BaseLayout>
  );
}

export default ThreadDetailPage;
