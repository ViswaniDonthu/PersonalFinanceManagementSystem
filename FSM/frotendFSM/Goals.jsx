
import React, { useState, useEffect } from 'react';
//import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import GoalsModal from './GoalsModal'; // Import the modal component
import { useNavigate } from 'react-router';
function Goals() {
    const [goalsData, setGoalsData] = useState([]); // State to store the goals data
    const [isModalOpen, setIsModalOpen] = useState(false); // For modal visibility
    const register_id = sessionStorage.getItem("register_id");
    const navigate=useNavigate()
  if(!register_id){
    navigate('/login')
  }
    // Fetch existing goals from the backend
    useEffect(() => {
    
        const fetchGoals = async () => {
            try {
                const response = await fetch(`http://localhost:9000/goals/${register_id}`);
                const data = await response.json();
                setGoalsData(data); // Set the goals data
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
                alert("Please log in");
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
                alert("Goal added successfully!");
                alert(goalsData);
            } else {
                alert("Failed to add goal");
            }
        } catch (error) {
            console.error("Error adding goal:", error);
            alert("An error occurred while adding the goal.");
        }
    };

    // Handle goal removal
    const handleRemoveGoal = async (goalId) => {
        const userId=sessionStorage.getItem("register_id")
        try {
            const response = await fetch(`http://localhost:9000/goals/deletegoal/${goalId}/${userId}`, {
                method: "DELETE",
            });

            if (response.ok) {
                setGoalsData(goalsData.filter(goal => goal.id !== goalId)); // Remove goal from the state
              //  alert("Goal removed successfully!");
            } else {
                alert("Failed to remove goal");
            }
        } catch (error) {
            console.error("Error removing goal:", error);
            alert("An error occurred while removing the goal.");
        }
    };

    return (
        <div className="p-4">
            <br /> <br />
            <h1 className="text-2xl font-semibold mb-4">Goals</h1>

            {/* Table View */}
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white shadow-lg rounded-lg">
                    <thead>
                        <tr className="bg-blue-600 text-white">
                            <th className="py-3 px-5 text-left border-b">Goal Name</th>
                            <th className="py-3 px-5 text-left border-b">Target</th>
                            <th className="py-3 px-5 text-left border-b"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {goalsData.map((goal, index) => (
                            <tr key={goal.id}>
                                <td className="py-3 px-5 border-b">{goal.goalName}</td>
                                <td className="py-3 px-5 border-b">{goal.target}</td>
                                <td className="py-3 px-5 border-b text-center">
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

            {/* Modal for Adding New Goal */} 
            {isModalOpen && (
                <GoalsModal
                    handleSubmit={handleSubmit} // Pass the handleSubmit function
                    setShowGoalsModal={setIsModalOpen}
                    validationSchema={validationSchema}
                />
            )}
        </div>
    );
}

export default Goals;
