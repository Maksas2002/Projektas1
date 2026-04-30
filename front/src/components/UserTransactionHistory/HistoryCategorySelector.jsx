function HistoryCategorySelector({ categories, getCatId }) {
  return (
    <>
      <option onClick={() => getCatId(null)} value={null}>All categories</option>

      {categories.map((c) => (
        <option key={c.id} value={c.id} onClick={() => getCatId(c.id)} >
          {c.name}
        </option>
      ))}
    </>
  );
}

export default HistoryCategorySelector;
