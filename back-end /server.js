const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const knex = require('knex');
const bcrypt = require('bcrypt-nodejs');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');
const xlsx = require ('node-xlsx');

const database = knex({
	client: 'pg',
	connection: {
	  host : '127.0.0.1',
	  user : '',
	  password : '',
	  database : 'duro--'
	}
  });

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(logger('dev'));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(fileUpload());
app.use('/public', express.static(__dirname + '/public'));

app.get('/', (req,res) => {
	database.select('*').from('viz_').orderBy('lon', 'desc').then(data => {
		res.json(data);
})})

app.get('/Logindata/:cus_id', (req,res) => {
	const { cus_id } = req.params;
	database.select('*').from('viz_')
	.where('cus_id', '=', cus_id)
	.orderBy('lon', 'desc')
	.then(data => {
		res.json(data);
})})

app.post('/SignIn', (req,res) => {
	const { email, password } = req.body;
	var ip = req.ip;
    console.log(ip)

	database.select('email', 'password').from('users')
			.where('email', '=', email)
			.then(data => {
				const isValid = bcrypt.compareSync(password, data[0].password);
				if (isValid) {
					return database.select('*').from('users')
							.where('email', '=', email)
							.update({ last_login: new Date(),
									  ip_address: ip})
							.then(
								database.select('*').from('users')
									.where('email', '=', email)
									.then(user => {
										console.log(user)
										res.json(user[0])
									}).catch(err => res.status(400).json('unable to login')))
							.catch(err => res.status(400).json('unable to login'))
				} else {
        			res.status(400).json('wrong password')}
			}).catch(err => res.status(400).json('wrong user'))
})

app.post('/Register', (req,res) => {
	const { company, email, first_name, last_name, password, company_ } = req.body;
	const hash = bcrypt.hashSync(password);
	var userid;
	var customerid;
	database('users')
		.returning('*')
		.insert({
			password: hash,
			email: email,
			first_name: first_name,
			last_name: last_name,
			company_: company_,
			last_login: new Date()
		}).then(response => {
			console.log(response)
			userid = response[0].user_id;
			database('customer')
				.where({
				  name: company
				})
				.first() 
				.then((found) => {
				   if (found){
				   	 customerid = found.cus_id
				     return database('customer')
				     	.returning('*')
				   }else{
				      return database('customer')
				      	.returning('*')
				        .insert({
				          name: company
				        })
				   }
				}).then(response => {
					console.log(response)
					if (customerid == 'undefined'){
						customerid = response[0].cus_id;
						console.log(customerid)
					}
					database('user_customer')
						.returning('*')
						.insert({
							user_id: userid,
							cus_id: customerid
						}).then(response => {
							console.log('final',response)
							res.json(response);
						}).catch(err => res.status(400).json('unable to register'));
				}).catch(err => res.status(400).json('unable to register'));
		}).catch(err => res.status(400).json('unable to register'));	
})

app.get('/LoggedIn/:user_id/company', (req,res) => {
	const { user_id } = req.params;
	var cus_id;
	database.select('*').from('user_customer').where({user_id : user_id})
	.then(data => {
		if (data.length) {
			cus_id = data[0].cus_id;
		} else {
			res.status(400).json('not found')
		}
		}).then(response => {
			database.select('*').from('customer').where({cus_id : cus_id})
			.then(data => {
				if (data[0].name == ''){
					res.json('personal');
				}else {
					res.json(data[0]);
				}
			}).catch(err => res.status(400).json('no such id'))
	})
})

app.get('/LoggedIn/:user_id/name', (req,res) => {
	const { user_id } = req.params;
	database.select('*').from('users').where({user_id:user_id}).then(data => {
		if (data.length) {
			res.json(data[0]);
		} else {
			res.status(400).json('not found')
		}
	}).catch(err => res.status(400).json('no such id'))
})

