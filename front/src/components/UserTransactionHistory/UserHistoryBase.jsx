import UserTransactionTable from "./UserTransactionTable";

function UserHistoryBase() {
  const fetchTransactions = async () => {
      try {
      const response = await axios.get(
        `${API_URL}/`,
        {
          withCredentials: true,
        },
      );
      // console.log(response.data.data);
    } catch (error) {
      setError(errorHandler(error));
    }
  };

  return (
    <>
      <section className="flex justify-center border-red-500 border ml-200 mr-200">
        <UserTransactionTable />
      </section>
    </>
  );
}

export default UserHistoryBase;
