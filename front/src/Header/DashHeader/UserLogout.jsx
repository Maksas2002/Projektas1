function UserLogout({ notToShow }) {
    return (
        <>
            <section className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black p-50">
                <h2 className="text-white text-center pb-5">Do you want to log out?</h2>
                <div className="flex gap-22">
                    <div>
                        <button className="text-white border p-2">
                            Yes
                        </button>
                    </div>

                    <div>
                        <button onClick={notToShow()} className="text-white border p-2">
                            No
                        </button>
                    </div>
                </div>
            </section>
        </>
    );
}

export default UserLogout;