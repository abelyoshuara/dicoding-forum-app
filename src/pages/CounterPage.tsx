import { useAppDispatch } from "../hooks/useAppDispatch";
import { useAppSelector } from "../hooks/useAppSelector";
import { decrement, increment } from "../redux/counter/counterSlice";

function CounterPage() {
  const count = useAppSelector((state) => state.counter.value);
  const dispatch = useAppDispatch();

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="flex items-center gap-x-4">
        <button className="btn btn-error" onClick={() => dispatch(decrement())}>
          Decrement
        </button>
        <span className="text-2xl font-bold">{count}</span>
        <button
          className="btn btn-primary"
          onClick={() => dispatch(increment())}
        >
          Increment
        </button>
      </div>
    </div>
  );
}

export default CounterPage;
