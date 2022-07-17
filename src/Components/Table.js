import TableRow from "./TableRow";

function Table(props) {
    let onDeleteHandler = (id) => {
        props.deleteExpenseHandler(id);
    }
    return (
        <table className="table ">
            <thead>
                <tr>
                    <th> Title</th>
                    <th> Date</th>
                    <th>value</th>
                    <th>Description</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {props.expenses.map((element) => {
                    return <TableRow 
                        key={element.id}
                        id = {element.id}
                        title={element.title} 
                        date={element.date} 
                        price={element.price} 
                        description={element.description}
                        deleteHandler={onDeleteHandler}
                    />
                })}
            </tbody>
        </table>
    );
}

export default Table