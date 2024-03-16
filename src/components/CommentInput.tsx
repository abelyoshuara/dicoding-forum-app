import { SubmitHandler, useForm } from "react-hook-form";
import { AddCommentRequest } from "../interfaces/requests";

interface CommentInputProps {
  onAddComment: (values: AddCommentRequest) => void;
  isLoading: boolean;
}

function CommentInput({ onAddComment, isLoading }: CommentInputProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<AddCommentRequest>();

  const onSubmit: SubmitHandler<AddCommentRequest> = (data) => {
    onAddComment(data);
    reset();
  };

  return (
    <form className="form-group" onSubmit={handleSubmit(onSubmit)}>
      <div className="form-field">
        <label htmlFor="content" className="form-label text-lg">
          Give a comment
        </label>
        <div className="form-control">
          <textarea
            className={`textarea max-w-4xl ${errors.content ? "textarea-solid-error" : "textarea-solid"}`}
            id="content"
            placeholder="Enter comment..."
            rows={4}
            {...register("content", {
              required: "This field is required",
            })}
          />
        </div>
        {errors.content && (
          <label htmlFor="content" className="form-label">
            <span className="form-label-alt text-error">
              {errors.content?.message}
            </span>
          </label>
        )}
      </div>

      <div className="form-field">
        <div className="form-control justify-between">
          <button
            type="submit"
            className={`btn btn-primary ${isLoading && "btn-loading"}`}
          >
            Send
          </button>
        </div>
      </div>
    </form>
  );
}

export default CommentInput;
