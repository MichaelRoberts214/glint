var bodyParser  = require('body-parser'); // allows for parsing of POST request body
var helpers = require('./helpers.js'); // error logging and handling functions
var morgan = require('morgan'); // logs requests

module.exports = function (app, express) {
  // add more routes later 
  var ideaRouter = express.Router();
  var voteRouter = express.Router();

  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());
  app.use(express.static(__dirname + '/../../client'));
  app.use(morgan('dev'));


  app.use('/api/ideas', ideaRouter); // use idea router for all idea requests
  app.use('/api/votes', voteRouter); // use vote router for requests related to upvoting or downvoting

  app.use(helpers.logErrors);
  app.use(helpers.handleErrors);

  // inject our routers into their route file
  require('../ideas/ideaRoutes.js')(ideaRouter);
  require('../votes/voteRoutes.js')(voteRouter);
};