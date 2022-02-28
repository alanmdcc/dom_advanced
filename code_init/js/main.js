//Udate the value in the Sub-total column
function updateSubtotal(element){

    //Get the price unit as a float
    let pu = element.getElementsByClassName("pu")[0].textContent;
    pu = pu.replace(/\s+/g, "");
    pu = pu.replace("$","");
    pu = parseFloat(pu);

    //Get the quantity from the input
    let qty = element.getElementsByClassName("qty")[0].getElementsByTagName("input")[0].value;

    let subtot = pu*qty; //Get the subtotal

    //Change subtotal cell value
    let subtotal = element.getElementsByClassName("subtot")[0];
    subtotal.textContent = `$${subtot.toFixed(2)}`;

    return subtot;

};//updateSubtotal

//Click action on the "Calculate prices" button
function calcAll(){
    let btn = document.getElementById("calc"); //Get button "Calculate prices"
    

    btn.addEventListener("click",function(){
        let elements=document.getElementsByClassName("product"); //Get an HTML with all products
        let totalElement = document.getElementById("total-value").getElementsByTagName("span")[0]; //Get total HTML element
        let total=0;

        //Loop through all products
        for (let product of elements){
            let subtotal = updateSubtotal(product);
            total += subtotal
        };//for

        //Imprime en el DOM el precio total
        totalElement.textContent = total;
        

    });
    
};//calcAll

//Add a listener to Delete buttons to remove the row where it is clicked
function removeButton(){
    let rmBtns = document.getElementsByClassName("btn-delete");//Get all the Delete buttons
    console.log(rmBtns);

    for (let btn of rmBtns){
        btn.addEventListener("click", function(e){
            //Removes the row where the remove button is clicked
            e.currentTarget.parentNode.parentNode.parentNode.removeChild(e.currentTarget.parentNode.parentNode);
            console.log(rmBtns);
        })//addEventListener
    }; //for Add a listener to all remove buttons

};//removeButton

function createProduct(){
    let createBtn = document.getElementById("create");

    createBtn.addEventListener("click",function(){
        let nameElement = document.getElementById("create-name");
        let priceElement = document.getElementById("create-price");

        let name = nameElement.value;
        let price = priceElement.value;


        newProductString=`
            <tr class="product">
              <td class="name">
                  <span>${name}</span>
            </td>
        
            <td class="pu">
              $<span>${price}</span>
            </td>
        
            <td class="qty">
              <label>
                 <input type="number" value="0" min="0">
             </label>
            </td>
        
            <td class="subtot">
              $<span>0</span>
            </td>
        
            <td class="rm">
             <button class="btn btn-delete">Delete</button>
            </td>
        </tr>
        `

        let body = document.getElementById("table-body");
        body.innerHTML += newProductString;

        nameElement.value = "";
        priceElement.value = "";

        let rmBtns = document.getElementsByClassName("btn-delete");//Get all the Delete buttons
        console.log(rmBtns);

    })

    




};//createProduct

calcAll();

removeButton();

createProduct()

removeButton();
