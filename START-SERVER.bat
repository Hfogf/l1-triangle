@echo off
echo.
echo ╔═══════════════════════════════════════════════════╗
echo ║      🎮 L1-TRIANGLE Gaming Store Server           ║
echo ║         Démarrage du serveur API...               ║
echo ╚═══════════════════════════════════════════════════╝
echo.

cd /d "%~dp0"

REM Vérifier que Node.js est installé
where node >nul 2>nul
if errorlevel 1 (
    echo ❌ Node.js n'est pas installé!
    echo.
    echo Téléchargez et installez Node.js depuis: https://nodejs.org/
    echo.
    pause
    exit /b 1
)

echo ✅ Node.js trouvé
echo.
echo Démarrage du serveur sur http://localhost:3000
echo.
echo Appuyez sur CTRL+C pour arrêter le serveur
echo.

node server.js

pause
