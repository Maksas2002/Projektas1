function HistoryCategorySelector({ categories }) {
  return (
    <>
      <option value={null}>All categories</option>

      {categories.map((c) => (
        <option key={c.id} value={c.id} >
          {c.name}
        </option>
      ))}
    </>
  );
}

export default HistoryCategorySelector;