app.get('/LoggedIn/:id/:searchid', (req,res) => {
	const { searchid } = req.params;
	database.select('*').from('viz').where({id:searchid}).then(data => {
		if (data.length) {
			res.json(data[0]);
		} else {
			res.status(400).json('not found')
		}
	}).catch(err => res.status(400).json('no such id'))
})

app.post('/Upload/:user_id/:cus_id', (req, res, next) => {
  const { user_id, cus_id } = req.params;
  console.log(user_id)
  
  let File = req.files.file;
  File.mv(`${__dirname}/public/${req.files.file.name}`, function(err) {
  	console.log(`${__dirname}/public/${req.files.file.name}`)
    if (err) {
      console.log(err)
      return res.status(500).send(err);
    }
    
    const workSheetsFromFile = xlsx.parse(`${__dirname}/public/${req.files.file.name}`);

    console.log(workSheetsFromFile[0].data[1][0])
    var header = []
    const rows = workSheetsFromFile[0].data.length;
    const cols = workSheetsFromFile[0].data[0].length;
	for (j = 0; j < cols; j++){
		if (workSheetsFromFile[0].data[0][j] == 'TEMP'){
			header[j] = 0;
		}else if (workSheetsFromFile[0].data[0][j] == 'PH'){
			header[j] = 1;
		}else if (workSheetsFromFile[0].data[0][j] == 'ORP'){
			header[j] = 2;
		}else if (workSheetsFromFile[0].data[0][j] == 'EC'){
			header[j] = 3;
		}else if (workSheetsFromFile[0].data[0][j] == 'TDS'){
			header[j] = 4;
		}else if (workSheetsFromFile[0].data[0][j] == 'SAL'){
			header[j] = 5;
		}else if (workSheetsFromFile[0].data[0][j] == 'SG'){
			header[j] = 6;
		}else if (workSheetsFromFile[0].data[0][j] == 'DO'){
			header[j] = 7;
		}else if (workSheetsFromFile[0].data[0][j] == 'SAT'){
			header[j] = 8;
		}else {
			break;
		}
	}

	for (i = 1; i < rows; i++){
    	for (j = 0; j < header.length; j++){
    		if (workSheetsFromFile[0].data[i][j]){
    // 			var longdate = new Date(1900,0,workSheetsFromFile[0].data[i][header.length]-1)
				// var longtime = workSheetsFromFile[0].data[i][header.length+1]

				// var shortdate = longdate.toISOString().substring(0, 10)

				// var shorthour = parseInt(longtime * 24)
				// var shortminute = parseInt((longtime * 24 * 60) % 60)
				// var shortsecond = parseInt((longtime * 24 * 60 * 60) % 60)

				// var shorttime = String(shorthour)+':'+String(shortminute)+':'+String(shortsecond)
				var values = workSheetsFromFile[0].data[i][header.length]+workSheetsFromFile[0].data[i][header.length+1]
			    var longdate = new Date(1900,0,values-1)

	    		database('viz_')
				.returning('*')
				.insert({
					sensorid: header[j],
					sensorvalue: workSheetsFromFile[0].data[i][j],
					cus_id: cus_id,
					date_time: longdate,
					lon: workSheetsFromFile[0].data[i][header.length+2],
					lat: workSheetsFromFile[0].data[i][header.length+3]
				})
				.then(data => {
				console.log(data);})
    		}
    		
    	}
    }

});
  })

app.get('/:lon/:lat', (req,res) => {
	const { lon, lat } = req.params;
	// var cus_id;
	database.select('*').from('viz_').where({lon : lon}).where({lat:lat}).offset(200).limit(200)
	.then(data => {
		res.json(data)
		})
})

app.get('/company', (req,res) => {
	// var cus_id;
	database.select('*').from('customer')
	.then(data => {
		company_list = []
		for (j = 0; j < data.length; j++){
			company_list[j] = data[j].name
			}
		console.log('company list server',company_list);
		res.json(company_list);
		})
})

app.use(function(req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(3000, ()=>{
	console.log('app is running');
})