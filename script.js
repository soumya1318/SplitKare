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

  let tipPercentage = 0;

  generateBillBtn.addEventListener('click', () => {
    const billAmount = parseFloat(billAmountInput.value);
    const numberOfPeople = parseInt(numberOfPeopleInput.value);

    if (!billAmount || !numberOfPeople || numberOfPeople <= 0) return;

    const tipAmount = (billAmount * tipPercentage) / 100;
    const totalBill = billAmount + tipAmount;
    const eachPersonBill = totalBill / numberOfPeople;

    tipAmountOutput.innerText = `₹${tipAmount.toFixed(2)}`;
    totalBillOutput.innerText = `₹${totalBill.toFixed(2)}`;
    eachPersonBillOutput.innerText = `₹${eachPersonBill.toFixed(2)}`;
    resetBtn.disabled = false;
  });

  tipsContainer.addEventListener('click', (e) => {
    if (tipsContainer.classList.contains('disabled')) return;

    if (e.target.classList.contains('tip')) {
      document.querySelectorAll('.tip').forEach(btn => btn.classList.remove('selected'));
      e.target.classList.add('selected');
      tipPercentage = parseInt(e.target.innerText);
      customTipInput.value = '';
    }
  });

  customTipInput.addEventListener('input', () => {
    tipPercentage = parseFloat(customTipInput.value) || 0;
    document.querySelectorAll('.tip').forEach(btn => btn.classList.remove('selected'));
  });

  resetBtn.addEventListener('click', () => {
    tipPercentage = 0;
    billAmountInput.value = '';
    customTipInput.value = '';
    numberOfPeopleInput.value = '';
    tipAmountOutput.innerText = '₹0.00';
    totalBillOutput.innerText = '₹0.00';
    eachPersonBillOutput.innerText = '₹0.00';
    document.querySelectorAll('.tip').forEach(btn => btn.classList.remove('selected'));
    tipsContainer.classList.add('disabled');
    customTipInput.disabled = true;
    numberOfPeopleInput.disabled = true;
    generateBillBtn.disabled = true;
    resetBtn.disabled = true;
  });

  billAmountInput.addEventListener('input', () => {
    const hasValue = !!billAmountInput.value;
    tipsContainer.classList.toggle('disabled', !hasValue);
    customTipInput.disabled = !hasValue;
    numberOfPeopleInput.disabled = !hasValue;
    generateBillBtn.disabled = !numberOfPeopleInput.value;
  });

  numberOfPeopleInput.addEventListener('input', () => {
    generateBillBtn.disabled = !numberOfPeopleInput.value;
  });
});
