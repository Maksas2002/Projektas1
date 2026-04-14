import UserTransactionTable from "./UserTransactionTable";

function UserHistoryBase() {
  return (
    <>
      <section className="flex justify-center border-red-500 border ml-200 mr-200">
        <UserTransactionTable />
      </section>
    </>
  );
}

export default UserHistoryBase;
