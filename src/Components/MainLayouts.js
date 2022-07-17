import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import '../css/custom.css';
import ExpencesImage from '../img/m1.png';
import ExpenseModel from '../Models/ExpenseModel';
import FormLayout from './FormLayout';
import Header from './Header';
import Table from './Table';

function MainLayouts() {
    let [expenses, setExpenses] = useState([]);

    let newExpenseHandler = (newExpense) => {
        // newExpense.id = expenses.length + 1;
        // console.log(newExpense);
        // setExpenses((prveExpense) => {
        //     return [newExpense, ...prveExpense];
        // });
        saveExpenseOnFirebase(newExpense);
    }

    let onDeleteExpenseHandler = (id) => {
        submitionConfirmation(id);
    }

    let submitionConfirmation = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                deleteExpenseFromFirebase(id);
                let timerInterval
                Swal.fire({
                    title: 'Deleted Expense',
                    text: "Expense Deleted Successful",
                    icon: "success",
                    showConfirmButton: false,
                    timer: 2000,
                    timerProgressBar: true,
                }).then((result) => {
                    if (result.dismiss === Swal.DismissReason.timer) {
                        console.log('I was closed by the timer')
                    }
                })
            }
        })
    }

    let saveExpenseOnFirebase = (newExpense) => {
        fetch(
            "https://react-expenses-d8160-default-rtdb.firebaseio.com/expense.json",
            {
                method: "POST",
                body: JSON.stringify(newExpense),
                headers: {
                    "Content-Type" : "application/json"
                }
            }
        ).then ((response) => {
            return response.json();
        }).then ((result) => {
            newExpense.id = result.name;
            setExpenses ((prevExpense) => {
                return [newExpense, ...prevExpense];
            });
        }).catch ((error) => {});
    }

    let fetchExpensesFromFirebase =  () => {
        fetch(
            "https://react-expenses-d8160-default-rtdb.firebaseio.com/expense.json",
            {
                method: "GET"
            }
        ).then((respons) => {
            return respons.json();
        })
        .then((result) => {
            let firebaseExpenses = [];
            for (let key in result) {
                let expense = new ExpenseModel (
                    result[key].title,
                    result[key].date,
                    result[key].price,
                    result[key].description,
                );
                expense.id = key;
                firebaseExpenses.push(expense);
            }
            setExpenses(firebaseExpenses);
        })
        .catch((error) => {});
    }

    let deleteExpenseFromFirebase = (id) => {
        fetch(
            `https://react-expenses-d8160-default-rtdb.firebaseio.com/expense/${id}.json`,
            {
                method: "DELETE",
            }
        ).then((respons) => {
            return respons.json();
        })
        .then((result) => {
            let filterExpenses = expenses.filter((element) => element.id !== id);
            setExpenses(filterExpenses);
        })
        .catch((error) => {});
    }

    useEffect(fetchExpensesFromFirebase, []);

    return (<div className="container mt-5">
        <div className="row">
            <div className="col-sm-6">
                <img src={ExpencesImage} className="img-fluid" alt="" />
            </div>
            <div className="col-sm-6 mt-5">
                <Header />
                <FormLayout newExpense={newExpenseHandler} />
            </div>
        </div>

        <div className="row mt-5 mb-5">
            <div className="custom-card ">
                <Table expenses={expenses} deleteExpenseHandler={onDeleteExpenseHandler} />
            </div>
        </div>
    </div>);
}

export default MainLayouts;