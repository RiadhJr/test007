
            const orderItemIdArray = [];

            const orderidarray = [];
            const orderarray = [];
            const orderitemsarray = [];
            const orderPriceArray = [];
            const orderImageArray = [];

            const orderItemQuantity = [];

            //giving id to cards on orderlist
            let i = 0;

            function orderbasket(itemid, itemname, itemprice, itemimage){
                
               /*console.log(orderitemsarray.indexOf(itemname));
                const itemIndexNumber = orderitemsarray.indexOf(itemname);
                console.log(orderItemQuantity[itemIndexNumber]);*/

                if (orderitemsarray.indexOf(itemname) > -1){
                  console.log('yes it exist');
                  const itemIndexNumber = orderitemsarray.indexOf(itemname);
                  orderItemQuantity[itemIndexNumber] = orderItemQuantity[itemIndexNumber] +1;
                  incrementItem(orderidarray[itemIndexNumber], 1);
                }
                else {

                

                orderidarray.push(i);

                orderItemIdArray.push(itemid);
                orderitemsarray.push(itemname);
                orderPriceArray.push(itemprice);
                orderImageArray.push(itemimage);
                orderItemQuantity.push(1);

                orderarray.push(itemid, itemname, itemprice, itemimage);

                

                let orderlist = document.getElementById('orderlist');

                //create the li tag
                const orderitemparent = document.createElement('li');


                const orderitem = document.createElement('span');
                orderitem.className = 'd-flex justify-content-between align-items-center';


                //create a span for red color
                const orderitempricespan = document.createElement('span');

                //create  the text node with itemname and itemprice
                const orderitemname = document.createTextNode(' '+itemname);
                
                const orderitemprice = document.createTextNode(' $ '+itemprice);

                //adjust text color to text-danger
                orderitempricespan.className = 'text-danger';
                
                //add pricetextnode into span
                orderitempricespan.appendChild(orderitemprice);

                //create  a delete button
                const deletebutton = document.createElement('button');
                const deletebuttontext = document.createTextNode('X');

                deletebutton.setAttribute('onclick', 'deleteItem('+i+', this)');

                //append text to delete button
                deletebutton.appendChild(deletebuttontext);
                deletebutton.className = 'btn btn-danger rounded-pill';


                //add or append the itemname tag and the itemprice to LI tag 
                //orderitem.appendChild(orderitemname);
                
                //attach the orderitempricespan Span into LI tag
                //orderitem.appendChild(orderitempricespan);



                // IMAGE section
                //step1: add img text
                const orderitemimgtag = document.createElement('img');

                //assign the src itemimage to img
                orderitemimgtag.src = itemimage;

                //class w-25 for image
                orderitemimgtag.className = 'w-25 rounded border border-dark';

                //combine image with name 
                const orderitemlefysidespan = document.createElement('span');

                //appendchild to LI
                orderitemlefysidespan.appendChild(orderitemimgtag);

                //add or append the itemname tag and the itemprice to LI tag 
                orderitemlefysidespan.appendChild(orderitemname);

                //add price to the same span with img a,nd name
                orderitemlefysidespan.appendChild(orderitempricespan);


                //attach the orderitemlefysidespan (img + name) Span into LI tag
                orderitem.appendChild(orderitemlefysidespan);

                //attach the orderitempricespan Span into LI tag
                //orderitem.appendChild(orderitempricespan);

                //attach the delete buttton into span tag
                orderitem.appendChild(deletebutton);

                //new created parent li >> span
                orderitemparent.appendChild(orderitem);
                //attach or append the li tag (child) to parent id = orderlist
                orderlist.appendChild(orderitemparent);


                //button section
                const decrementButton = document.createElement('button');
                const incrementButton = document.createElement('button');
                const decrementButtonText = document.createTextNode('-');
                const incrementButtontext = document.createTextNode('+');

                decrementButton.setAttribute('onclick', 'incrementItem('+i+', -1)');
                incrementButton.setAttribute('onclick', 'incrementItem('+i+', 1)');

                const amountItemSpan = document.createElement('span');
                const amountItemText = document.createTextNode('1');


                decrementButton.className = 'btn btn-sm btn-success rounded-pill ms-1 px-3 fw-bold';
                incrementButton.className = 'btn btn-sm btn-success rounded-pill px-3 fw-bold';
                amountItemSpan.className = 'px-3 fw-bold item'+ i;

                
                incrementButton.appendChild(incrementButtontext);
                decrementButton.appendChild(decrementButtonText);
                amountItemSpan.appendChild(amountItemText);
                

                orderitemparent.appendChild(incrementButton);
                orderitemparent.appendChild(amountItemSpan);
                orderitemparent.appendChild(decrementButton);
                
                //increment the i itteration
                i++;

              }

                
                //instead of putting it for each card just put this here and call orderbasket
                totalitems(); 
                costitems();

                

               // console.log(orderidarray);
                enableCheckOutButton();
            };

            /*function decrementItem(){

            };*/

            function incrementItem(orderid, val){
              const itemspan = document.querySelector('.item' + orderid);
              itemspan.innerText = parseInt(itemspan.innerText) + val;

              const indexnum = orderidarray.indexOf(orderid);

              orderItemQuantity[indexnum] = parseInt(itemspan.innerText);
              totalitems();
              costitems();
              if(itemspan.innerText == 0){

                //itemid
                orderItemIdArray.splice(indexnum, 1);


                orderidarray.splice(indexnum , 1);
                orderitemsarray.splice(indexnum , 1);
                orderPriceArray.splice(indexnum , 1);
                orderImageArray.splice(indexnum , 1);
                orderItemQuantity.splice(indexnum , 1);

                totalitems();
                costitems();

                orderlist.removeChild(itemspan.parentElement);
                //orderitemparent.removeChild(button.parentElement);


                if(orderPriceArray.length === 0){
                  document.getElementById('amount').value = 0;
                }
                enableCheckOutButton();
              }
            };

            function totalitems(){
                //document.getElementById('totalitems').innerText = orderitemsarray.length;
                if (orderItemQuantity.length){
                  document.getElementById('totalitems').innerText = orderItemQuantity.reduce((total, num) => {
                  return total + num;
                });
                }
                else {
                  document.getElementById('totalitems').innerText = '0';
                }
               

                
            };

            function costitems(){
                if (orderPriceArray.length === 0){
                    document.getElementById('totalcost').innerText = 0;
                }
                else {

                  const totalTempArray = [];
                    orderItemQuantity.map((quantity, index) => {
                      totalTempArray.push(quantity * orderPriceArray[index])
                    });


                    document.getElementById('totalcost').innerText = totalTempArray.reduce(sumarray).toFixed(2);

                    document.getElementById('amount').value = totalTempArray.reduce(sumarray).toFixed(2);

                    function sumarray(total , num){
                    return total + num;
                    };
                }
              
            };

            function orderbasketClear(){
                let orderlist = document.getElementById('orderlist');
                document.getElementById('amount').value =0;
                orderlist.innerHTML = '';
                orderitemsarray.length = 0;
                orderPriceArray.length = 0;
                orderImageArray.length = 0;
                orderarray.length = 0;
                orderidarray.length = 0;
                orderItemQuantity.length = 0; 
                i = 0;
                totalitems();
                costitems();
                enableCheckOutButton();
            };

            function deleteItem (orderid, button){
                const indexnum = orderidarray.indexOf(orderid);

                //itemid
                orderItemIdArray.splice(indexnum, 1);


                orderidarray.splice(indexnum , 1);
                orderitemsarray.splice(indexnum , 1);
                orderPriceArray.splice(indexnum , 1);
                orderImageArray.splice(indexnum , 1);
                orderItemQuantity.splice(indexnum , 1);

                totalitems();
                costitems();

                orderlist.removeChild(button.parentElement.parentElement);
                //orderitemparent.removeChild(button.parentElement);


                if(orderPriceArray.length === 0){
                  document.getElementById('amount').value = 0;
                }
                enableCheckOutButton();
            };

            function exactAmountCalculator(){
              
              document.getElementById('exactamountspan').innerText = document.getElementById('amount').value;
            }
            const calculatorScreenAmount = document.getElementById('calculatorScreenAmount');
			
			            function calculatorInsert(number){

              if(calculatorScreenAmount.value == 0 && number === '00')
              {
                //calculatorScreenAmount.value = '0.';
                
              }
              else if (calculatorScreenAmount.value == 0 && number == '0'){
                calculatorScreenAmount.value = '0.';
              }
              else if (calculatorScreenAmount.value == '' && number == '00'){
                calculatorScreenAmount.value = '0';
              }
              else if (calculatorScreenAmount.value.includes('.') === true && number  === '.'){
                calculatorScreenAmount.value = calculatorScreenAmount.value;
              }
              else if (calculatorScreenAmount.value == '0' && number > 0){
                calculatorScreenAmount.value = number;
              }
              else {
                calculatorScreenAmount.value += number;
              }

              if (calculatorScreenAmount.value == '.'){
                calculatorScreenAmount.value = '0.';
              }
              enableConfirmPaidButton();
            };
            
            function exactAmountButton(){
              calculatorScreenAmount.value = document.getElementById('amount').value;
              enableConfirmPaidButton();
            };

            function denominationButton(bill){
              calculatorScreenAmount.value = parseFloat(calculatorScreenAmount.value) +bill;
              enableConfirmPaidButton();
            };

            function calculatorCancel(){
              calculatorScreenAmount.value = '0';
              enableConfirmPaidButton();
            };

            function enableConfirmPaidButton(){
              document.getElementById('confirmPaid').disabled = true;
              if (parseFloat(calculatorScreenAmount.value) >= parseFloat(document.getElementById('amount').value)){
                document.getElementById('confirmPaid').disabled = false;
              };
            };

            function confirmPaidButton(){

              const customerAmountPaid = document.getElementById('customeramountpaid');
              customerAmountPaid.value = calculatorScreenAmount.value;
              const customerAmountChange = document.getElementById('customeramountchange');
              customerAmountChange.value = (customerAmountPaid.value - document.getElementById('amount').value).toFixed(2);

              document.getElementById('calculatorModal').disabled =true;

              enableNextCustomerAndPrintButton();
              disableAllButtons();
                
             };

             function enableNextCustomerAndPrintButton(){
              document.getElementById('printReceiptButton').disabled = false;
              document.getElementById('customerNextButton').disabled = false;
             }

             function disableAllButtons(){
              document.getElementById('pills-food-tab').disabled = true;
              document.getElementById('pills-drink-tab').disabled = true;
              document.getElementById('orderbasketclearButton').disabled = true;
              document.getElementById('checkOutButton').disabled = true;
              const allButtons = document.getElementById('orderlist').querySelectorAll('button');
              for(let i = 0; i < allButtons.length; i++){
                allButtons[i].disabled = true;
              }
             }
             function enableCheckOutButton(){
              const checkOutButton = document.getElementById('checkOutButton');
              checkOutButton.disabled = true;
              if(orderidarray.length > 0){
                checkOutButton.disabled = false;
              };
              if(orderidarray.length == 0){
                const backToFoodTab = document.getElementById('pills-drink-tab');
                const foodTab = new bootstrap.Tab(backToFoodTab);

                foodTab.show();
              }
             };

             function goToCheckOutTab(){
              const firstTabEl = document.getElementById('pills-checkout-tab');
              const firstTab = new bootstrap.Tab(firstTabEl);

              firstTab.show();
             };
