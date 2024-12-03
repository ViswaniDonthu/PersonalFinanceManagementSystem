
import { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router';
function Transactions() {
    const [transactions, setTransactions] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
const navigate=useNavigate()
    useEffect(() => {
        fetchTransactions();
    }, []);

    const fetchTransactions = async () => {
        const storedLoginId = sessionStorage.getItem("register_id");
        if(!storedLoginId){
            navigate('/login')
        }
        try {
            
            const response = await fetch(`http://localhost:9000/transaction/users/${storedLoginId}`);
            if (response.ok) {
                const data = await response.json();
                setTransactions(data);
            } else {
                console.error('Failed to fetch transactions');
            }
        } catch (error) {
            console.error('Error fetching transactions:', error);
        }
    };

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const formik = useFormik({
        initialValues: {
            accountName: '',
            goal: '',
            transactionType: '',
            accountNumber: '',
            date: '',
            amount: '',
        },
        validationSchema: Yup.object({
            accountName: Yup.string().required('Account Name is required'),
            goal: Yup.string().required('Goal is required'),
            transactionType: Yup.string()
                .oneOf(['credit', 'debit'], 'Transaction Type must be either Credit or Debit')
                .required('Transaction Type is required'),
            accountNumber: Yup.string()
                .matches(/^\d{16}$/, 'Account Number must be exactly 16 digits')
                .required('Account Number is required'),
            date: Yup.string().required('Date is required'),
            amount: Yup.number()
                .typeError('Amount must be a number')
                .positive('Amount must be positive')
                .required('Amount is required'),
        }),
        onSubmit: async (values) => {
            const storedLoginId = sessionStorage.getItem("register_id");
            const transactionData = {
                ...values,
                register: {
                    id: storedLoginId,
                },
            };

            try {
                const res = await fetch("http://localhost:9000/transaction/accountcheck", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ accountNumber: values.accountNumber }),
                });

                const data = await res.json();

                if (data.present) {
                    try {
                        const response = await fetch("http://localhost:9000/transaction/save", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify(transactionData),
                        });

                        if (response.ok) {
                            alert("Transaction added successfully!");
                            closeModal();
                            fetchTransactions();
                        } else {
                            alert("Failed to add transaction");
                        }
                    } catch (error) {
                        console.error("Error submitting transaction:", error);
                        alert("Error submitting transaction");
                    }
                } else {
                    alert("Please add account details to add a transaction");
                }
            } catch (error) {
                console.error(error);
            }
        },
    });

    return (
        <div className="p-6">
            <br></br><br></br>
            <h1 className="text-2xl font-semibold mb-4">Transactions</h1>

            <div className="sm:hidden">
                {transactions.map((transaction, index) => (
                    <div
                        key={index}
                        className="mb-4 p-6 border rounded-lg shadow-lg bg-white transform transition-all hover:scale-105 hover:shadow-2xl"
                    >
                        <h3 className="text-xl font-semibold text-blue-600 mb-2">Item: {transaction.item}</h3>
                        <p className="text-sm text-gray-700"><strong>Goal:</strong> {transaction.goal}</p>
                        <p className="text-sm text-gray-700"><strong>Account Number:</strong> {transaction.accountNumber}</p>
                        <p className="text-sm text-gray-700"><strong>Date:</strong> {transaction.date}</p>
                        <p className="text-sm text-gray-700"><strong>Transaction Type:</strong> {transaction.transactionType}</p>
                        <p className="text-sm text-gray-700"><strong>Amount:</strong> {transaction.amount}</p>
                    </div>
                ))}
            </div>

            <div className="hidden sm:block overflow-x-auto mb-4">
                <table className="min-w-full bg-white table-auto border-collapse">
                    <thead className="bg-indigo-600 text-white">
                        <tr className="text-center">
                            <th className="py-2 px-4 border-b">Goal</th>
                            <th className="py-2 px-4 border-b">Account Number</th>
                            <th className="py-2 px-4 border-b">Date</th>
                            <th className="py-2 px-4 border-b">Transaction Type</th>
                            <th className="py-2 px-4 border-b">Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {transactions.map((transaction, index) => (
                            <tr key={index}   className={`hover:bg-gray-100 border-gray-400 text-center ${
                                transaction.transactionType === 'credit' ? 'bg-green-100' : 'bg-red-100'
                              }`}>
                                
                                <td className="py-2 px-4 border-b border-gray-400">{transaction.goal}</td>
                                <td className="py-2 px-4 border-b border-gray-400">{transaction.accountNumber}</td>
                                <td className="py-2 px-4 border-b border-gray-400">{transaction.date}</td>
                                <td className="py-2 px-4 border-b border-gray-400">{transaction.transactionType}</td>
                                <td className="py-2 px-4 border-b border-gray-400">{transaction.amount}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <button
                onClick={openModal}
                className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300"
            >
                Add Transaction
            </button>

            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-md w-11/12 sm:w-1/3">
                        <h3 className="text-xl font-semibold mb-4">Add New Transaction</h3>
                        <form onSubmit={formik.handleSubmit}>
                            <div className="mb-4">
                                <label htmlFor="accountName" className="block text-sm font-medium text-gray-700">Account Name</label>
                                <input
                                    type="text"
                                    id="accountName"
                                    {...formik.getFieldProps('accountName')}
                                    className={`w-full p-2 mt-2 border ${formik.touched.accountName && formik.errors.accountName ? 'border-red-500' : 'border-gray-300'} rounded-md`}
                                />
                                {formik.touched.accountName && formik.errors.accountName && <p className="text-red-500 text-xs mt-1">{formik.errors.accountName}</p>}
                            </div>

                            <div className="mb-4">
                                <label htmlFor="goal" className="block text-sm font-medium text-gray-700">Goal</label>
                                <input
                                    type="text"
                                    id="goal"
                                    {...formik.getFieldProps('goal')}
                                    className={`w-full p-2 mt-2 border ${formik.touched.goal && formik.errors.goal ? 'border-red-500' : 'border-gray-300'} rounded-md`}
                                />
                                {formik.touched.goal && formik.errors.goal && <p className="text-red-500 text-xs mt-1">{formik.errors.goal}</p>}
                            </div>

                            <div className="mb-4">
                                <label htmlFor="transactionType" className="block text-sm font-medium text-gray-700">Transaction Type</label>
                                <select
                                    id="transactionType"
                                    {...formik.getFieldProps('transactionType')}
                                    className={`w-full p-2 mt-2 border ${formik.touched.transactionType && formik.errors.transactionType ? 'border-red-500' : 'border-gray-300'} rounded-md`}
                                >
                                    <option value="" label="Select transaction type" />
                                    <option value="credit" label="Credit" />
                                    <option value="debit" label="Debit" />
                                </select>
                                {formik.touched.transactionType && formik.errors.transactionType && <p className="text-red-500 text-xs mt-1">{formik.errors.transactionType}</p>}
                            </div>

                            <div className="mb-4">
                                <label htmlFor="accountNumber" className="block text-sm font-medium text-gray-700">Account Number</label>
                                <input
                                    type="text"
                                    id="accountNumber"
                                    {...formik.getFieldProps('accountNumber')}
                                    className={`w-full p-2 mt-2 border ${formik.touched.accountNumber && formik.errors.accountNumber ? 'border-red-500' : 'border-gray-300'} rounded-md`}
                                />
                                {formik.touched.accountNumber && formik.errors.accountNumber && <p className="text-red-500 text-xs mt-1">{formik.errors.accountNumber}</p>}
                            </div>

                            <div className="mb-4">
                                <label htmlFor="date" className="block text-sm font-medium text-gray-700">Date</label>
                                <input
                                    type="date"
                                    id="date"
                                    {...formik.getFieldProps('date')}
                                    className={`w-full p-2 mt-2 border ${formik.touched.date && formik.errors.date ? 'border-red-500' : 'border-gray-300'} rounded-md`}
                                />
                                {formik.touched.date && formik.errors.date && <p className="text-red-500 text-xs mt-1">{formik.errors.date}</p>}
                            </div>

                            <div className="mb-4">
                                <label htmlFor="amount" className="block text-sm font-medium text-gray-700">Amount</label>
                                <input
                                    type="number"
                                    id="amount"
                                    {...formik.getFieldProps('amount')}
                                    className={`w-full p-2 mt-2 border ${formik.touched.amount && formik.errors.amount ? 'border-red-500' : 'border-gray-300'} rounded-md`}
                                />
                                {formik.touched.amount && formik.errors.amount && <p className="text-red-500 text-xs mt-1">{formik.errors.amount}</p>}
                            </div>

                            <div className="flex justify-end space-x-4">
                                <button
                                    type="button"
                                    onClick={closeModal}
                                    className="bg-gray-300 px-4 py-2 rounded-md"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300"
                                >
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Transactions;
