# Command that I got to run 
# https://database.guide/how-to-install-sql-server-on-a-mac/
# you have to have a decent password
docker run -d \
--name beer-app-sql \
-e 'ACCEPT_EULA=Y' \
-e 'SA_PASSWORD=Password1' \
-p 1433:1433 \
microsoft/mssql-server-linux

