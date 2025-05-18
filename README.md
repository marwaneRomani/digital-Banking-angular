# Projet Digital Banking

# Frontend

Ce projet est une application bancaire digitale développée avec Angular 19. Elle propose une interface web pour deux types d'utilisateurs : les agents bancaires et les clients.

### Architecture de l'application

L'application est structurée selon les principes d'Angular avec les composants suivants :

- **Système d'authentification** : Géré par AuthentificationService qui s'occupe de la connexion, déconnexion et gestion des tokens JWT.
- **Services pour l’interaction avec le backends** : `clientSercive compteService operationService`
- **Guards de sécurité** : Trois guards dans auth.guard.ts protègent les routes :
  - `authGuard` - vérifie si l'utilisateur est authentifié
  - `agentGuard` - vérifie si l'utilisateur a le rôle AGENT
  - `clientGuard`  - vérifie si l'utilisateur a le rôle CLIENT

### Fonctionnalités principales

1. **Authentification** :
   - Page de connexion avec validation des formulaires
   - Stockage du token JWT et des informations utilisateur dans le localStorage
   - Déconnexion avec redirection
2. **Tableaux de bord spécifiques aux rôles** :
   - Dashboard agent pour la gestion des clients, des comtes clients et des opérations
   - Dashboard client pour consulter ses comptes et transactions
3. **Sécurité** :
   - Interception des requêtes HTTP pour ajouter le token d'authentification
   - Redirection vers une page "Non autorisé" en cas d'accès non permis

![alt text](<Screenshot from 2025-05-18 22-31-50.png>)

![alt text](<Screenshot from 2025-05-18 22-33-19.png>)

![alt text](<Screenshot from 2025-05-18 22-34-06.png>)

![alt text](<Screenshot from 2025-05-18 22-36-14.png>)

![alt text](<Screenshot from 2025-05-18 22-38-16.png>)

![alt text](<Screenshot from 2025-05-18 22-40-44.png>)

![alt text](<Screenshot from 2025-05-18 22-35-01.png>)
