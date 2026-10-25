@echo off
chcp 65001 >nul
setlocal

REM ============================================================
REM  nniklab - Instalación y uso de Remotion (videos en código)
REM  Ejecutar desde la terminal de VS Code:  .\instalar-remotion.bat
REM ============================================================

REM --- Rutas (ajústalas si tu copia del repo está en otro lugar) ---
set "REPO=C:\Users\jheredia\Documents\nniklab_Project"
set "PROYECTO=%REPO%\company\06-publicidad\videos\videos_automatizacion\n8n-pedido-automatico\remotion"

echo.
echo ============================================================
echo  PASO 1 de 5 - Verificando Node.js y Git
echo ============================================================
where node >nul 2>&1
if errorlevel 1 (
  echo [ERROR] No se encontró Node.js.
  echo         Descarga la versión LTS desde https://nodejs.org, instálala
  echo         y vuelve a abrir VS Code antes de ejecutar este archivo.
  goto :fin
)
for /f "delims=" %%v in ('node -v') do echo  Node.js: %%v
for /f "delims=" %%v in ('npm.cmd -v') do echo  npm:     %%v

where git >nul 2>&1
if errorlevel 1 (
  echo [ERROR] No se encontró Git. Instálalo desde https://git-scm.com
  goto :fin
)
for /f "delims=" %%v in ('git --version') do echo  %%v

echo.
echo ============================================================
echo  PASO 2 de 5 - Permitir scripts de npm en PowerShell
echo ============================================================
echo  Se aplica RemoteSigned solo para tu usuario (no requiere administrador).
powershell -NoProfile -Command "Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned -Force"
for /f "delims=" %%p in ('powershell -NoProfile -Command "Get-ExecutionPolicy -Scope CurrentUser"') do echo  Política actual de tu usuario: %%p
echo  Desde ahora 'npm' y 'npx' también funcionarán en PowerShell
echo  (cierra y vuelve a abrir la terminal para que tome efecto).

echo.
echo ============================================================
echo  PASO 3 de 5 - Traer los últimos cambios del repo
echo ============================================================
if not exist "%REPO%\.git" (
  echo [ERROR] No se encontró el repo en: %REPO%
  echo         Corrige la variable REPO al inicio de este archivo.
  goto :fin
)
cd /d "%REPO%"
git pull
if errorlevel 1 (
  echo [AVISO] git pull falló. Revisa si tienes cambios sin guardar
  echo         con 'git status'. Se continúa con la versión local.
)

echo.
echo ============================================================
echo  PASO 4 de 5 - Instalar Remotion (npm install)
echo ============================================================
if not exist "%PROYECTO%\package.json" (
  echo [AVISO] Todavía no existe el proyecto Remotion en:
  echo         %PROYECTO%
  echo         Cuando Claude lo suba al repo, vuelve a ejecutar este archivo.
  goto :fin
)
cd /d "%PROYECTO%"
call npm.cmd install
if errorlevel 1 (
  echo [ERROR] npm install falló. Revisa el mensaje de arriba.
  goto :fin
)
echo  Remotion instalado en: %PROYECTO%\node_modules

echo.
echo ============================================================
echo  PASO 5 de 5 - ¿Qué quieres hacer?
echo ============================================================
echo   1. Abrir Remotion Studio (previsualizar en el navegador)
echo   2. Renderizar el video a MP4 (queda en la carpeta out\)
echo   3. Salir
echo.
choice /c 123 /n /m "Elige 1, 2 o 3: "
if errorlevel 3 goto :fin
if errorlevel 2 goto :render
if errorlevel 1 goto :studio

:studio
echo.
echo  Abriendo Remotion Studio... (para cerrarlo: Ctrl + C)
call npm.cmd run studio
goto :fin

:render
echo.
echo  Renderizando... la primera vez descarga el navegador interno y tarda más.
call npm.cmd run render
if errorlevel 1 (
  echo [ERROR] El render falló. Revisa el mensaje de arriba.
) else (
  echo  Listo. El video está en: %PROYECTO%\out
  start "" "%PROYECTO%\out"
)
goto :fin

:fin
echo.
pause
endlocal
