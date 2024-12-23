import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

function BillsModal({ setShowBillsModal, handleFormSubmit }) {
  // Validation Schema using Yup
  const validationSchema = Yup.object({
    billName: Yup.string().required("Bill Name is required"),
   
    dueDate: Yup.date().required("Due Date is required").nullable(),
    amount: Yup.number()
      .required("Amount is required")
      .positive("Amount must be a positive number")
      .typeError("Amount must be a number"),
  });

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-4">Add New Bill</h2>
        <Formik
          initialValues={{
            billName: "",
            billDescription: "",
            dueDate: "",
            amount: "",
          }}
          validationSchema={validationSchema}
          onSubmit={(values) => handleFormSubmit(values)}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="mb-4">
                <label htmlFor="billName" className="block text-gray-700">
                  Bill Name
                </label>
                <Field
                  type="text"
                  id="billName"
                  name="billName"
                  placeholder="Enter Bill Name"
                  className="w-full p-2 border rounded"
                />
                <ErrorMessage
                  name="billName"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="billDescription" className="block text-gray-700">
                  Item Description
                </label>
                <Field
                  type="text"
                  id="billDescription"
                  name="billDescription"
                  placeholder="Enter Item Description"
                  className="w-full p-2 border rounded"
                />
                <ErrorMessage
                  name="billDescription"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="dueDate" className="block text-gray-700">
                  Due Date
                </label>
                <Field
                  type="date"
                  id="dueDate"
                  name="dueDate"
                  className="w-full p-2 border rounded"min={new Date().toISOString().split('T')[0]} 
                />
                <ErrorMessage
                  name="dueDate"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="amount" className="block text-gray-700">
                  Amount
                </label>
                <Field
                  type="number"
                  id="amount"
                  name="amount"
                  placeholder="Enter Amount"
                  className="w-full p-2 border rounded"
                />
                <ErrorMessage
                  name="amount"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setShowBillsModal(false)}
                  className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
                >
                  Close
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-blue-700 text-white px-4 py-2 rounded"
                >
                  {isSubmitting ? "Submitting..." : "Submit"}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default BillsModal;
