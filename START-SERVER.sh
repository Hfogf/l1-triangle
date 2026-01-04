#!/bin/bash

echo ""
echo "╔═══════════════════════════════════════════════════╗"
echo "║      🎮 L1-TRIANGLE Gaming Store Server           ║"
echo "║         Démarrage du serveur API...               ║"
echo "╚═══════════════════════════════════════════════════╝"
echo ""

cd "$(dirname "$0")"

# Vérifier que Node.js est installé
if ! command -v node &> /dev/null; then
    echo "❌ Node.js n'est pas installé!"
    echo ""
    echo "Téléchargez et installez Node.js depuis: https://nodejs.org/"
    echo ""
    exit 1
fi

echo "✅ Node.js trouvé"
echo ""
echo "Démarrage du serveur sur http://localhost:3000"
echo ""
echo "Appuyez sur CTRL+C pour arrêter le serveur"
echo ""

node server.js
