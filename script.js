document.addEventListener("DOMContentLoaded", () => {

    const billAmountInput = document.querySelector("#bill-amount");
    const customTipInput = document.querySelector(".custom-tip");
    const numberOfPeopleInput = document.querySelector(".number-of-people");
    const generateBillBtn = document.querySelector(".generate-bill-btn");
    const tipAmountOutput = document.querySelector(".tip-amount");
    const totalBillOutput = document.querySelector(".total");
    const eachPersonBillOutput = document.querySelector(".each-person-bill");
    const tipsContainer = document.querySelector(".tip-options");
    const resetBtn = document.querySelector(".reset-btn");

    const emailSection = document.querySelector(".email-section");
    const emailList = document.querySelector("#email-list");
    const sendMailBtn = document.querySelector(".send-mail-btn");

    let tipPercentage = 0;

    // 🔹 Generate Bill
    generateBillBtn.addEventListener("click", () => {
        const billAmount = parseFloat(billAmountInput.value);
        const people = parseInt(numberOfPeopleInput.value);

        if (!billAmount || !people) return;

        const tip = (billAmount * tipPercentage) / 100;
        const total = billAmount + tip;
        const each = total / people;

        tipAmountOutput.innerText = `₹${tip.toFixed(2)}`;
        totalBillOutput.innerText = `₹${total.toFixed(2)}`;
        eachPersonBillOutput.innerText = `₹${each.toFixed(2)}`;

        resetBtn.disabled = false;

        // SHOW EMAIL SECTION
        generateEmailInputs(people, each);
    });

    // 🔹 Generate Email Inputs
    function generateEmailInputs(count, amount) {
        emailList.innerHTML = "";
        emailSection.classList.remove("hidden"); // SHOW CARD

        for (let i = 1; i <= count; i++) {
            emailList.innerHTML += `
                <div class="email-row">
                    <label>Person ${i} (Owes ₹${amount.toFixed(2)})</label>
                    <input type="email" class="person-email" placeholder="Enter email">
                </div>
            `;
        }
    }

    // 🔹 Send Emails (BACKEND CONNECTED)
    sendMailBtn.addEventListener("click", async () => {
        const emails = document.querySelectorAll(".person-email");

        const total = totalBillOutput.innerText.replace("₹", "");
        const tip = tipAmountOutput.innerText.replace("₹", "");
        const perPerson = eachPersonBillOutput.innerText.replace("₹", "");
        const people = numberOfPeopleInput.value;

        let sent = 0;

        for (let input of emails) {
            if (input.value.trim()) {
                try {
                    const res = await fetch("http://localhost:5000/send-bill", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            to: input.value,
                            totalBill: total,
                            tip: tip,
                            perPerson: perPerson,
                            people: people
                        })
                    });

                    const data = await res.json();
                    if (data.success) sent++;
                } catch (err) {
                    console.error("Email failed:", err);
                }
            }
        }

        alert(
            sent
                ? `Email sent successfully to ${sent} people ✅`
                : "Please enter at least one email ❌"
        );
    });

    // 🔹 Tip Buttons
    tipsContainer.addEventListener("click", (e) => {
        if (e.target.classList.contains("tip")) {
            document.querySelectorAll(".tip").forEach(t => t.classList.remove("selected"));
            e.target.classList.add("selected");
            tipPercentage = parseInt(e.target.innerText);
            customTipInput.value = "";
        }
    });

    // 🔹 Custom Tip
    customTipInput.addEventListener("input", () => {
        tipPercentage = parseFloat(customTipInput.value) || 0;
    });

    // 🔹 Enable Inputs
    billAmountInput.addEventListener("input", () => {
        const hasValue = billAmountInput.value;
        customTipInput.disabled = !hasValue;
        numberOfPeopleInput.disabled = !hasValue;
        generateBillBtn.disabled = !hasValue || !numberOfPeopleInput.value;
    });

    numberOfPeopleInput.addEventListener("input", () => {
        generateBillBtn.disabled = !billAmountInput.value || !numberOfPeopleInput.value;
    });

    // 🔹 Reset
    resetBtn.addEventListener("click", () => location.reload());
});
