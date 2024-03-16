import { SubmitHandler, useForm } from "react-hook-form";
import { BiX } from "react-icons/bi";
import { AddThreadRequest } from "../interfaces/requests";
import { useAddThreadMutation } from "../services/threadService";
import toast from "react-hot-toast";

export default function ThreadModal() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<AddThreadRequest>();
  const [addThread, { isLoading }] = useAddThreadMutation();

  const onSubmit: SubmitHandler<AddThreadRequest> = (data) => {
    const add = addThread(data).unwrap();
    toast.promise(add, {
      loading: "Saving...",
      success: ({ data }) => `Successfully added ${data.thread.title}`,
      error: (err) => `${err.message}`,
    });
    reset();
  };

  return (
    <>
      <input className="modal-state" id="modal-1" type="checkbox" />
      <div className="modal">
        <label className="modal-overlay" htmlFor="modal-1"></label>
        <div className="modal-content flex w-full flex-col gap-5 p-7">
          <label
            htmlFor="modal-1"
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          >
            <BiX size={30} />
          </label>
          <h2 className="text-center text-2xl font-semibold">Add Thread</h2>

          <section>
            <form className="form-group" onSubmit={handleSubmit(onSubmit)}>
              <div className="form-field">
                <label htmlFor="title" className="form-label">
                  Title
                </label>
                <div className="form-control">
                  <input
                    className={`input max-w-full ${errors.title ? "input-solid-error" : "input-solid"}`}
                    id="title"
                    placeholder="Title"
                    {...register("title", {
                      required: "This field is required",
                    })}
                  />
                </div>
                {errors.title && (
                  <label htmlFor="title" className="form-label">
                    <span
                      className="form-label-alt text-error"
                      data-testid="errTitle"
                    >
                      {errors.title?.message}
                    </span>
                  </label>
                )}
              </div>

              <div className="form-field">
                <label htmlFor="category" className="form-label">
                  Category
                </label>
                <div className="form-control">
                  <input
                    className={`input max-w-full ${errors.category ? "input-solid-error" : "input-solid"}`}
                    id="category"
                    placeholder="Category"
                    {...register("category", {
                      required: "This field is required",
                    })}
                  />
                </div>
                {errors.category && (
                  <label htmlFor="category" className="form-label">
                    <span
                      className="form-label-alt text-error"
                      data-testid="errCategory"
                    >
                      {errors.category?.message}
                    </span>
                  </label>
                )}
              </div>

              <div className="form-field">
                <label htmlFor="content" className="form-label">
                  Content
                </label>
                <div className="form-control">
                  <textarea
                    className={`textarea max-w-full ${errors.body ? "textarea-solid-error" : "textarea-solid"}`}
                    id="content"
                    placeholder="Content"
                    rows={4}
                    {...register("body", {
                      required: "This field is required",
                    })}
                  />
                </div>
                {errors.body && (
                  <label htmlFor="content" className="form-label">
                    <span
                      className="form-label-alt text-error"
                      data-testid="errContent"
                    >
                      {errors.body?.message}
                    </span>
                  </label>
                )}
              </div>

              <div className="form-field pt-5">
                <div className="form-control justify-between">
                  <button
                    type="submit"
                    className={`btn btn-primary w-full ${isLoading && "btn-loading"}`}
                  >
                    Save
                  </button>
                </div>
              </div>
            </form>
          </section>
        </div>
      </div>
    </>
  );
}
