
import { Formik, Field, Form, ErrorMessage } from "formik";
//import * as Yup from "yup";

function GoalsModal({ setShowGoalsModal, handleSubmit, validationSchema }) {
    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <h2 className="text-2xl font-bold mb-4">Set New Goal</h2>
                <Formik
                    initialValues={{
                        goalName: "",
                        target: "",
                    }}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ isSubmitting }) => (
                        <Form>
                            <div className="mb-4">
                                <label className="block text-gray-700">Goal Name</label>
                                <Field
                                    type="text"
                                    name="goalName"
                                    className="w-full p-2 border rounded"
                                    placeholder="Enter Goal Name"
                                />
                                <ErrorMessage
                                    name="goalName"
                                    component="div"
                                    className="text-red-500 text-sm"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">Enter Goal Target</label>
                                <Field
                                    type="number"
                                    name="target"
                                    className="w-full p-2 border rounded"
                                    placeholder="Enter Goal Target"
                                />
                                <ErrorMessage
                                    name="target"
                                    component="div"
                                    className="text-red-500 text-sm"
                                />
                            </div>
                            <div className="flex justify-end">
                                <button
                                    type="button"
                                    onClick={() => setShowGoalsModal(false)}
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

export default GoalsModal;
