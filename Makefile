# Makefile para DevJobs
# comandos rápidos para no tener que recordar los flags de docker cada vez

.PHONY: run build stop logs clean

run:
	docker compose up -d
	@echo "corriendo en http://localhost:8080"

build:
	docker compose up -d --build
	@echo "reconstruido y corriendo en http://localhost:8080"

stop:
	docker compose down

logs:
	docker compose logs -f

clean:
	docker compose down --rmi local
	@echo "contenedores e imágenes eliminados"
