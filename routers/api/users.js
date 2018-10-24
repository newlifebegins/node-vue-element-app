// @login & @register
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt'); // 用于密码加密
const gravatar = require('gravatar'); // 全球公认头像
const jwt = require('jsonwebtoken'); // token设置
const passport = require('passport');
const User = require('../../models/Users');
const keys = require('../../config/keys');


/**
 * $route GET api/users/test
 * @desc  返回请求的json数据
 * @access public
 */
router.get('/test', (req, res) => {
    res.json({
        msg: 'login works'
    })
})

/**
 * $route POST api/users/register
 * @desc  返回请求的json数据
 * @access public
 */
router.post('/register', (req, res) => {
    User.findOne({
        email: req.body.email
    }).then((user) => {
        if (user) {
            return res.status(400).json({
                msg: '邮箱已被占用'
            })
        } else {
            const avatar = gravatar.url(req.body.email, {
                s: '200',
                r: 'pg',
                d: 'ww'
            });
            const user = new User({
                username: req.body.username,
                email: req.body.email,
                avatar,
                password: req.body.password,
                identity: req.body.identity
            })
            bcrypt.genSalt(10, function(err, salt) {
                bcrypt.hash(user.password, salt, function(err, hash) {
                    if (err) throw err;
                    user.password = hash;
                    user.save()
                        .then(user => res.json(user))
                        .catch(err => res.json(err));
                });
            });
        }
    })
})

/**
 * $route POST api/users/login
 * @desc  返回token jwt passport
 * @access public
 */
router.post('/login', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    // 查询数据库
    User.findOne({
        username
    }).then(user => {
        if (!user) {
            return res.status(404).json({
                msg: '用户名不存在'
            })
        }

        // 密码匹配
        bcrypt.compare(password, user.password)
              .then(isMatch => {
                  if(isMatch) {
                      // jwt.sign('规则', '加密名字','过期时间', '箭头函数');
                      const rule = {
                          id: user.id,
                          username: user.username,
                          avatar: user.avatar,
                          identity: user.identity
                      };
                      jwt.sign(rule, keys.secretKey,{expiresIn: 3600}, (err, token) => {
                          if(err) throw err;
                          res.json({
                              code: 200,
                              token: `Bearer ${token}`,
                              msg: '登录成功'
                          })
                      });
                  } else {
                      return res.status(400).json({
                          msg: '密码错误！'
                      })
                  }
              })
    })
})
/**
 * $route GET api/users/current
 * @desc  return current user
 * @access private
 */
router.get('/current', passport.authenticate('jwt', {session: false}), (req, res) => {
    res.json({
        id: req.user.id,
        username: req.user.username,
        email: req.user.email,
        identity: req.user.identity
    })
})
module.exports = router;
