export const SearchResultList = ({ results, onSelect }) => {
  return (
    <div className="results-list bg-white shadow-md rounded max-h-60 overflow-y-auto">
      {results.map((result, id) => (
        <div
          key={id}
          className="p-2 cursor-pointer hover:bg-gray-100"
          onClick={() => onSelect(result)}
        >
          {result.title} {result.author.name} {result.language}
        </div>
      ))}
    </div>
  );
};
