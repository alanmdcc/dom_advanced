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
        totalElement.textContent = total.toFixed(2);

    });
    
};//calcAll

//Add a listener to the table body to catch all the clicks on the delete buttons
function removeButton(){
    let body = document.getElementById("table-body");//Get the body element

    body.addEventListener("click", function(e){

        if(e.target && e.target.nodeName == "BUTTON"){ //Verify that the click is from a button
            e.target.parentNode.parentNode.parentNode.removeChild(e.target.parentNode.parentNode); //Remove the row
        };

    });//addEventListener
           
};//removeButton

//Creates a new row with the product name and price given by the client
function createProduct(){
    let createBtn = document.getElementById("create"); //Get the button Create

    createBtn.addEventListener("click",function(){
        //Get the input elements for name and price
        let nameElement = document.getElementById("create-name");
        let priceElement = document.getElementById("create-price");

        //Get the value of the inputs
        let name = nameElement.value;
        let price = priceElement.value;

        //Creates the string for the new product in HTML
        newProductString=`
            <tr class="product">
              <td class="name">
                  <span>${name}</span>
            </td>
        
            <td class="pu">
              $<span>${parseFloat(price).toFixed(2)}</span>
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
        //Add the new element to the HTML
        let body = document.getElementById("table-body");
        body.innerHTML += newProductString;

        //Reset the values in the inputs
        nameElement.value = "";
        priceElement.value = "";

    })
};//createProduct


calcAll(); //Button to calculate subtotal and total

removeButton(); //Button to remove products

createProduct(); //Button to create new products

