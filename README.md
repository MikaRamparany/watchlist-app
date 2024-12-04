POur postgres : 

2. Démarrer PostgreSQL
Si PostgreSQL est installé, mais que tu ne peux pas te connecter, tu peux essayer de démarrer le serveur avec la commande suivante :

bash
Copier le code
brew services start postgresql
3. Accéder à PostgreSQL avec le bon utilisateur
Si tu rencontres l'erreur suivante :
psql: error: connection to server on socket "/tmp/.s.PGSQL.5432" failed: FATAL: role "postgres" does not exist

Cela signifie que tu essaies de te connecter à PostgreSQL avec un rôle (utilisateur) qui n'existe pas encore.

Créer un utilisateur PostgreSQL :

Tu peux créer un utilisateur PostgreSQL en exécutant cette commande pour entrer dans PostgreSQL avec l'utilisateur par défaut (si tu n’as pas encore configuré un utilisateur) :
bash
Copier le code
psql postgres
Cela te connecte à PostgreSQL sans spécifier d'utilisateur. Une fois dedans, tu peux créer un utilisateur et une base de données pour ton projet :

Créer un utilisateur postgres (ou un autre utilisateur de ton choix) :
sql
Copier le code
CREATE ROLE postgres WITH LOGIN PASSWORD 'yourpassword';
ALTER ROLE postgres CREATEDB;
Créer une base de données :
sql
Copier le code
CREATE DATABASE watchlist_db;
Associer l'utilisateur avec la base de données :
sql
Copier le code
GRANT ALL PRIVILEGES ON DATABASE watchlist_db TO postgres;
Quitter PostgreSQL :
sql
Copier le code
\q
4. Connexion à PostgreSQL
Maintenant, pour te connecter à PostgreSQL, utilise l’utilisateur que tu viens de créer :

bash
Copier le code
psql -U postgres -d watchlist_db
Vérifier les utilisateurs PostgreSQL : Une fois connecté à PostgreSQL, tu peux afficher la liste des utilisateurs avec la commande suivante :

sql
Copier le code
\du
Cela te permettra de voir les rôles définis dans ta base de données.
