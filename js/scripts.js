const form = document.querySelector("form")
// const amount = 12
const expense = document.querySelector("#expense")
const category = document.querySelector("#category")
const amount = document.querySelector("#amount")
amount.oninput = () => {
  let value = amount.value.replace(/\D/g, "")
  value = Number(value) / 100
  amount.value = formatCurrencyBRL(value)
}

function formatCurrencyBRL(value){
  value = value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  })

  return value
}

form.onsubmit = (e) => {
  e.preventDefault()
  
  const newExpense = {
    id: new Date().getTime(),
    expense: expense.value,
    category_id: category.value,
    category_name: category.options[category.selectedIndex].text,
    amount: amount.value,
    created_at: new Date(),
  }

  expenseAdd(newExpense)

  function expenseAdd(newExpense){
    try{
      throw new Error("Erro de teste")
    }catch(error){
      alert("Não foi possível atualizar a lista de despesas")
      console.log(error)
    }
  }
}