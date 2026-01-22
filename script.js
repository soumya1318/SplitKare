document.addEventListener('DOMContentLoaded', () => {

    const billAmountInput = document.querySelector('#bill-amount');
    const customTipInput = document.querySelector('.custom-tip');
    const numberOfPeopleInput = document.querySelector('.number-of-people');
    const generateBillBtn = document.querySelector('.generate-bill-btn');
    const tipAmountOutput = document.querySelector('.tip-amount');
    const totalBillOutput = document.querySelector('.total');
    const eachPersonBillOutput = document.querySelector('.each-person-bill');
    const tipsContainer = document.querySelector('.tip-options');
    const resetBtn = document.querySelector('.reset-btn');

    const emailSection = document.querySelector('.email-section');
    const emailList = document.querySelector('#email-list');
    const sendMailBtn = document.querySelector('.send-mail-btn');

    let tipPercentage = 0;

    generateBillBtn.addEventListener('click', () => {
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
        generateEmailInputs(people, each);
    });

    function generateEmailInputs(count, amount) {
        emailList.innerHTML = '';
        emailSection.classList.remove('hidden');

        for (let i = 1; i <= count; i++) {
            emailList.innerHTML += `
                <div class="email-row">
                    <label>Person ${i} (Owes ₹${amount.toFixed(2)})</label>
                    <input type="email" class="person-email" placeholder="Enter email">
                </div>
            `;
        }
    }

    sendMailBtn.addEventListener('click', () => {
        const emails = document.querySelectorAll('.person-email');
        let sent = 0;

        emails.forEach(input => {
            if (input.value.trim()) {
                console.log(`Email sent to ${input.value}`);
                sent++;
            }
        });

        alert(sent ? `Sent to ${sent} people` : 'Enter at least one email');
    });

    tipsContainer.addEventListener('click', e => {
        if (e.target.classList.contains('tip')) {
            document.querySelectorAll('.tip').forEach(t => t.classList.remove('selected'));
            e.target.classList.add('selected');
            tipPercentage = parseInt(e.target.innerText);
            customTipInput.value = '';
        }
    });

    customTipInput.addEventListener('input', () => {
        tipPercentage = parseFloat(customTipInput.value) || 0;
    });

    billAmountInput.addEventListener('input', () => {
        const hasValue = billAmountInput.value;
        customTipInput.disabled = !hasValue;
        numberOfPeopleInput.disabled = !hasValue;
        generateBillBtn.disabled = !hasValue || !numberOfPeopleInput.value;
    });

    numberOfPeopleInput.addEventListener('input', () => {
        generateBillBtn.disabled = !billAmountInput.value || !numberOfPeopleInput.value;
    });

    resetBtn.addEventListener('click', () => location.reload());
});
