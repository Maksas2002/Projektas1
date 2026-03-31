import { Link } from "react-router";
export default function EditAccount() {
    return (
          <Link
            to="/edit"
            className="rounded-xl bg-blue-500 px-6 py-3 text-sm font-medium text-white"
          >
            Edit Account
          </Link>
    )
}