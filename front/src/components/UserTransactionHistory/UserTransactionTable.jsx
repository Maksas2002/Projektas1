function UserTransactionTable() {
  return (
    <>
      <div className="border flex justify-between items-center pt-2 pb-2 pr-2 pl-2 border-white w-[70%]">
        <div>
          <p className="text-white">Name</p>
          <div className="flex gap-2">
            <p className="text-white">Categorie</p>
            <p className="text-white">Date</p>
          </div>
        </div>
        <p className="text-white ">Money</p>
      </div>
    </>
  );
}

export default UserTransactionTable;
