// @login & @register
const express = require('express');
const router = express.Router();
const passport = require('passport');
const Profile = require('../../models/Profile');


/**
 * $route GET api/users/test
 * @desc  返回请求的json数据
 * @access public
 */
router.get('/test', (req, res) => {
    res.json({
        msg: 'profile works'
    })
})
/**
 * $route post api/users/add
 * @desc  添加数据接口
 * @access private
 */
router.post('/add', passport.authenticate('jwt', {
    session: false
}), (req, res) => {
    const profileFields = {};
    if (req.body.type) profileFields.type = req.body.type;
    if (req.body.description) profileFields.description = req.body.description;
    if (req.body.income) profileFields.income = req.body.income;
    if (req.body.expend) profileFields.expend = req.body.expend;
    if (req.body.cash) profileFields.cash = req.body.cash;
    if (req.body.remark) profileFields.remark = req.body.remark;

    new Profile(profileFields).save().then(profile => {
        res.json(profile)
    })
})
/**
 * $route post api/users/edit/:id
 * @desc  编辑数据接口
 * @access private
 */
router.post('/edit/:id', passport.authenticate('jwt', {
    session: false
}), (req, res) => {
    const profileFields = {};
    if (req.body.type) profileFields.type = req.body.type;
    if (req.body.description) profileFields.description = req.body.description;
    if (req.body.income) profileFields.income = req.body.income;
    if (req.body.expend) profileFields.expend = req.body.expend;
    if (req.body.cash) profileFields.cash = req.body.cash;
    if (req.body.remark) profileFields.remark = req.body.remark;

    Profile.findOneAndUpdate({
            _id: req.params.id
        }, {
            $set: profileFields
        }, {
            new: true
        })
        .then(profile => {
            res.json(profile)
        })
})
/**
 * $route delete api/users/delete/:id
 * @desc  删除数据接口
 * @access private
 */
router.delete('/delete/:id', passport.authenticate('jwt', {
    session: false
}), (req, res) => {

    Profile.findOneAndRemove({
            _id: req.params.id
        })
        .then(profile => {
            profile.save().then(profile => res.json(profile))
        })
        .catch(err => {
            res.json({
                code: 404,
                msg: '删除失败'
            })
        })
})
/**
 * $route GET api/users
 * @desc  查找所有数据接口
 * @access private
 */
router.get('/', passport.authenticate('jwt', {
    session: false
}), (req, res) => {
    Profile.find()
        .then(profile => {
            if (!profile) {
                res.json({
                    code: 404,
                    msg: '没有任何内容'
                })
            }
            res.json(profile)
        })
        .catch(err => {
            res.json({
                code: 404,
                msg: err
            })
        })
})
/**
 * $route GET api/users:id
 * @desc  获取单个信息
 * @access private
 */
router.get('/:id', passport.authenticate('jwt', {
    session: false
}), (req, res) => {
    Profile.findOne({
            _id: req.params.id
        })
        .then(profile => {
            if (!profile) {
                res.json({
                    code: 404,
                    msg: '没有任何内容'
                })
            }
            res.json(profile)
        })
        .catch(err => {
            res.json({
                code: 404,
                msg: err
            })
        })
})
module.exports = router;
