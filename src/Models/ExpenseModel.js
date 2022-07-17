class ExpenseModel {
    id;
    title;
    date;
    price;
    description;

    constructor (title, date, price, description) {
        this.title = title;
        this.date = date;
        this.price = price;
        this.description = description;
    }
}

export default ExpenseModel;