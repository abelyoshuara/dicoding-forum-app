interface ThreadFilterProps {
  categories: string[];
  value: string;
  onFilter: (value: string) => void;
  isLoading: boolean;
}

function ThreadFilter({
  categories,
  value,
  onFilter,
  isLoading,
}: ThreadFilterProps) {
  return (
    <section id="thread-filter">
      <div className="container mt-2">
        <div className="mb-5 flex flex-wrap gap-2">
          {isLoading ? (
            [...Array(15)].map((_, index) => (
              <div key={index} className="chip skeleton h-8 w-16"></div>
            ))
          ) : (
            <>
              <div
                className={`chip ${value === "all" ? "active" : ""}`}
                onClick={() => onFilter("all")}
              >
                all
              </div>

              {categories.map((category) => (
                <div
                  className={`chip ${value === category ? "active" : ""}`}
                  key={category}
                  onClick={() => onFilter(category)}
                >
                  {category}
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </section>
  );
}

export default ThreadFilter;
