    // INITIAL DATA (LocalStorage)
let data = JSON.parse(localStorage.getItem("bankebunData")) || {
    income: 0,
    expenses: 0,
    activity: [],
    chart: []
};

// ELEMENTS
const incomeCard = document.querySelector(".stats .card.green h2");
const expenseCard = document.querySelector(".stats .card.red h2");
const balanceCard = document.querySelector(".stats .card.green-light h2");
const activityTable = document.querySelector(".recent tbody");

const modal = document.getElementById("modalInput");
const addBtn = document.getElementById("addDataBtn");
const saveBtn = document.getElementById("saveBtn");
const closeBtn = document.getElementById("closeModal");

const typeInput = document.getElementById("typeInput");
const amountInput = document.getElementById("amountInput");
const descInput = document.getElementById("descInput");

// SHOW MODAL
addBtn.addEventListener("click", () => modal.style.display = "flex");
closeBtn.addEventListener("click", () => modal.style.display = "none");

// SAVE DATA
saveBtn.addEventListener("click", () => {
    const type = typeInput.value;
    const amount = parseInt(amountInput.value);
    const desc = descInput.value;

    if (!amount || !desc) return alert("Isi data dengan benar!");

    if (type === "income") data.income += amount;
    else data.expenses += amount;

    data.activity.unshift({ desc, amount, type });
    data.chart.push(data.income - data.expenses);

    localStorage.setItem("bankebunData", JSON.stringify(data));
    modal.style.display = "none";
    updateUI();
});

// UPDATE UI
function updateUI() {
    incomeCard.innerText = "Rp " + data.income.toLocaleString();
    expenseCard.innerText = "Rp " + data.expenses.toLocaleString();
    balanceCard.innerText = "Rp " + (data.income - data.expenses).toLocaleString();

    // Update activity table
    activityTable.innerHTML = "";
    data.activity.forEach(a => {
        activityTable.innerHTML += `
            <tr>
                <td><i class="fa ${a.type === "income" ? "fa-coins" : "fa-minus"}"></i> ${a.desc}</td>
                <td>Rp ${a.amount.toLocaleString()}</td>
            </tr>
        `;
    });

    updateChart();
}

// UPDATE CHART
function updateChart() {
    const points = document.querySelectorAll(".points span");
    const values = data.chart.slice(-points.length);
    values.forEach((v, i) => {
        const max = Math.max(...values);
        const height = max === 0 ? 5 : (v / max * 100);
        points[i].style.height = height + "%";
    });
}

updateUI();
