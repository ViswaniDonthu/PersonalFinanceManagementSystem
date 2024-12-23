
// import { useState, useEffect } from 'react';
// import * as Yup from 'yup';
// import GoalsModal from './GoalsModal'; // Import the modal component
// import { useNavigate } from 'react-router';
// import { toast} from 'react-toastify'; // Import the toast and ToastContainer components
// import 'react-toastify/dist/ReactToastify.css'; // Import the default styles



// function Goals() {
//     const [goalsData, setGoalsData] = useState([]); // State to store the goals data
//     const [isModalOpen, setIsModalOpen] = useState(false); // For modal visibility
//     const register_id = sessionStorage.getItem("register_id");
//     const navigate = useNavigate();

//     if (!register_id) {
//         navigate('/login');
//     }
   
//     useEffect(() => {
//         const fetchGoals = async () => {
//             try {
//                 const response = await fetch(`http://localhost:9000/goals/${register_id}`);
//                 const data = await response.json();
//                 setGoalsData(data); // Set the goals data
//             } catch (error) {
//                 console.error("Error fetching goals:", error);
//             }
//         };
//         fetchGoals();
//     }, []); // Run only on component mount

//     // Validation Schema using Yup
//     const validationSchema = Yup.object({
//         goalName: Yup.string().required("Goal Name is required"),
//         target: Yup.number()
//             .required("Target is required")
//             .positive("Target must be a positive number")
//             .typeError("Target must be a number"),
//     });

//     // Handle form submit to add a new goal
//     const handleSubmit = async (values, { resetForm }) => {
//         const newGoal = {
//             goalName: values.goalName,
//             target: values.target,
//             register: {
//                 id: register_id,
//             }
//         };

//         try {
//             if (!register_id) {
//                 toast.error("Please log in"); // Toast error message
//                 return;
//             }

//             const response = await fetch("http://localhost:9000/goals", {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//                 body: JSON.stringify(newGoal),
//             });

//             if (response.ok) {
//                 const addedGoal = await response.json();
//                 setGoalsData((prev) => [...prev, addedGoal]); // Add new goal to state
//                 setIsModalOpen(false); // Close the modal
//                 resetForm(); // Reset the form
//                 toast.success("Goal added successfully!"); // Toast success message
//             } else {
//                 toast.error("Failed to add goal"); // Toast error message
//             }
//         } catch (error) {
//             console.error("Error adding goal:", error);
//             toast.error("An error occurred while adding the goal."); // Toast error message
//         }
//     };
        
//     // Handle goal removal
//     const handleRemoveGoal = async (goalId) => {
//         const userId = sessionStorage.getItem("register_id");
//         try {
//             const response = await fetch(`http://localhost:9000/goals/deletegoal/${goalId}/${userId}`, {
//                 method: "DELETE",
//             });

//             if (response.ok) {
//                 setGoalsData(goalsData.filter(goal => goal.id !== goalId)); // Remove goal from the state
//                 toast.success("Goal removed successfully!"); // Toast success message
//             } else {
//                 toast.error("Failed to remove goal"); // Toast error message
//             }
//         } catch (error) {
//             console.error("Error removing goal:", error);
//             toast.error("An error occurred while removing the goal."); // Toast error message
//         }
//     };

//     return (
//         <div className="p-4">
//             <br /> <br />
//             <h1 className="text-2xl font-semibold mb-4">Goals</h1>

//             {/* Table View */}
//             <div className="overflow-x-auto">
//                 <table className="min-w-full bg-white shadow-lg rounded-lg">
//                     <thead>
//                         <tr className="bg-blue-600 text-white">
//                             <th className="py-3 px-5 text-left border-b">Goal Name</th>
//                             <th className="py-3 px-5 text-left border-b">Target</th>
//                             <th className="py-3 px-5 text-left border-b">Progress</th>
//                             <th className="py-3 px-5 text-left border-b"></th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {goalsData.map((goal) => (
//                             <tr key={goal.id}>
//                                 <td className="py-3 px-5 border-b">{goal.goalName}</td>
//                                 <td className="py-3 px-5 border-b">{goal.target}</td>
//                                 <td className="py-3 px-5 border-b">
                                
