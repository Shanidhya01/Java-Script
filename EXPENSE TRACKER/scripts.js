document.addEventListener('DOMContentLoaded', () => {
    const expenseForm = document.getElementById("expense-form");
    const expenseNameInput = document.getElementById("description"); // Fixed ID
    const expenseAmountInput = document.getElementById("amount");
    const expenseList = document.getElementById("expense-list");
    const totalAmountDisplay = document.getElementById("total-amount");

    let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
    renderExpenses();
    updateTotal();

    expenseForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const name = expenseNameInput.value.trim();
        const amount = parseFloat(expenseAmountInput.value.trim());

        if (name !== "" && !isNaN(amount) && amount > 0) {
            const newExpense = {
                id: Date.now(),
                name: name,
                amount: amount,
            };
            expenses.push(newExpense);
            saveExpensesToLocal();
            renderExpenses();
            updateTotal();

            // Clear input fields
            expenseNameInput.value = "";
            expenseAmountInput.value = "";
        }
    });

    function renderExpenses() {
        expenseList.innerHTML = "";

        expenses.forEach(expense => {
            const li = document.createElement("li");
            li.innerHTML = `
                ${expense.name} - $${expense.amount.toFixed(2)}
                <button class="delete-button" data-id="${expense.id}">Delete</button>
            `;

            // Delete button event listener
            li.querySelector(".delete-button").addEventListener("click", () => {
                expenses = expenses.filter(t => t.id !== expense.id);
                saveExpensesToLocal();
                renderExpenses();
                updateTotal();
            });

            expenseList.appendChild(li);
        });
    }

    function calculateTotal() {
        return expenses.reduce((sum, expense) => sum + expense.amount, 0);
    }

    function saveExpensesToLocal() {
        localStorage.setItem("expenses", JSON.stringify(expenses));
    }

    function updateTotal() {
        totalAmountDisplay.textContent = `$${calculateTotal().toFixed(2)}`;
    }
});