@echo off
chcp 65001 >nul
echo ========================================
echo   APS 컨설팅 로컬 서버 시작
echo ========================================
echo.
echo 서버 시작 중...
echo.
echo 브라우저에서 다음 주소로 접속하세요:
echo   http://localhost:8000
echo.
echo 서버를 종료하려면 Ctrl+C를 누르세요.
echo.
echo ========================================
echo.
python -m http.server 8000