//                                     <div className="relative w-full bg-gray-200 rounded h-4 group">
//     <div
//         className={`absolute top-0 left-0 h-4 rounded ${
//             (goal.progresstarget / goal.target) > 1 ? "bg-red-600" : "bg-blue-600"
//         }`}
//         style={{ width: `${Math.min((goal.progresstarget / goal.target) * 100, 100)}%` }}
//         title={`Amount: ${goal.progresstarget}`}
//     ></div>
//     {/* Tooltip */}
//     <div className="absolute top-[-24px] left-1/2 transform -translate-x-1/2 bg-gray-700 text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity">
//         {`Amount: ${goal.progresstarget}`}
//     </div>
// </div>

// {/* Text Display */}
// <span className="text-sm text-gray-600">
//     {goal.progresstarget || 0} / {goal.target}
// </span>
// {goal.progresstarget / goal.target > 1 ? (
//     <span className="text-sm text-red-600">Over Spent</span>
// ) : goal.progresstarget / goal.target > 0.5 ? (
//     <span className="text-sm text-yellow-600">Spend Wisely</span>
// ) : null}

//                                 </td>
//                                 <td className="py-3 px-5 border-b text-center">
//                                     <button
//                                         onClick={() => handleRemoveGoal(goal.id)}
//                                         className="text-blue-500 hover:text-red-700"
//                                     >
//                                         &#10005; {/* Cross mark for removal */}
//                                     </button>
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//                 <br />
//                 <button
//                     onClick={() => setIsModalOpen(true)}
//                     className="bg-blue-600 text-white p-3 rounded-md shadow-md hover:bg-blue-700 transition"
//                 >
//                     Set New Goal
//                 </button>
//             </div>

//             {isModalOpen && (
//                 <GoalsModal
//                     handleSubmit={handleSubmit} 
//                     setShowGoalsModal={setIsModalOpen}
//                     validationSchema={validationSchema}
//                 />
//             )}
//         </div>
//     );
// }

