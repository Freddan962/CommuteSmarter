# Sequelize

Sequelize är åtkomstbar i node_modules/.bin/sequelize.

## Model & Migration Generation
    sequelize model:create --name Event --attributes color:string,lat:double long:double,title:string,reported:date

Datatyper: http://docs.sequelizejs.com/variable/index.html

## Seeders
    sequelize seed:create --name events

Skapar en seeder i mappen seeders.

    sequelize db:seed:all

Seedar databasen med information som angivet i seedfilerna.

## Debug
    sequelize db:seed:all --debug

Kör sequelize i debug-läge för att få tydligare felmeddelanden.
