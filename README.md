## OpenClassrooms - Projet 7 - Groupomania:

 ### Prérequis:
 - Un serveur MySQL, *sur Linux:*
``` 
sudo apt update
sudo apt install mysql-server
sudo mysql_secure_installation
```
- NodeJS,
``` 
sudo apt-get update
sudo apt-get install nodejs npm
```
- Clonez le répertoire git: https://github.com/iRazzh/Groupomania.git

### Installation FrontEnd: 
Pour lancer le front end:
```
cd Groupomania/frontend/

# Compiles and hot-reloads for development
npm run serve

# Compiles and minifies for production
npm run build
```
### Installation  Backend: 
1) Créer une base de données sous `mysql` à l'aide du fichier dump `groupomania.sql`
2) Allez dans le répertoire `backend/` et créer un fichier `.env`
```
cd Groupomania/backend/
cp .env.sample .env

# Puis éditer les valeurs du fichier .env avec votre configuration 
sudo nano .env
```
3) Démarrez le serveur backend *(Sur le port 3000 par défaut, modifiable dans le .env)*: 
```
npm run start
```
---
