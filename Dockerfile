# usamos nginx para servir archivos estáticos
# configuración simple, funciona bien para este tipo de proyecto

FROM nginx:alpine

# copiar los archivos del sitio a la carpeta html de nginx
COPY . /usr/share/nginx/html

# copiar nuestra configuración personalizada de nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
