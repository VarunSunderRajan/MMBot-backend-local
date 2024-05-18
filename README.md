# nodejs-express-mysql-blockbounce-api

a blockbounce for nodejs express mysql api

## Usage

### Database configuration

edit config/config.json file and change your database name, username and password

```bash
{
  "development": {
    "username": "root",
    "password": "",
    "database": "blockbounce_dev",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "test": {
    "username": "root",
    "password": "",
    "database": "blockbounce_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": "root",
    "password": "",
    "database": "blockbounce_prod",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}

```
and run this command to create database and tables
```bash
npm run prepare
```

### Run the project
```bash
npm run start:dev
```

## Model Generation

```bash
npx sequelize-cli model:generate --name user --attributes firstname:string,lastname:string,username:string,email:string,password:string,gender:string,active:integer,deleted:integer,token:string,token_expire:string,birthday:date,role:string
```


## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
