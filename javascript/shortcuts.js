// account summary
let balance = document.getElementById('balance');
let totalCr = 0;
let totalDr = 0;
for (let i = 0; i < transactions.length; i++) {
    if (transactions[i].status == 'cr') {
        totalCr += parseFloat(transactions[i].amount);
    } else {
        totalDr += parseFloat(transactions[i].amount);
    }
}
const availableBal = (Math.round((totalCr - totalDr) * 100)) / 100;

balance.innerHTML = `
    <div class="balance">
        <p>Available balance:</p>
        <p><span>${availableBal}</span> INR</p>
    </div>
    <div>
        <p>Total deposit: ₹${totalCr}</p>
        <p>Total spent: ₹${totalDr}</p>
    </div>
`;


const shortcuts = {
    topUp : function () {
        let wrapper = document.getElementById('wrapper');
        wrapper.innerHTML = `
            <p>Top-up:</p>

            <form action="" class="topUpForm">
                <div>
                    <div class="instantDeliveryBox">
                        <p>Instant delivery 24/7</p>
                        <div>
                            <i class="fa-solid fa-truck-fast"></i>
                        </div>
                    </div>
                    <div class="touUpBox">
                        <p>Top-up amount (₹):</p>
                        <input type="number" placeholder="Enter top-up amount" name="topUpAmt"/>
                    </div>
                    <div class="paymentMethodBox">
                        <p>Payment method:</p>
                        <div>
                            <img src="https://logodix.com/logo/1763566.png" alt="">
                            <input type="radio" name="paymentMethod"/>
                        </div>
                    </div>
                    <div class="termsAndConditionBox">
                        <input type="checkbox" />
                        <a href="#">I accept the Terms & conditions.</a>
                    </div>
                </div>
                
                <input type="submit" value="Proceed to checkout" class="submitTopUpForm">
            </form>
        `;

    },
    transaction : function () {
        // listing transactions
        let wrapper = document.getElementById('wrapper');
        wrapper.innerHTML = '<p>Recent transactions:</p>';
        for (let i = 0; i < transactions.length; i++) {
            let sign;
            if (transactions[i].status === 'dr') {
                sign = '-'
            } else {
                sign = '+'
            }
            wrapper.innerHTML += `
                <div class="parent">
                    <img src="${transactions[i].img}" alt="">
                    <div>
                        <p class="gameName">${transactions[i].purpuse}</p>
                        <p>Date: ${transactions[i].time}</p>
                        <p>Transaction no.: ${transactions[i].transactionNum}</p>
                        <b class="${transactions[i].status}">${sign} ₹${transactions[i].amount}</b>
                    </div>
                </div>
            `;
        }
    },
    orders : function () {
        // listing transactions
        let wrapper = document.getElementById('wrapper');
        wrapper.innerHTML = '<p>Recently purchases:</p>';
        for (let i = 0; i < purchases.length; i++) {

            let bgColor;
            if (purchases[i].game === 'Mobile Legend Bang Bang') {
                bgColor = 'mlbb'
            } else if (purchases[i].game === 'Weekly pass') {
                bgColor = 'weeklyPass'
            } else if (purchases[i].game === 'Mobile Legend Mini') {
                bgColor = 'mlbbMini'
            } else if (purchases[i].game === 'Twilight pass') {
                bgColor = 'twilight'
            } else if (purchases[i].game === 'BGMI') {
                bgColor = 'bgmi'
            };

            let statusColor;
            if (purchases[i].status === 'Success') {
                statusColor = 'success'
            } else if (purchases[i].status === 'Failed') {
                statusColor = 'failed'
            } else if (purchases[i].status === 'Pending' || purchases[i].status === 'Refunded') {
                statusColor = 'pendingRefunded'
            }

            wrapper.innerHTML += `
                <div class="grandParent ${bgColor}">
                    <div class="parent noBorder">
                        <img src="${purchases[i].img}" alt="">
                        <div>
                            <p class="gameName">${purchases[i].game}</p>
                            <p>Date: ${purchases[i].time}</p>
                            <p>Order no.: ${purchases[i].orderNum}</p>
                            <b class="dr purchasedAmt">₹${purchases[i].amount} <br><span class="${statusColor}">${purchases[i].status}</span></b>
                        </div>
                    </div>
                    <div class="hideShow">
                        <p><span>Product:</span> ${purchases[i].product}</p>
                        <p><span>User ID:</span> ${purchases[i].userID}</p>
                        <p><span>Sever ID:</span> ${purchases[i].serverID}</p>
                        <p><span>Payment method:</span> ${purchases[i].paymentMethod}</p>
                    </div>
                </div>
            `;
        }
    },
    dashboard : function() {
        let wrapper = document.getElementById('wrapper');
        let overallSpent = 0;
        purchases.forEach(purchase => {
            overallSpent += parseFloat(purchase.amount);
        })
        wrapper.innerHTML = `
            <p>Dashboard:</p>

            <div class="container">
                <div class="totalOrders">
                    <div>
                        <h3>Total Orders</h3>
                        <p>Overall purchases since the account creation</p>
                    </div>
                    <h3>${purchases.length}</h3>
                </div>
                <div class="totalSpent">
                    <div>
                        <h3>Overall Spent</h3>
                        <p>Including UPI and Wallet payments</p>
                    </div>
                    <h3>₹${overallSpent}</h3>
                </div>
            </div>
        `;


    },
}


const middleFourBtn = document.querySelectorAll(".subNavBtn");
middleFourBtn.forEach((element) => {
    element.addEventListener('click', () => {
        middleFourBtn.forEach((element) => {
            element.classList.remove('active');
        });
        element.classList.add('active');
    });
})


// shortcuts.transaction();

const urlParams = new URLSearchParams(window.location.search);
const value = urlParams.get('value');
switch (value) {
    case 'top-up':
        shortcuts.topUp();
        middleFourBtn[0].classList.add('active')
        break;
    case 'transaction':
        shortcuts.transaction();
        middleFourBtn[1].classList.add('active')
        break;
        case 'orders':
        shortcuts.orders();
        middleFourBtn[2].classList.add('active')
        break;
        case 'dashboard':
        shortcuts.dashboard();
        middleFourBtn[3].classList.add('active')
        break;
    default:
}
