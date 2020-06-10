function populateUFs()  {
    const ufSelect = document.querySelector("select[name=uf]")

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then( res => res.json() )
    .then( states => {

        for( state of states )  {
            ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
    } 
         
    } )

}

populateUFs()

function getCities(event) {
    const citySelect = document.querySelector("[name=city")
    const stateInput = document.querySelector("[name=state]")

    const ufValue = event.target.value

    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    citySelect.innerHTML = "<option value>Selecione a Cidade</option>"
    citySelect.disabled = true

    fetch(url)
    .then( res => res.json() )
    .then( cities => {
        

        for( city of cities )  {
            citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
        } 

        citySelect.disabled = false
         
    } )

}
    

document
    .querySelector("select[name=uf]")
    .addEventListener("change", getCities)

//ÍTENS DE COLETA
//PEGAR TODOS OS li´s (lembrar quanto tem que repetir muuito, vc tem o for ou o while pra usar)
const itemsToCollect = document.querySelectorAll(".items-grid li")

for(const item of itemsToCollect) {
    item.addEventListener("click", handleSelectedItem)
}

const collectedItems = document.querySelector("input[name=items]")

let selectedItems = []

function handleSelectedItem(event)  {
    const itemLi = event.target

    //adicionar ou remover uma classe com Js

    itemLi.classList.toggle("selected") //o toggle que adiciona ou remove. ele vai lá na classe e ve se tem o selected ou não.

    const itemId = event.target.dataset.id

    console.log('ITEM ID: ', itemId)

    //verificar se existem itens selecionados. Se sim, pegar os itens selecionados.

    const alreadySelected = selectedItems.findIndex(item => {
        const itemFound = item == itemId //isso será true ou false
        return itemFound
     
    })

    // Se estiver selecionado, 
    
    if(alreadySelected >= 0 ) {
            //tirar da seleção.
            const filteredItems = selectedItems.filter( item => {
                const itemIsDifferent = item != itemId //false
                return itemIsDifferent
            })

            selectedItems = filteredItems
        } else {
            //se não estiver selecionado
                // adicionar a seleção
                selectedItems.push(itemId)
        }

        //console.log('selectedItems: ', selectedItems)

        // atualizar o campo escondido com os itens selecionados.
        collectedItems.value = selectedItems

}
