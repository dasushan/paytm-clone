const express = require('express');

const userRouter = require('./user.js');
const accountRouter = require('./account')
const router = express.Router();

router.use('/user', userRouter);
router.use('/account', accountRouter)
// router.get('/',(req, res)=>{
//     res.send({
//         data: "here is your data"
//     })
// })

// router.post('/', (req, res)=>{
//     res.send({
//         data: "User Created"
//     })
// })

// router.delete('/', (req, res)=>{
//     res.send({
//         data: "User deleted"
//     })
// })

module.exports = router;
