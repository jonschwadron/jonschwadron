import { Expenses } from '../api/expenses.js';

import './expense.html';

Template.expense.events({
	'click .delete'() {
		Expenses.remove(this._id);
	},
});
