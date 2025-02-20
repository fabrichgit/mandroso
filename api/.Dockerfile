# Étape 1 : Construire l'application
# Utilisez une image de base Go pour compiler l'application
FROM golang:1.20 AS builder

# Définir le répertoire de travail
WORKDIR /app

# Copier les fichiers go.mod et go.sum pour télécharger les dépendances
COPY go.mod go.sum ./

# Téléchargement des dépendances
RUN go mod download

# Copier le reste du code source de l'application
COPY . .

# Compiler l'application
RUN go build -o mon-app

# Étape 2 : Créer une image minimale pour exécuter l'application
FROM debian:bullseye-slim

# Installer les certificats SSL (optionnel mais souvent requis)
RUN apt-get update && apt-get install -y ca-certificates && rm -rf /var/lib/apt/lists/*

# Définir le répertoire de travail
WORKDIR /root/

# Copier l'application compilée depuis l'étape de compilation
COPY --from=builder /app/mon-app .

# Définir la variable d'environnement pour le port d'écoute
ENV PORT=2005

# Exposer le port de l'application
EXPOSE 2005

# Commande pour exécuter l'application
CMD ["./mon-app"]
