---
description: Test the application locally using Docker Compose, including email functionality.
---

1. Ensure you have a `.env` file in the root directory with your App Password:
```bash
echo "MAIL_PASSWORD=your_app_password_here" > .env
```

2. Start the application (Force rebuild to pick up changes):
// turbo
```bash
docker compose down --remove-orphans && docker compose build --no-cache && docker compose up -d
```

3. Verify the application:
- Frontend: [http://localhost:3000](http://localhost:3000) (or port 3001 if mapped differently)
   *Note: Since we added Nginx, you might access via http://localhost:80 locally if hosts are mapped, but usually direct port 3000/8080 checks are easier for dev.*
- Backend Logs: `docker compose logs -f backend`

4. Test Email:
- Go to the Contact Form.
- Submit a message.
- Check backend logs: `docker compose logs -f backend` should show "✅ Email sent successfully".
- Check your Gmail inbox.
