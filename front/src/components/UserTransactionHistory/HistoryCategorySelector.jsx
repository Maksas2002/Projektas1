function HistoryCategorySelector({ categories, getCatId }) {
  return (
    <>
      <option value={null}>All categories</option>

      {categories.map((c) => (
        <option key={c.id} value={c.id} onClick={() => getCatId(c.id)} >
          {c.name}
        </option>
      ))}
    </>
  );
}

export default HistoryCategorySelector;
