const express = require('express');
const bodyParser = require('body-parser');
const Web3 = require('web3');
const web3 = new Web3('https://mainnet.infura.io/v3/593ad5eac4e148c3a623d512d0cd52d9');
const app = express();

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

app.get('/', function (req, res) {
  res.render('index', {balance: null, error: null});
})

app.listen(3000, function () {
  console.log('BitBroker Code Sample listening on port 3000')
})

app.post('/', function (req, res) {
  let id = req.body.walletID;
  if (web3.utils.isAddress(id)) {
    var walletBalance = web3.eth.getBalance(id);
    walletBalance.then(function(result){
      res.render('index', {balance: `Wallet balance is ${result / 1e18} Ethereum`, error: null});
    })
  } else {
    res.render('index', {balance: null, error: 'Error, not a valid address'});
  }
})
