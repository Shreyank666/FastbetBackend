// const mongoose = require('mongoose');

// const betSchema = new mongoose.Schema({
//   label: { type: String, required: true },
//   odds: { type: Number, required: true },
//   stake: { type: Number, required: true, min: 0 },
//   profit: { type: Number, required: true },
//   createdAt: { type: Date, default: Date.now },
// });

// const Bet = mongoose.model('Bet', betSchema);

// module.exports = Bet;

















//multiuserchange



const mongoose = require('mongoose');

const betSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  label: { type: String, required: true },
  odds: { type: Number, required: true },
  run:{type:Number, default:"0"},
  stake: { type: Number, required: true, min: 0 },
  profit: { type: Number, required: true },
  type: { type: String, required: true },
  status:{type:String, default:"Pending"},
  result:{type:String, default:"N/A"},
}, { timestamps: true });


const Bet2 = mongoose.model('Bet2', betSchema);
module.exports = Bet2;