// export default Goals;
import { useState, useEffect } from 'react';
import * as Yup from 'yup';
import GoalsModal from './GoalsModal';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Goals() {
    const [goalsData, setGoalsData] = useState([]); 
    const [currentPage, setCurrentPage] = useState(1); // State to track the current page
    const [goalsPerPage] = useState(5); // Number of goals to display per page
    const [isModalOpen, setIsModalOpen] = useState(false);
    const register_id = sessionStorage.getItem("register_id");
    const navigate = useNavigate();

    if (!register_id) {
        navigate('/login');
    }

    useEffect(() => {
        const fetchGoals = async () => {
            try {
                const response = await fetch(`http://localhost:9000/goals/${register_id}`);
                const data = await response.json();
                const reverseddata=data.reverse();
                setGoalsData(reverseddata); // Set the goals data
            } catch (error) {
                console.error("Error fetching goals:", error);
            }
        };
        fetchGoals();
    }, []); // Run only on component mount

    // Validation Schema using Yup
    const validationSchema = Yup.object({
        goalName: Yup.string().required("Goal Name is required"),
        target: Yup.number()
            .required("Target is required")
            .positive("Target must be a positive number")
            .typeError("Target must be a number"),
    });

    // Handle form submit to add a new goal
    const handleSubmit = async (values, { resetForm }) => {
        const newGoal = {
            goalName: values.goalName,
            target: values.target,
            register: {
                id: register_id,
            }
        };

        try {
            if (!register_id) {
                toast.error("Please log in");
                return;
            }

            const response = await fetch("http://localhost:9000/goals", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newGoal),
            });

            if (response.ok) {
                const addedGoal = await response.json();
                setGoalsData((prev) => [...prev, addedGoal]); // Add new goal to state
                setIsModalOpen(false); // Close the modal
                resetForm(); // Reset the form
                toast.success("Goal added successfully!");
            } else {
                toast.error("Failed to add goal");
            }
        } catch (error) {
            console.error("Error adding goal:", error);
            toast.error("An error occurred while adding the goal.");
        }
    };

    // Handle goal removal
    const handleRemoveGoal = async (goalId) => {
        const userId = sessionStorage.getItem("register_id");
        try {
            const response = await fetch(`http://localhost:9000/goals/deletegoal/${goalId}/${userId}`, {
                method: "DELETE",
            });

            if (response.ok) {
                setGoalsData(goalsData.filter(goal => goal.id !== goalId)); // Remove goal from the state
                toast.success("Goal removed successfully!");
            } else {
                toast.error("Failed to remove goal");
            }
        } catch (error) {
            console.error("Error removing goal:", error);
            toast.error("An error occurred while removing the goal.");
        }
    };

    // Calculate current goals to display based on page
    const indexOfLastGoal = currentPage * goalsPerPage;
    const indexOfFirstGoal = indexOfLastGoal - goalsPerPage;
    const currentGoals = goalsData.slice(indexOfFirstGoal, indexOfLastGoal);

    // Handle page change
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    // Calculate total pages
    const totalPages = Math.ceil(goalsData.length / goalsPerPage);

    return (
        <div className="p-6">
            <br /> <br />
            <h1 className="text-2xl font-semibold mb-4">Goals</h1>

            {/* Table View */}
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white shadow-lg rounded-lg ">
                    <thead>
                        <tr className="bg-indigo-600 text-white">
                            <th className="py-2 px-4 text-left border-b">Goal Name</th>
                            <th className="py-2 px-4 text-left border-b">Target</th>
                            <th className="py-2 px-4 text-left border-b">Progress</th>
                            <th className="py-2 px-4 text-left border-b"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentGoals.map((goal) => (
                            <tr key={goal.id}>
                                <td className="py-2 px-3 border-b">{goal.goalName}</td>
                                <td className="py-2 px-3 border-b">{goal.target}</td>
                                <td className="py-2 px-3 border-b">
                                    <div className="relative w-full bg-gray-200 rounded h-4 group">
                                        <div
                                            className={`absolute top-0 left-0 h-4 rounded ${goal.progresstarget / goal.target > 1 ? "bg-red-600" : "bg-blue-600"}`}
                                            style={{ width: `${Math.min((goal.progresstarget / goal.target) * 100, 100)}%` }}
                                            title={`Amount: ${goal.progresstarget}`}
                                        ></div>
                                        <div className="absolute top-[-24px] left-1/2 transform -translate-x-1/2 bg-gray-700 text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            {`Amount: ${goal.progresstarget}`}
                                        </div>
                                    </div>
                                    <span className="text-sm text-gray-600">
                                        {goal.progresstarget || 0} / {goal.target}
                                    </span>
                                    {goal.progresstarget / goal.target > 1 ? (
                                        <span className="text-sm text-red-600">Over Spent</span>
                                    ) : goal.progresstarget / goal.target > 0.5 ? (
                                        <span className="text-sm text-yellow-600">Spend Wisely</span>
                                    ) : null}
                                </td>
                                <td className="py-2 px-4 border-b text-center">
                                    <button
                                        onClick={() => handleRemoveGoal(goal.id)}
                                        className="text-blue-500 hover:text-red-700"
                                    >
                                        &#10005; {/* Cross mark for removal */}
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <br />
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="bg-blue-600 text-white p-3 rounded-md shadow-md hover:bg-blue-700 transition"
                >
                    Set New Goal
                </button>
            </div>

            {/* Pagination Controls */}
            <div className="mt-4 flex justify-center">
                <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="bg-blue-600 text-white p-2 rounded-md mx-2 disabled:opacity-50"
                >
                    Prev
                </button>
                <span className="p-2">{currentPage}</span>
                <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="bg-blue-600 text-white p-2 rounded-md mx-2 disabled:opacity-50"
                >
                    Next
                </button>
            </div>

            {isModalOpen && (
                <GoalsModal
                    handleSubmit={handleSubmit}
                    setShowGoalsModal={setIsModalOpen}
                    validationSchema={validationSchema}
                />
            )}
        </div>
    );
}

export default Goals;

