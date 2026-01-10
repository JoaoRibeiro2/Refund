const form = document.querySelector("form")
// const amount = 12
const expense = document.querySelector("#expense")
const category = document.querySelector("#category")
const amount = document.querySelector("#amount")
const expenseList = document.querySelector("ul")
const expenses = document.querySelector(".expenses")
const totalExpense = document.querySelector(".total-expense")

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
}

  function expenseAdd(newExpense){
    try{
      // Cria o Item da lista
      const expenseItem = document.createElement("li")
      expenseItem.classList.add("expense")
      // Cria o ícone 
      const expenseIcon = document.createElement("img")
      expenseIcon.setAttribute("src", `img/${newExpense.category_id}.svg`)
      expenseIcon.setAttribute("alt", newExpense.category_name)

      expenseItem.append(expenseIcon)
      expenseList.append(expenseItem)

      
      // Cria a div de informações

      const info = document.createElement("div")
      const info_expense = document.createElement("strong")
      const info_category = document.createElement("span")

      info_expense.innerText = newExpense.expense
      info_category.innerText = newExpense.category_name

      info.append(info_expense)
      info.append(info_category)

      info.classList.add("expense-info")
      expenseItem.append(info)

      // Cria o span de preço

      const small = document.createElement("small")
      const full_price = document.createElement("span")
      small.innerText = "R$"
      const price = newExpense.amount.slice(3)

      full_price.classList.add("expense-amount")
      full_price.append(small)
      full_price.append(price)
      expenseItem.append(full_price)

      // Criando img de remover

      const remove = document.createElement("img")
      remove.setAttribute("src", `img/remove.svg`)
      remove.setAttribute("alt", "Botão de deletar")
      remove.classList.add("remove-icon")
      
      remove.onclick = (event) => {
        event.target.parentElement.remove()
      }
      expenseItem.append(remove)
      updateTotals()
    }catch(error){
      alert("Não foi possível atualizar a lista de despesas")
      console.log(error)
    }

    
  }

updateTotals = () => {
  let total = 0
  try{
    const items = expenseList.children
    // console.log(items[0])

    expenses.textContent = `${items.length} ${items.length > 1 ? "despesas": "despesa"}`

    for(let item = 0; item < items.length; item++){
      const expenseAmount = items[item].querySelector(".expense-amount")
      let value = expenseAmount.textContent.replace(/[^\d]/g, "")

      value = parseFloat(value)/100
      total+= value
    }
    let small = document.createElement("small")

    totalExpense.innerHTML = `<small>R$ </small> ${total}`
    function subItens(){
      total = total - value
    }
    
    remove.onclick= (e) => {
      e.target.subItens()
    }
  }catch{
    alert("Não foi possível atualizar os totais")
    console.log(error)
  }
}