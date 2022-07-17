function TableRow(props) {
    let onDeleteHandler = () => {
        props.deleteHandler(props.id);
    }
    return (
        <tr>
            <td> {props.title} </td>
            <td> {props.date}</td>
            <td>{props.price}</td>
            <td colSpan="2">{props.description}</td>
            <td className="text-right"><a href="#" className="delete"><i className="fa fa-trash-o"
                aria-hidden="true" onClick={onDeleteHandler}/></a></td>
        </tr>
    );
}

export default TableRow