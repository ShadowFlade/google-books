run:
	docker run -d -p 80:4200 --env-file ./config/.env b918d43cc478
dev:
	docker run -p 3000:80 -d --rm --name google-books -v logs:/app/data -v /app/node_modules -v $(pwd):/app google-books:volumes