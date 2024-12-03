
import { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

function Balance() {
    const [accounts, setAccounts] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const register_id = sessionStorage.getItem("register_id");

    // Fetch accounts data from the backend
    const fetchAccounts = async () => {
        try {
            const response = await fetch(`http://localhost:9000/balances/${register_id}`);
            if (response.ok) {
                const data = await response.json();
                setAccounts(data);
            } else {
                console.error('Failed to fetch accounts');
            }
        } catch (error) {
            console.error('Error fetching accounts:', error);
        }
    };

    // Handle modal open and close
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    // Form validation schema using Yup
    const validationSchema = Yup.object({
        cardName: Yup.string().required('Card Name is required'),
        cardNumber: Yup.string()
            .matches(/^\d{16}$/, 'Card number must be exactly 16 digits')
            .required('Card Number is required'),
        expiryDate: Yup.date().required('Expiry Date is required'),
        cvv: Yup.string()
            .matches(/^\d{3}$/, 'CVV must be exactly 3 digits')
            .required('CVV is required'),
        amount: Yup.number()
            .typeError('Amount must be a number')
            .positive('Amount must be a positive number')
            .required('Amount is required')
    });

    // Formik setup
    const formik = useFormik({
        initialValues: {
            cardPhoto: 'https://via.placeholder.com/150',
            cardName: '',
            cardNumber: '',
            expiryDate: '',
            cvv: '',
            amount: ''
        },
        validationSchema,
        onSubmit: async (values) => {
            const accountData = { ...values, register: { id: parseInt(register_id, 10) } };
            try {
                const response = await fetch('http://localhost:9000/balances', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(accountData)
                });

                if (response.ok) {
                    const newAccountData = await response.json();
                    setAccounts([...accounts, newAccountData]); // Add the new account to the state
                    formik.resetForm(); // Reset form fields
                    closeModal();
                } else {
                    console.error('Failed to add account');
                }
            } catch (error) {
                console.error('Error submitting account:', error);
            }
        }
    });

    // Fetch accounts on component mount
    useEffect(() => {
        fetchAccounts();
    }, []);

    return (
        <div className="p-6">
            <br /> <br />
            <h1 className="text-2xl font-semibold mb-4">Accounts</h1>

            {/* Responsive layout: Table for larger devices and cards for smaller devices */}
            <div className="hidden md:block overflow-x-auto">
                <table className="min-w-full table-auto border-collapse border border-gray-300">
                    <thead className="bg-indigo-600 text-white">
                        <tr>
                            <th className="px-4 py-2 border border-gray-300">Card Name</th>
                            <th className="px-4 py-2 border border-gray-300">Card Number</th>
                            <th className="px-4 py-2 border border-gray-300">Balance Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {accounts.map((account) => (
                            <tr key={account.id}>
                                <td className="px-4 py-2 border border-gray-300">{account.cardName}</td>
                                <td className="px-4 py-2 border border-gray-300">{account.cardNumber}</td>
                                <td className="px-4 py-2 border border-gray-300">{account.amount}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Responsive Cards for smaller devices */}
            <div className="md:hidden grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {accounts.map((account) => (
                    <div key={account.id} className="bg-white border rounded-lg shadow-lg p-4">
                        <div className="flex justify-center">
                            <img
                                src="card.jpg"
                                alt="card"
                                className="w-24 h-24 object-cover rounded-md"
                            />
                        </div>
                        <h3 className="text-xl font-semibold text-center mt-4">{account.cardName}</h3>
                        <p className="text-center text-sm text-gray-500">{account.cardNumber}</p>
                        <p className="text-center text-lg font-bold text-blue-500">{account.amount}</p>
                    </div>
                ))}
            </div>

            {/* Button to add a new account */}
            <button
                onClick={openModal}
                className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-md"
            >
                Add Account
            </button>

            {/* Modal for adding account */}
            {isModalOpen && (
                <div className="z-50 fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg max-w-md w-full h-auto overflow-y-auto max-h-[90vh]">
                        <h2 className="text-xl font-semibold mb-4">Add New Account</h2>
                        <form onSubmit={formik.handleSubmit}>
                            {/* Card Name */}
                            <div className="mb-4">
                                <label className="block text-sm font-semibold mb-2">Card Name</label>
                                <input
                                    type="text"
                                    name="cardName"
                                    value={formik.values.cardName}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                />
                                {formik.touched.cardName && formik.errors.cardName && (
                                    <div className="text-red-500 text-sm">{formik.errors.cardName}</div>
                                )}
                            </div>

                            {/* Card Number */}
                            <div className="mb-4">
                                <label className="block text-sm font-semibold mb-2">Card Number</label>
                                <input
                                    type="text"
                                    name="cardNumber"
                                    value={formik.values.cardNumber}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                />
                                {formik.touched.cardNumber && formik.errors.cardNumber && (
                                    <div className="text-red-500 text-sm">{formik.errors.cardNumber}</div>
                                )}
                            </div>

                            {/* Expiry Date */}
                            <div className="mb-4">
                                <label className="block text-sm font-semibold mb-2">Expiry Date</label>
                                <input
                                    type="date"
                                    name="expiryDate"
                                    value={formik.values.expiryDate}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                />
                                {formik.touched.expiryDate && formik.errors.expiryDate && (
                                    <div className="text-red-500 text-sm">{formik.errors.expiryDate}</div>
                                )}
                            </div>

                            {/* CVV */}
                            <div className="mb-4">
                                <label className="block text-sm font-semibold mb-2">CVV</label>
                                <input
                                    type="text"
                                    name="cvv"
                                    value={formik.values.cvv}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                />
                                {formik.touched.cvv && formik.errors.cvv && (
                                    <div className="text-red-500 text-sm">{formik.errors.cvv}</div>
                                )}
                            </div>

                            {/* Balance Amount */}
                            <div className="mb-4">
                                <label className="block text-sm font-semibold mb-2">Balance Amount</label>
                                <input
                                    type="text"
                                    name="amount"
                                    value={formik.values.amount}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                />
                                {formik.touched.amount && formik.errors.amount && (
                                    <div className="text-red-500 text-sm">{formik.errors.amount}</div>
                                )}
                            </div>

                            {/* Modal buttons */}
                            <div className="flex justify-between">
                                <button
                                    type="button"
                                    onClick={closeModal}
                                    className="px-4 py-2 bg-gray-400 text-white rounded-md"
                                >
                                    Close
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-blue-500 text-white rounded-md"
                                >
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
            <br /> <br />
        </div>
    );
}

export default Balance;
