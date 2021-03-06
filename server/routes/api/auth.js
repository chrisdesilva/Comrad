const router = require('express').Router();
const authController = require('../../controllers/authController');
const passport = require('passport');
const requireLogin = require('../../middlewares/requireLogin');

router
  .route('/login')
  .post(passport.authenticate('local'), authController.login);

router.route('/logout').get(requireLogin, authController.logout);

router.route('/current').get(requireLogin, authController.current);

router.route('/password/reset').put(authController.passwordReset);
router.route('/password/new').put(authController.passwordNew);

module.exports = router;
