import { useRef } from "react";
import ExpenseModel from "../Models/ExpenseModel";
import FormInput from "./FormInput";

function FormLayout(props) {

    let titleRef = useRef();
    let dateRef = useRef();
    let priceRef = useRef();
    let descriptionRef = useRef();

    let onSubmitHandler = (event) => {
        event.preventDefault();
        let newExpense = new ExpenseModel (
            titleRef.current.value,
            dateRef.current.value, 
            priceRef.current.value, 
            descriptionRef.current.value,
        );
        props.newExpense(newExpense);
        clearHandler();
    }
    let clearHandler = () => {
        titleRef.current.value = '';
        dateRef.current.value = '';
        priceRef.current.value = '';
        descriptionRef.current.value = '';
    }
    return (
        <form className="row" onSubmit={onSubmitHandler}>
            <FormInput title="Title" type="text" addClass="addTitle" ref={titleRef} />
            <FormInput title="Date" type="date" addClass="addDate" ref={dateRef} />
            <FormInput title="Value" type="number" addClass="addValue" ref={priceRef} />
            <FormInput title="Description" type="text" addClass="addDescrption" ref={descriptionRef} />
            <div className="mb-3 col-md-12 text-right">
                <button type="submit" className="btn btn-primary addBtn">Add</button>
            </div>
        </form>
    );
}

export default FormLayout