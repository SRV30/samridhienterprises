import { getContactForms } from "@/store/extra/contactSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import MetaData from "../extra/MetaData";

const AdminContact = () => {
  const dispatch = useDispatch();

  const contactFetch = useSelector((state) => state.contact);
  const { loading, error, contacts } = contactFetch;

  useEffect(() => {
    dispatch(getContactForms());
  }, [dispatch]);

  const limitedContacts = contacts
    ? contacts.slice(0, 50).sort((a, b) => new Date(b.date) - new Date(a.date))
    : [];

  return (
    <div className="adminContactContainer  text-white rounded-lg shadow-xl p-8">
      <MetaData title="Contact Form Submissions" />
      <h2 className="font-extrabold text-3xl mb-6 text-center text-blue-600">
        Contact Form Submissions
      </h2>
      {loading && <p className="text-center text-red-500">Loading...</p>}
      {error && <p className="text-center text-red-300">{error}</p>}
      {limitedContacts.length > 0 ? (
        <div className="mt-6">
          <h3 className="font-bold text-2xl mb-4 text-blue-400 text-center">
            Latest Submissions
          </h3>
          <ul className="space-y-6">
            {limitedContacts.map((contact) => (
              <li
                key={contact.id}
                className="bg-white p-6 rounded-lg shadow-lg transform transition-all hover:scale-105 hover:shadow-2xl"
              >
                <div className="space-y-2">
                  <p className="font-bold text-purple-800 text-xl">
                    {contact.name}
                  </p>
                  <p className="text-gray-700">
                    <span className="font-semibold">Email:</span>{" "}
                    {contact.email}
                  </p>
                  <p className="text-gray-700">
                    <span className="font-semibold">Phone:</span>{" "}
                    {contact.phone}
                  </p>
                  <p className="text-gray-600">
                    <span className="font-semibold">Message:</span>{" "}
                    {contact.message}
                  </p>
                  <p className="text-gray-500 text-sm">
                    Submitted on {new Date(contact.date).toLocaleDateString()}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        !loading && (
          <p className="text-center text-white">
            No contact form submissions found.
          </p>
        )
      )}
    </div>
  );
};

export default AdminContact;
