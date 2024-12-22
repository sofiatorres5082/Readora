const AuthorsList = React.memo(({ title, authors }) => (
  <div className="mb-5">
    <h2 className="text-xl font-semibold mb-3">{title}</h2>
    {authors.length === 0 ? (
      <p className="text-gray-500">No hay autores para mostrar</p>
    ) : (
      <ul className="grid gap-3">
        {authors.map((author) => (
          <li
            key={author.id}
            className="p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
          >
            <span className="font-medium">{author.name}</span>
            <span className="text-gray-600 ml-2">
              ({author.birthYear} - {author.deathYear || "Presente"})
            </span>
          </li>
        ))}
      </ul>
    )}
  </div>
));
